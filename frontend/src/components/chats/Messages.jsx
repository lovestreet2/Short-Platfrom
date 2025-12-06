import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();

  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  // Auto-scroll to bottom
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400 text-lg">
        Select a user to start chat
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">

      {/* ------------ User Header (Sticky)  ------------ */}
      <div className="
        flex items-center justify-center flex-col py-4 border-b bg-white
        sticky top-0 z-10
      ">
        <Avatar className="h-16 w-16">
          <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        <span className="mt-2 font-semibold text-sm md:text-base">
          {selectedUser?.username}
        </span>

        <Link to={`/profile/${selectedUser?._id}`}>
          <Button className="h-7 mt-2 text-xs md:text-sm" variant="secondary">
            View Profile
          </Button>
        </Link>
      </div>

      {/* ------------ Messages Area (Scrollable) ------------ */}
      <div className="
        flex-1 overflow-y-auto p-3 md:p-4 
        flex flex-col gap-3
        bg-gray-50
      ">
        {messages &&
          messages.map((msg) => {
            const isMe = msg.senderId === user?._id;
            return (
              <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    px-3 py-2 rounded-lg max-w-[75%] md:max-w-[60%] 
                    break-words text-sm md:text-base shadow-sm
                    ${isMe
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-900 border rounded-bl-none"
                    }
                  `}
                >
                  {msg.message}
                </div>
              </div>
            );
          })}

        <div ref={endRef} />
      </div>
    </div>
  );
};

export default Messages;
