import { motion } from "framer-motion";
import { Calendar, MapPin, Users, CheckCircle } from "lucide-react";
import PropTypes from "prop-types";

const PostEventCard = ({ event }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
        <div className="relative h-48">
          <img
            src={event.poster || "/placeholder.svg?height=200&width=400"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Completed
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {event.description}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-2 text-green-500" />
              <span>{event.mode}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-2 text-green-500" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4 mr-2 text-green-500" />
              <span>{event.attendance}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              <span>Event Concluded</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md text-center text-sm font-semibold cursor-pointer"
          >
            View Details
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

PostEventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    attendance: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string,
  }).isRequired,
};

export default PostEventCard;
