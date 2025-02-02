import { motion } from "framer-motion";
import { Calendar, MapPin, Camera } from "lucide-react";
import PropTypes from "prop-types";

const PostEventCard = ({ event, onClick }) => {
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
        <div className="absolute top-0 left-0 m-4 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
          Completed
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {event.title}
        </h3>
        <div className="flex justify-between mb-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <MapPin className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-sm">{event.mode}</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Calendar className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {event.description}
        </p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {event.images.slice(0, 5).map((image, index) => (
            <motion.div
              key={index}
              className={`rounded-lg overflow-hidden ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Event highlight ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 font-semibold flex items-center justify-center"
        >
          <Camera className="w-4 h-4 mr-2" />
          View Gallery
        </motion.button>
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
  onClick: PropTypes.func.isRequired,
};

export default PostEventCard;
