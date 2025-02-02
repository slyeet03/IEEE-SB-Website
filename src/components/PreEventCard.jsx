import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Award, Clock } from "lucide-react";
import PropTypes from "prop-types";

const PreEventCard = ({ event, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={event.poster || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 m-4 px-2 py-1 bg-ieee-blue text-white text-xs font-semibold rounded">
          {event.tag}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {event.overview}
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <MapPin className="w-4 h-4 mr-2 text-ieee-blue" />
            <span className="text-sm">{event.mode}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Calendar className="w-4 h-4 mr-2 text-ieee-blue" />
            <span className="text-sm">
              {new Date(event.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4 mr-2 text-ieee-blue" />
            <span className="text-sm">
              {new Date(event.startDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Award className="w-4 h-4 mr-2 text-ieee-blue" />
            <span className="text-sm">{event.prizePool}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Users className="w-4 h-4 mr-2 text-ieee-blue" />
            <span className="text-sm">{event.teamSize}</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-ieee-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            window.open(event.registrationLink, "_blank");
          }}
        >
          Register Now
        </motion.button>
      </div>
    </motion.div>
  );
};

PreEventCard.propTypes = {
  event: PropTypes.shape({
    poster: PropTypes.string,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    prizePool: PropTypes.string.isRequired,
    teamSize: PropTypes.string.isRequired,
    registrationLink: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PreEventCard;
