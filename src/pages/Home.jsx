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
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} onClick={() => handlePostClick(post.$id)} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
