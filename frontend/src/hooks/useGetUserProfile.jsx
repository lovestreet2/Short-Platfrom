import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import useFollowUnfollow from "./useFollowUnfollow";

const useGetUserProfile = ({ userId, targetUserId }) => {
  const dispatch = useDispatch();
  const { followUnfollowUser, loading, error, successMessage } =
    useFollowUnfollow();

  const [userProfile, setUserProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://short-platfrom.onrender.com/api/v1/user/${userId}/profile`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
          setUserProfile(res.data.user);
          setIsFollowing(res.data.user.following.includes(targetUserId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, [userId, targetUserId, dispatch]);

  const handleFollowUnfollow = async () => {
    try {
      await followUnfollowUser(targetUserId);
      setIsFollowing((prevState) => !prevState);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    userProfile,
    isFollowing,
    handleFollowUnfollow,
    loading,
    error,
    successMessage,
  };
};

export default useGetUserProfile;
