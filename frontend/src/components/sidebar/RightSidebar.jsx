import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "../posts/SuggestedUsers";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <aside
      className="
        hidden lg:block 
        
        /* right sidebar container */
        w-72 xl:w-80 
        min-h-screen 
        px-4 py-8

        /* sticky behavior so it follows page scroll */
        sticky top-0
        
        bg-transparent
      "
    >
      {/* User Profile Row */}
      <div className="flex items-center gap-3 mb-6">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.profilePicture} alt="profile_image" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex flex-col">
          <Link
            to={`/profile/${user?._id}`}
            className="font-semibold text-sm hover:underline"
          >
            {user?.username}
          </Link>
          <span className="text-gray-600 text-xs truncate max-w-[150px]">
            {user?.bio || "No bio yet..."}
          </span>
        </div>
      </div>

      {/* Suggested Users */}
      <div className="mt-6">
        <SuggestedUsers />
      </div>
    </aside>
  );
};

export default RightSidebar;
