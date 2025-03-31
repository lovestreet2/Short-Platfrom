import { useState } from "react";
import axios from "axios";

const useFollowUnfollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const followUnfollowUser = async (targetUserId) => {
    try {
      setLoading(true);
      setError(null); // Reset error state before the request
      setSuccessMessage(""); // Reset success message

      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      // Make the API call
      const response = await axios.post(
        `https://short-platfrom.onrender.com/api/v1/user/followorunfollow/${targetUserId}`,
        {}, // No body data needed
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      );

      // Check if the response is valid
      if (response && response.data) {
        if (response.data.success) {
          setSuccessMessage(response.data.message); // Show success message
        } else {
          setError(response.data.message || "Something went wrong.");
        }
      } else {
        setError("No data returned from API.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong"); // Show the specific error message
      console.error("API Error: ", err); // Log the error for debugging
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return {
    followUnfollowUser,
    loading,
    error,
    successMessage,
  };
};

export default useFollowUnfollow;
