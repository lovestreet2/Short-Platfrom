import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "../posts/CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import api from "@/services/api";

// 🔥 Missing imports — ADD THESE
import Notification from "../feed/Notification";
import { markAsRead } from "@/redux/rtnSlice";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);

  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await api.get("/user/logout", { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

  const sidebarHandler = (text) => {
    const actions = {
      Logout: logoutHandler,
      Create: () => setOpen(true),
      Profile: () => navigate(`/profile/${user?._id}`),
      Home: () => navigate("/"),
      Messages: () => navigate("/chat"),
      Notifications: () => navigate("/notification"),
      Explore: () => navigate("/explore"),
      Search: () => navigate("/search"),
    };
    actions[text]?.();
  };

  const sidebarItems = [
    { icon: <Home size={22} />, text: "Home" },
    { icon: <Search size={22} />, text: "Search" },
    { icon: <TrendingUp size={22} />, text: "Explore" },
    { icon: <MessageCircle size={22} />, text: "Messages" },
    { icon: <Heart size={22} />, text: "Notifications" },
    { icon: <PlusSquare size={22} />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut size={22} />, text: "Logout" },
  ];

  const isCollapsed = !hovered; // collapsed unless hovered on md screens

  return (
    <div
      className={`
        h-full bg-white border-r border-gray-200 
        transition-all duration-300 flex flex-col select-none

        w-full         /* Mobile full width */
        md:w-16 md:hover:w-64  /* Tablet: hover expands */
        lg:w-64        /* Desktop: always expanded */
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo */}
      <div className="px-4 py-6">
        <h1
          className={`
            text-xl font-bold transition-all duration-200
            ${isCollapsed ? "opacity-0 md:opacity-0 lg:opacity-100" : "opacity-100"}
          `}
        >
          LOGO
        </h1>
      </div>

      <nav className="flex-1 px-2">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => sidebarHandler(item.text)}
            className="
              flex items-center gap-3 py-3 px-3 mb-1
              rounded-lg cursor-pointer hover:bg-gray-100 transition relative
            "
          >
            {item.icon}

            {/* Label appears only on expand */}
            <span
              className={`
                text-[15px] whitespace-nowrap transition-all duration-200
                ${isCollapsed ? "opacity-0 md:hidden lg:opacity-100" : "opacity-100"}
              `}
            >
              {item.text}
            </span>

            {/* Notifications Popover */}
            {item.text === "Notifications" && likeNotification.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    className={`
                      absolute right-2 top-2 rounded-full h-5 w-5 
                      bg-red-600 text-[11px] text-white
                      ${likeNotification.some((n) => !n.read) ? "animate-pulse" : ""}
                    `}
                  >
                    {likeNotification.filter((n) => !n.read).length}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-80 max-h-96 overflow-y-auto">
                  {likeNotification.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">
                      No new notifications
                    </p>
                  ) : (
                    likeNotification.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => dispatch(markAsRead(notif.id))}
                        className="cursor-pointer"
                      >
                        <Notification notification={notif} />
                      </div>
                    ))
                  )}
                </PopoverContent>
              </Popover>
            )}
          </div>
        ))}
      </nav>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
