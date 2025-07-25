// components/events/EventCardDisplay.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  }),
};

export const EventCardDisplay = ({ event, handlePrev, handleNext, direction }) => {
  if (!event) {
    return (
      <div className="grid place-items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-6 min-h-[30rem] md:min-h-[40rem]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No event selected</p>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center bg-white dark:bg-ieee-dark rounded-xl overflow-hidden shadow-2xl p-4 md:p-6 lg:p-8">
      {/* Navigation Buttons */}
      <motion.button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-ieee-blue dark:text-ieee-light shadow-lg hover:bg-ieee-blue hover:text-white dark:hover:bg-ieee-light dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-ieee-blue/50 dark:focus:ring-ieee-light/50"
        aria-label="Previous Event"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowLeft size={24} />
      </motion.button>

      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={event._id}
          src={event.poster}
          alt={`Poster for ${event.name}`}
          className="max-h-[22rem] md:max-h-[31rem] max-w-[18rem] md:max-w-[25rem] w-full h-auto object-contain rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
        />
      </AnimatePresence>

      <motion.button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-ieee-blue dark:text-ieee-light shadow-lg hover:bg-ieee-blue hover:text-white dark:hover:bg-ieee-light dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-ieee-blue/50 dark:focus:ring-ieee-light/50"
        aria-label="Next Event"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowRight size={24} />
      </motion.button>

      {/* Subtle background gradient to enhance poster visibility and depth */}
      <div className="absolute inset-0 z-0 opacity-10 blur-xl pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-ieee-blue rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-ieee-light rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
      </div>
    </div>
  );
};

EventCardDisplay.propTypes = {
  event: PropTypes.object,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  direction: PropTypes.number.isRequired,
};