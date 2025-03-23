import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isLoggedIn = !!userData;
    const isAuthor = post && userData ? post?.userId === userData?.userData?.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        if (!post) return; // Ensure post exists before deleting

        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    console.log("User Data:", userData);
    console.log("Post Data:", post);

    return post ? (
        <div className="py-10">
            <Container>
                {/* Post Container */}
                <div className="relative w-full max-w-4xl mx-auto group">
                    {/* Background Image */}
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Edit & Delete Buttons - Visible on Hover */}
                        {isAuthor && (
                            <div
                                className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-auto"
                            >
                                <Link to={`/edit-post/${post.$id}`} onClick={(e) => e.stopPropagation()}>
                                    <button className="px-3 py-1 text-xs sm:text-sm border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-full transition duration-300">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={deletePost}
                                    className="px-3 py-1 text-xs sm:text-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        )}


                        {/* Overlay with Title */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                            <h1 className="text-3xl font-bold text-white">{post.title}</h1>
                        </div>
                    </div>

                    {/* Post Content (Below the Image) */}
                    <div className="p-6 mt-4 bg-gray-900 text-gray-200 rounded-xl shadow-md">
                        {/* Show content only if the user is logged in */}
                        {isLoggedIn ? (
                            <div className="text-gray-300 text-sm sm:text-base leading-relaxed overflow-wrap break-words overflow-x-hidden">
                                {parse(post.content)}
                            </div>
                        ) : (
                            <div className="text-center text-lg text-gray-400">
                                <p>
                                    🔒 You need to{" "}
                                    <Link to="/login" className="text-blue-500 underline">
                                        log in
                                    </Link>{" "}
                                    to view the full content.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
