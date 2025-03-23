import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <Container>
                <div className="w-full max-w-4xl mx-auto bg-gray-400 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                        Edit Post
                    </h2>
                    <PostForm post={post} />
                </div>
            </Container>
        </div>
    ) : null;
}

export default EditPost;
