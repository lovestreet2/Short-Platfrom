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
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ---------- TOP SECTION ---------- */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center md:items-start">

        {/* Avatar */}
        <div className="flex justify-center md:justify-start">
          <Avatar className="h-28 w-28 md:h-40 md:w-40">
            <AvatarImage src={userProfile?.profilePicture} alt="profile-photo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col gap-5 w-full">

          {/* Username & Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-xl font-semibold">{userProfile?.username}</span>

            {/* Instagram-style buttons */}
            {isLoggedInUserProfile && (
              <div className="flex gap-3">
                <Link to="/account/edit">
                  <Button
                    variant="secondary"
                    className="h-8 px-4 text-sm font-medium"
                  >
                    Edit Profile
                  </Button>
                </Link>

                <Button
                  variant="secondary"
                  className="h-8 px-4 text-sm font-medium"
                >
                  Share Profile
                </Button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-8 text-sm sm:text-base">
            <p>
              <span className="font-semibold">{userProfile?.posts.length}</span>{" "}
              posts
            </p>
            <p>
              <span className="font-semibold">{userProfile?.followers.length}</span>{" "}
              followers
            </p>
            <p>
              <span className="font-semibold">{userProfile?.following.length}</span>{" "}
              following
            </p>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1">
            <span className="font-semibold">
              {userProfile?.bio || "bio here..."}
            </span>

            <Badge className="w-fit flex items-center gap-1" variant="secondary">
              <AtSign />
              {userProfile?.username}
            </Badge>

            <span>🤯 Learn code with only me style</span>
            <span>🤯 Turning code into fun</span>
            <span>🤯 DM for collaboration</span>
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
              className={`py-3 cursor-pointer uppercase tracking-wide ${activeTab === tab
                  ? "font-bold text-black"
                  : "text-gray-500"
                }`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* ---------- POSTS GRID ---------- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6">
          {displayedPost?.map((post) => (
            <div key={post?._id} className="relative group cursor-pointer">
              <img
                src={post.image}
                alt="post-image"
                className="object-cover w-full aspect-square rounded-sm"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
              flex justify-center items-center transition-opacity duration-300">
                <div className="flex items-center gap-6 text-white text-lg">
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
            </div>
          ))}

          {!displayedPost?.length && (
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
