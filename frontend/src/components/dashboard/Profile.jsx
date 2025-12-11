import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";

const Profile = () => {
  const { id: userId } = useParams();

  const { posts } = useSelector((store) => store.post);

  // Fetch profile once
  useGetUserProfile({ userId });

  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const displayedPost = (
    activeTab === "posts"
      ? user?.posts
      : activeTab === "saved"
        ? userProfile?.bookmarks
        : []
  )?.filter(post => post && post.image);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ---------- TOP SECTION ---------- */}
      <div className="flex flex-col md:flex-row gap-10">

        {/* Avatar */}
        <Avatar className="h-32 w-32 md:h-40 md:w-40 mx-auto md:mx-0">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>
            {userProfile?.username?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6 w-full">

          {/* Username + Buttons */}
          <div className="flex items-center gap-6">
            <span className="text-2xl font-semibold">
              {user?.username}
            </span>

            {/* Buttons Like Instagram */}
            {isLoggedInUserProfile && (
              <div className="flex item-center gap-3 space-x-6 mt-4">

                {/* Edit Profile */}
                <Link to="/account/edit">
                  <Button
                    variant="secondary"
                    className="px-4 py-1 text-sm rounded-lg font-medium"
                  >
                    Edit Profile
                  </Button>
                </Link>


                {/* View Archive */}
                <Button
                  variant="secondary"
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                >
                  View archive
                </Button>

                {/* Share Profile */}
                <Button variant="secondary" className="px-4 py-6 rounded-lg text-sm font-medium bg-blue-500 text-white">
                  Share Profile
                </Button>
              </div>
            )}



            {/* Follow Button (When viewing other user's profile) */}
            {!isLoggedInUserProfile && (
              <Button className="px-6 py-1 text-sm font-semibold bg-blue-500 text-white">
                Follow
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-10 text-sm">
            <span>
              <b>{user?.posts?.length || 0}</b> posts
            </span>
            <span>
              <b>{userProfile?.followers?.length || 0}</b> followers
            </span>
            <span>
              <b>{userProfile?.following?.length || 0}</b> following
            </span>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1">
            <span className="font-medium">
              {userProfile?.bio || "bio here..."}
            </span>

            <Badge variant="secondary" className="w-fit gap-1">
              <AtSign />
              {user?.username}
            </Badge>
            {/* Buttons (Edit profile / Archive) */}
            <div className="flex space-x-4 mb-6">
              <button className="px-4 py-2 border rounded text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">Edit Profile</button>
              <button className="px-4 py-2 border rounded text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600">View Archive</button>
            </div>
          </div>

        </div>

      </div>

      {/* ---------- TABS ---------- */}
      <div className="border-t mt-10">
        <div className="flex justify-center gap-10 text-sm">
          {["posts", "saved", "reels", "tags"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 cursor-pointer uppercase tracking-wide ${activeTab === tab ? "font-bold text-black" : "text-gray-500"
                }`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* ---------- GRID ---------- */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          {displayedPost?.length ? (
            displayedPost.map((post) => (
              <div key={post?._id} className="relative group cursor-pointer">
                <img
                  src={post.image}
                  alt="post"
                  className="object-cover w-full aspect-square"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 
                group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white text-lg">
                  <div className="flex items-center gap-2">
                    <Heart />
                    <span>{post?.likes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle />
                    <span>{post?.comments?.length || 0}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No {activeTab} yet...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


