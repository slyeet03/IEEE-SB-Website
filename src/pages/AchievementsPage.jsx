import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import confetti from "canvas-confetti";
import achievementsData from "../Data/achievementsData";

// Enhanced Confetti Effect
const triggerConfetti = () => {
  confetti({
    particleCount: 350,
    spread: 200,
    origin: { y: 0.7 },
    colors: ["#FFD700", "#FF4500", "#00FF7F", "#1E90FF"],
    scalar: 1.5,
  });
};

// Achievement Card
const AchievementCard = ({ achievement, onClick }) => (
  <motion.div
    className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer border border-yellow-400 hover:shadow-2xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(achievement)}
  >
    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
      {achievement.awardType}
    </div>

    <div className="relative h-96"> {/* Slightly taller for better visibility */}
  <img
    src={achievement.image || "/placeholder.svg"}
    alt={achievement.label}
    className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-300"
    loading="lazy"
  />
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
    <h3 className="text-lg font-bold text-white">{achievement.label}</h3>
  </div>
</div>



    <div className="p-4 text-gray-600 dark:text-gray-400 text-sm">
      {achievement.description}
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
    awardType: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

// Achievement Modal
const AchievementModal = ({ achievement, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border-4 border-yellow-400"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={achievement.image || "/placeholder.svg"}
        alt={achievement.label}
        className="w-full max-h-[75vh] object-contain"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {achievement.label}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X size={28} />
          </button>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-200 p-2 rounded-md mb-4 text-center">
          🏅 {achievement.awardType}
        </div>

        <p className="text-gray-700 dark:text-gray-200 mb-4">
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
    awardType: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

// Achievements Page
const AchievementsPage = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleAchievementClick = useCallback((achievement) => {
    setSelectedAchievement(achievement);
    triggerConfetti();
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedAchievement(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
        🎯 Our Achievements
      </h1>

      {/* Achievements Grid (Masonry Layout) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {achievementsData
        .filter((achievement) => achievement.label !== "A COMMUNITY OF INNOVATION")
        .map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onClick={handleAchievementClick}
          />
      ))} 
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
