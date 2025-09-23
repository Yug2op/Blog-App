import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import apiService from "../services/apiService"; // Using new apiService
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            apiService.getPost(slug).then((response) => {
                if (response.data) {
                    setPost(response.data);
                }
            }).catch(error => {
                console.error("Error fetching post for edit:", error);
                navigate("/"); // Navigate home on error
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
