import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const StoryViewerModal = ({ isOpen, onClose, stories, startIndex = 0, autoAdvanceTime = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const timerRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    timerRef.current = setTimeout(() => {
      nextStory();
    }, autoAdvanceTime);

    return () => clearTimeout(timerRef.current);
  }, [currentIndex, isOpen, autoAdvanceTime]);

  if (!stories || stories.length === 0) return null;

  const prevStory = () => {
    clearTimeout(timerRef.current);
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const nextStory = () => {
    clearTimeout(timerRef.current);
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const currentStory = stories[currentIndex];

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-90">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-white p-2 hover:bg-gray-800 rounded-full"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Left Nav */}
        <button
          className="absolute left-2 md:left-10 text-white p-2 hover:bg-gray-800 rounded-full"
          onClick={prevStory}
        >
          <ChevronLeft size={32} />
        </button>

        {/* Right Nav */}
        <button
          className="absolute right-2 md:right-10 text-white p-2 hover:bg-gray-800 rounded-full"
          onClick={nextStory}
        >
          <ChevronRight size={32} />
        </button>

        {/* Story Image */}
        <img
          src={currentStory.img}
          alt={currentStory.username}
          className="max-h-[90%] max-w-[90%] object-contain rounded-md shadow-lg"
        />

        {/* Username */}
        <div className="absolute top-5 left-5 text-white font-semibold text-lg">
          {currentStory.username}
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 flex gap-1 px-2">
          {stories.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-1 rounded bg-gray-500/50`}
              style={{
                background:
                  idx < currentIndex
                    ? "white"
                    : idx === currentIndex
                    ? "linear-gradient(to right, white 0%, white 0%)"
                    : "rgba(255,255,255,0.3)",
                transition: "all 0.3s linear",
              }}
            ></div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default StoryViewerModal;
