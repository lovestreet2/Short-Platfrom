import React from "react";
import Posts from "../posts/Posts";
import Stories from "../stories/Stories";

const Feed = () => {
  return (
    <div
      className="
        flex flex-col items-center 
        w-full 
        mt-6 sm:mt-8 
        px-2 sm:px-4 md:px-0
        md:max-w-2xl 
        mx-auto
      "
    >
      {/* Stories Section */}
      <Stories />

      {/* Posts */}
      <div className="w-full mt-6">
        <Posts />
      </div>
    </div>
  );
};

export default Feed;
