"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const achievementsData = [
  {
    id: 1,
    label: "Achievement 1",
    description: "test achievement 1",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 2,
    label: "Achievement 2",
    description: "test achievement 2",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 3,
    label: "Achievement 3",
    description: "test achievement 3",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 4,
    label: "Achievement 4",
    description: "test achievement 4",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 5,
    label: "Achievement 5",
    description: "test achievement 5",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 6,
    label: "Achievement 6",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 7,
    label: "Achievement 7",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 8,
    label: "A COMMUNITY OF INNOVATION",
    description: "",
    image: "",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 9,
    label: "Achievement 9",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

const AchievementCard = ({ achievement, onClick }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(achievement)}
  >
    <img
      src={achievement.image || "/placeholder.svg"}
      alt={achievement.label}
      className="w-full h-48 object-cover"
      loading="lazy"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {achievement.label}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {achievement.description}
      </p>
    </div>
  </motion.div>
);

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const AchievementModal = ({ achievement, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={achievement.image || "/placeholder.svg"}
        alt={achievement.label}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {achievement.label}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {achievement.description}
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          {achievement.content}
        </p>
      </div>
    </motion.div>
  </motion.div>
);

AchievementModal.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

const AchievementsPage = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleAchievementClick = useCallback((achievement) => {
    setSelectedAchievement(achievement);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedAchievement(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Achievements
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClick={handleAchievementClick}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementsPage;
