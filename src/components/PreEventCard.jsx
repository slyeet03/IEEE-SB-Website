import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import PropTypes from "prop-types";

const PreEventCard = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <img
        src={event.poster || "/placeholder.svg"}
        alt={event.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {event.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {event.overview}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-ieee-blue mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              {event.mode}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-ieee-blue mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              Start: {new Date(event.startDate).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-ieee-blue mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              End: {new Date(event.endDate).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center">
            <Award className="w-5 h-5 text-ieee-blue mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              Prize Pool: {event.prizePool}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 text-ieee-blue mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              Team Size: {event.teamSize}
            </span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-ieee-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          onClick={() => window.open(event.registrationLink, "_blank")}
        >
          Register Now
        </motion.button>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Organizing Committee
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {event.organizingCommittee.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
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
    organizingCommittee: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PreEventCard;
