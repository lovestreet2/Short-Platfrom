import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import StoryViewerModal from "./StoryViewerModal";

const Stories = () => {
  const { user } = useSelector((store) => store.auth);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userStories, setUserStories] = useState([]);

  const sampleStories = [
    { id: 1, username: "alex", img: "/default1.jpg" },
    { id: 2, username: "lisa", img: "/default2.jpg" },
    { id: 3, username: "mike", img: "/default3.jpg" },
    { id: 4, username: "john", img: "/default4.jpg" },
  ];

  // Combine user stories with others
  const allStories = [
    ...userStories.map((story, idx) => ({
      id: `user-${idx}`,
      username: user?.username,
      img: story.preview,
    })),
    ...sampleStories,
  ];

  const openStory = (index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleAddStory = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setUserStories([{ file, preview }, ...userStories]);
      setSelectedIndex(0);
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="w-full py-3 flex gap-4 overflow-x-auto scrollbar-hide px-2 md:px-0">
        {/* Add Story */}
        <div className="flex flex-col items-center">
          <div className="relative cursor-pointer">
            <label htmlFor="story-upload">
              <Avatar className="h-16 w-16 border border-gray-300">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="absolute right-0 bottom-0 bg-blue-600 rounded-full p-[3px]">
                <Plus size={14} color="white" />
              </div>
            </label>
            <input
              type="file"
              id="story-upload"
              accept="image/*"
              className="hidden"
              onChange={handleAddStory}
            />
          </div>
          <span className="text-sm mt-1">Your Story</span>
        </div>

        {/* Other Stories */}
        {allStories.map((story, index) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => openStory(index)}
          >
            <div className="rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-pink-600">
              <Avatar className="h-16 w-16">
                <AvatarImage src={story.img} />
                <AvatarFallback>{story.username[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-sm mt-1 truncate max-w-[60px]">{story.username}</span>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      <StoryViewerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        stories={allStories}
        startIndex={selectedIndex}
      />
    </>
  );
};

export default Stories;
