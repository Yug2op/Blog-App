import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { Query } from 'appwrite';
import authService from '../appwrite/auth';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (!user) {
                    setError("User not found. Please log in.");
                    setLoading(false);
                    return;
                }

                const userId = user.$id;
                const response = await appwriteService.getPosts([Query.equal("userId", userId)]);

                setPosts(response?.documents || []);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gray-400">
                <Container>
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-lg sm:text-xl font-semibold text-gray-300">
                            Fetching posts, please wait...
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-gray-700">
                <Container>
                    <p className="text-lg sm:text-xl font-semibold text-red-500">{error}</p>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 bg-gray-400">
            <Container>
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-40">
                        <p className="text-lg sm:text-xl font-semibold text-gray-400">
                            No posts found for this account.
                        </p>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default MyPosts;
