import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSearch = async (value) => {
        setQuery(value);

        if (value.trim() === "") {
            setUsers([]);
            setPosts([]);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `https://short-platfrom.onrender.com/api/search?query=${value}`
            );

            const data = await res.json();
            setUsers(data.users || []);
            setPosts(data.posts || []);
        } catch (err) {
            console.error("Search error:", err);
        }

        setLoading(false);
    };

    return (
        <div className="p-4">

            {/* Search Bar */}
            <div className="sticky top-0 bg-white pb-2 z-10">
                <input
                    type="text"
                    placeholder="Search users, hashtags, posts..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-lg text-sm focus:ring focus:ring-gray-200 outline-none"
                />
            </div>

            {/* Loading */}
            {loading && (
                <div className="mt-4 text-center text-gray-500">Searching...</div>
            )}

            {/* Users */}
            {users.length > 0 && (
                <div className="mt-6">
                    <h2 className="font-semibold text-gray-700 mb-2">Users</h2>

                    <div className="flex flex-col gap-3">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                                onClick={() => navigate(`/profile/${user._id}`)}
                            >
                                <img
                                    src={user.profilePicture}
                                    alt="profile"
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-medium">{user.username}</p>
                                    <p className="text-gray-500 text-sm">{user.fullname}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Posts */}
            {posts.length > 0 && (
                <div className="mt-6">
                    <h2 className="font-semibold text-gray-700 mb-2">Posts</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="relative group cursor-pointer rounded-md overflow-hidden"
                                onClick={() => navigate(`/post/${post._id}`)}
                            >
                                <img
                                    src={post.image}
                                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition-all">
                                    View Post
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No results */}
            {!loading && query.length > 0 && users.length === 0 && posts.length === 0 && (
                <div className="mt-6 text-center text-gray-500">No results found.</div>
            )}
        </div>
    );
};

export default Search;
