import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import achievementsData from "../Data/achievementsData";

// Achievement Card
const AchievementCard = ({ achievement, onClick }) => (
  <motion.div
    className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md border cursor-pointer hover:scale-[1.03] hover:shadow-xl transition-all duration-300 overflow-hidden"
    onClick={() => onClick(achievement)}
  >
    {/* Image with Top Part Visible */}
    <div className="relative w-full h-60">
      <img
        src={achievement.image || "/placeholder.svg"}
        alt={achievement.label}
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    </div>

    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {achievement.label}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {achievement.description}
      </p>
      <div className="mt-4 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-600 dark:text-white px-3 py-1 rounded-full w-fit">
        {achievement.awardType}
      </div>
    </div>
  </motion.div>
);

AchievementCard.propTypes = {
  achievement: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Achievement Modal
const AchievementModal = ({ achievement, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full md:w-[90%] overflow-hidden border-4 relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Image Section - Full Visibility */}
      {achievement.image && (
        <div className="relative w-full h-[60vh] md:h-[70vh]">
          <img
            src={achievement.image || "/placeholder.svg"}
            alt={achievement.label}
            className="w-full h-full object-cover"
          />

          {/* Text Overlay on Image */}
          <div className="absolute bottom-0 w-full bg-black/70 text-white p-4 md:p-6">
            <motion.h2
              className="text-lg md:text-2xl font-bold text-white mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {achievement.label}
            </motion.h2>

            <motion.p
              className="text-sm md:text-base"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {achievement.content}
            </motion.p>
          </div>
        </div>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  </motion.div>
);

AchievementModal.propTypes = {
  achievement: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

// Achievements Page
const AchievementsPage = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const handleCloseModal = () => setSelectedAchievement(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
        🎯 Our Achievements
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {achievementsData.map((achievement) => (
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
