import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { followUser, unfollowUser } from "@/redux/followSlice";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  const { following = [] } = useSelector((store) => store.follow);
  const { users = [] } = useSelector((store) => store.user || {});
  const dispatch = useDispatch();

  const handleFollowToggle = (userId) => {
    if (following.includes(userId)) {
      dispatch(unfollowUser({ userId }));
    } else {
      dispatch(followUser({ userId }));
    }
  };

  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {(suggestedUsers ?? []).map((user) => {
        const isFollowed = following.includes(user._id);

        return (
          <div
            key={user._id}
            className="flex items-center justify-between my-5"
          >
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className="font-semibold text-sm">
                  <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                </h1>
                <span className="text-gray-600 text-sm">
                  {user?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <span
              className={`text-xs font-bold cursor-pointer ${
                isFollowed ? "text-[#3495d6]" : "text-[#3BADF8]"
              }`}
              onClick={() => handleFollowToggle(user._id)}
            >
              {isFollowed ? "unfollow" : "Follow"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
