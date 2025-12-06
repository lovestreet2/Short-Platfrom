import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification }) => {
    const navigate = useNavigate();

    // 🛡 If no notification → show message (center for desktop view)
    if (!notification) {
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-500 text-lg font-medium">
                No notifications yet.
            </div>
        );
    }

    // Extract user from backend sender field
    const user = notification.sender;

    const handleClick = () => {
        if (notification.postId) {
            navigate(`/post/${notification.postId}`);
        } else if (notification.type === "follow") {
            navigate(`/profile/${user?._id}`);
        }
    };

    const renderText = () => {
        switch (notification.type) {
            case "like":
                return (
                    <>
                        <span className="font-bold">{user?.username}</span> liked your post
                    </>
                );
            case "comment":
                return (
                    <>
                        <span className="font-bold">{user?.username}</span> commented: "
                        {notification.commentText}"
                    </>
                );
            case "follow":
                return (
                    <>
                        <span className="font-bold">{user?.username}</span> started following you
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer 
                transition-all duration-200 
                hover:bg-gray-100
                ${!notification.seen ? "bg-gray-50" : ""}`}
            onClick={handleClick}
        >
            {/* Avatar */}
            <Avatar className="h-10 w-10 border border-gray-200 shadow-sm">
                <AvatarImage src={user?.profilePicture} alt={user?.username} />
                <AvatarFallback>
                    {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
            </Avatar>

            {/* Text Section */}
            <div className="flex flex-col flex-1 text-sm leading-tight">
                <span className="text-gray-800">{renderText()}</span>

                <span className="text-gray-500 text-xs">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                    })}
                </span>
            </div>
        </div>
    );
};

export default Notification;
