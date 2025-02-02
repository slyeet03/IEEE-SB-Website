import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import PropTypes from "prop-types";

const PostEventCard = ({ event }) => {
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
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {event.description}
        </p>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Event Highlights
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {event.images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Event highlight ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

PostEventCard.propTypes = {
  event: PropTypes.shape({
    poster: PropTypes.string,
    title: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PostEventCard;
