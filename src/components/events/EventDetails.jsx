// components/events/EventDetails.jsx
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Clock, CalendarDays, Users } from "lucide-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Using lucide-react for cleaner icons

const textContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const WORD_LIMIT = 50;
const truncateText = (text, limit) => {
  if (!text) return "";
  const words = text.split(/\s+/);
  return words.length <= limit ? text : words.slice(0, limit).join(" ") + "...";
};

export const EventDetails = ({ event }) => {
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg min-h-[30rem] md:min-h-[40rem]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Select an event to see details.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6 bg-white dark:bg-ieee-dark rounded-xl shadow-2xl text-center"
      variants={textContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold mb-3 text-ieee-blue dark:text-ieee-light leading-tight"
        variants={textItemVariants}
      >
        {event.name}
      </motion.h2>

      <motion.div
        className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-600 dark:text-gray-300 text-sm md:text-base mb-6"
        variants={textItemVariants}
      >
        <div className="flex items-center gap-2">
          <Users size={18} className="text-ieee-blue dark:text-ieee-light" />
          <span className="font-semibold">{event.formattedSociety}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-ieee-blue dark:text-ieee-light" />
          <span className="font-semibold">{event.formattedDate}</span>
        </div>
        {/* You could add time if available in event.startDateTime and formatted */}
        {event.startDateTime && (
            <div className="flex items-center gap-2">
                <Clock size={18} className="text-ieee-blue dark:text-ieee-light" />
                <span className="font-semibold">{new Date(event.startDateTime).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        )}
      </motion.div>

      <motion.div
        className="text-md md:text-lg text-gray-800 dark:text-gray-200 mb-8 space-y-4 px-4 max-w-xl"
        variants={textItemVariants}
      >
        {truncateText(
          event.status === "upcoming" ? event.eventOverview : event.description,
          WORD_LIMIT
        )
          .split("\n")
          .map((para, index) => (
            <p key={index} className="leading-relaxed">
              {para}
            </p>
          ))}
      </motion.div>

      <motion.div variants={textItemVariants}>
        <Link
          to={`/events/${event.status === "upcoming" ? "pre" : "post"}/${event._id}`}
          state={{ event: event }}
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          Learn More
          <FaArrowRight className="ml-2" /> {/* Added icon for Learn More button */}
        </Link>
      </motion.div>
    </motion.div>
  );
};

EventDetails.propTypes = {
  event: PropTypes.object,
};