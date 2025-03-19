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
                
                const user = await authService.getCurrentUser()
                const userId = user.$id;

                
                const response = await appwriteService.getPosts([Query.equal("userId", userId)]);
                
                
                if (response && response.documents) {
                    setPosts(response.documents);
                } else {
                    setPosts([]); 
                }
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []); 

    if (loading) {
        return (
            <div className="w-full py-16 flex justify-center items-center bg-gray-400">
                <Container>
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xl font-semibold text-gray-700">
                            Fetching posts, please wait...
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-16 flex justify-center items-center bg-gray-400">
                <Container>
                    <p className="text-xl font-semibold text-red-500">{error}</p>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                {posts.length > 0 ? (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex justify-center items-center'>
                        <p className='text-xl font-semibold text-gray-700'>
                            No posts found for this account.
                        </p>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default MyPosts;
