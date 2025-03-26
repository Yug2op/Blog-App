import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from "../appwrite/config"; // Using config.js for posts
import authService from "../appwrite/auth"; // Using auth.js for authentication
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all posts
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });

        // Check if user is logged in
        authService.isLoggedIn().then(setIsLoggedIn);
    }, []);

    const handlePostClick = (postId) => {
        if (!isLoggedIn) {
            alert("Please log in to view this post.");
            navigate('/login'); // Redirect to login page
        } else {
            navigate(`/post/${postId}`); // Navigate to full post page
        }
    };

    return (
        <div className='w-full py-8 bg-gray-400'>
            <Container>
                {posts.length > 0 ? (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} onClick={() => handlePostClick(post.$id)} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex justify-center items-center py-16'>
                        <p className='text-xl font-semibold text-primary'>
                            No one posted yet. <br /> Be the First One to Post.
                        </p>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
