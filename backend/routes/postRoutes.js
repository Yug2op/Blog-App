import express from 'express';
import multer from 'multer';
import Post from '../models/Post.js';
import { protect } from '../middleware/authMiddleware.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs/promises'; // Import fs.promises for async file operations

dotenv.config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to delete local file
const deleteLocalFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
        // console.log(`Successfully deleted local file: ${filePath}`);
    } catch (error) {
        console.error(`Error deleting local file ${filePath}:`, error);
    }
};

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Temporary directory for storing uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
router.post('/', protect, upload.single('featuredImage'), async (req, res) => {
    try {
        const { title, slug, content, status } = req.body;

        if (!title || !slug || !content || !status) {
            // If validation fails, delete the uploaded file
            if (req.file) {
                await deleteLocalFile(req.file.path);
            }
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // Check if slug already exists
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            // If slug exists, delete the uploaded file
            if (req.file) {
                await deleteLocalFile(req.file.path);
            }
            return res.status(400).json({ message: 'Slug must be unique. A post with this slug already exists.' });
        }

        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
            await deleteLocalFile(req.file.path); // Delete local file after Cloudinary upload
        }

        const post = await Post.create({
            title,
            slug,
            content,
            featuredImage: imageUrl,
            status,
            userId: req.user.id,
        });

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        // If an error occurs, ensure the local file is deleted
        if (req.file) {
            await deleteLocalFile(req.file.path);
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name email');
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get posts by current user
// @route   GET /api/posts/my/posts
// @access  Private
router.get('/my/posts', protect, async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user.id }).populate('userId', 'name email');
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate('userId', 'name email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update a post
// @route   PUT /api/posts/:slug
// @access  Private
router.put('/:slug', protect, upload.single('featuredImage'), async (req, res) => {
    try {
        const { title, slug: newSlug, content, status } = req.body; // Rename slug to newSlug

        // If a new file is uploaded, handle potential old image deletion from Cloudinary
        let imageUrl = post.featuredImage; // Keep existing image if not new one
        if (req.file) {
            // Delete old image from Cloudinary if it exists
            if (post.featuredImage) {
                const publicId = post.featuredImage.split('/').pop().split('.')[0]; // Extract public ID
                await cloudinary.uploader.destroy(publicId);
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
            await deleteLocalFile(req.file.path); // Delete local file after Cloudinary upload
        }

        let post = await Post.findOne({ slug: req.params.slug });

        if (!post) {
            if (req.file) { // If post not found but file was uploaded, delete it
                await deleteLocalFile(req.file.path);
            }
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check for user ownership
        if (post.userId.toString() !== req.user.id) {
            if (req.file) { // If not authorized but file was uploaded, delete it
                await deleteLocalFile(req.file.path);
            }
            return res.status(401).json({ message: 'Not authorized to update this post' });
        }

        // Check if newSlug already exists for another post
        if (newSlug && newSlug !== post.slug) {
            const existingPostWithNewSlug = await Post.findOne({ slug: newSlug });
            if (existingPostWithNewSlug && existingPostWithNewSlug._id.toString() !== post._id.toString()) {
                if (req.file) { // If slug exists but file was uploaded, delete it
                    await deleteLocalFile(req.file.path);
                }
                return res.status(400).json({ message: 'Slug must be unique. A post with this slug already exists.' });
            }
        }


        post = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            {
                title,
                slug: newSlug || post.slug,
                content,
                featuredImage: imageUrl,
                status,
            },
            { new: true, runValidators: true }
        );

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        // If an error occurs, ensure the local file is deleted
        if (req.file) {
            await deleteLocalFile(req.file.path);
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:slug
// @access  Private
router.delete('/:slug', protect, async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check for user ownership
        if (post.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this post' });
        }

        // Delete image from Cloudinary
        if (post.featuredImage) {
            const publicId = post.featuredImage.split('/').pop().split('.')[0]; // Extract public ID
            await cloudinary.uploader.destroy(publicId);
        }

        await post.deleteOne();

        res.status(200).json({ message: 'Post removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
