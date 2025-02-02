import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import PropTypes from "prop-types";

const PreEventDetails = ({ event, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={event.poster || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {event.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {event.overview}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
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
          <button
            className="w-full bg-ieee-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            onClick={() => window.open(event.registrationLink, "_blank")}
          >
            Register Now
          </button>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Organizing Committee
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {event.organizingCommittee.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

PreEventDetails.propTypes = {
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
  onClose: PropTypes.func.isRequired,
};

export default PreEventDetails;
