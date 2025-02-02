import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import PropTypes from "prop-types";

const PostEventDetails = ({ event, onClose }) => {
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
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Event highlight ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

PostEventDetails.propTypes = {
  event: PropTypes.shape({
    poster: PropTypes.string,
    title: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PostEventDetails;
