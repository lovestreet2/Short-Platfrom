import React from "react";
import Feed from "../feed/Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "../sidebar/RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <div
      className="
        flex w-full h-full 
        justify-center
        bg-gray-50
      "
    >
      {/* Feed + Outlet */}
      <div
        className="
          flex flex-col 
          w-full 
          
          /* center feed on large screens */
          md:max-w-2xl 
          lg:max-w-3xl
          xl:max-w-4xl

          /* spacing */
          px-2 sm:px-4 md:px-6
        "
      >
        <Feed />
        <Outlet />
      </div>

      {/* Right Sidebar (hidden on mobile/tablet) */}
      <div className="hidden lg:block">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
