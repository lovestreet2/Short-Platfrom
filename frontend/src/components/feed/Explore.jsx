import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExplorePosts = async () => {
            try {
                const res = await fetch("https://short-platfrom.onrender.com/api/posts/explore", {
                    credentials: "include",
                });

                const data = await res.json();
                setPosts(data.posts || []);
            } catch (err) {
                console.error("Error fetching explore posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchExplorePosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-screen text-lg font-semibold">
                Loading Explore...
            </div>
        );
    }

    return (
        <div className="p-4">
            {/* Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">

                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="relative group cursor-pointer"
                        onClick={() => navigate(`/post/${post._id}`)}
                    >
                        {/* Post Image */}
                        <img
                            src={post.image}
                            alt="post"
                            className="w-full h-full object-cover rounded-md transition-transform duration-200 group-hover:scale-105"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-sm transition-opacity duration-200">
                            View Post
                        </div>
                    </div>
                ))}

                {posts.length === 0 && (
                    <p className="text-center text-gray-500 col-span-full mt-10">
                        No explore posts all found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Explore;
