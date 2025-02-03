import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Camera,
  Users,
  Trophy,
  ArrowLeft,
} from "lucide-react";
import PropTypes from "prop-types";

const PostEventPage = ({ events }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number.parseInt(id));
  const [activeImage, setActiveImage] = useState(0);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Event not found
          </h2>
          <Link
            to="/events"
            className="text-ieee-blue dark:text-blue-400 hover:underline flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/events"
          className="inline-flex items-center text-ieee-blue dark:text-blue-400 hover:underline mb-8"
          aria-label="Back to Events"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={event.poster || "/placeholder.svg?height=400&width=800"}
              alt={`Event poster for ${event.title}`}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 text-lg bg-green-500 text-white px-4 py-2">
              Completed
            </span>
          </div>

          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {event.title}
            </h1>
          </div>

          <div className="p-6 space-y-8">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-green-500" />
                <span>{event.mode}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-2 text-green-500" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Users className="w-5 h-5 mr-2 text-green-500" />
                <span>{event.attendance}</span>
              </div>
            </div>

            <hr className="my-6 border-t border-gray-200 dark:border-gray-700" />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Event Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {event.description}
              </p>
            </div>

            <hr className="my-6 border-t border-gray-200 dark:border-gray-700" />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Event Highlights
              </h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                {event.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            <hr className="my-6 border-t border-gray-200 dark:border-gray-700" />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Event Gallery
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {event.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`rounded-lg overflow-hidden cursor-pointer ${
                      index === activeImage ? "col-span-2 row-span-2" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveImage(index)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveImage(index);
                      }
                    }}
                  >
                    <img
                      src={image || "/placeholder.svg?height=200&width=200"}
                      alt={`Event highlight ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <hr className="my-6 border-t border-gray-200 dark:border-gray-700" />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Winners
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {event.winners.map((winner, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Trophy
                          className={`w-8 h-8 mr-3 ${
                            index === 0
                              ? "text-yellow-400"
                              : index === 1
                              ? "text-gray-400"
                              : "text-orange-400"
                          }`}
                        />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {winner.position}
                        </h3>
                      </div>
                      <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                        {winner.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {winner.project}
                      </p>
                      <p className="text-green-600 dark:text-green-400 font-semibold">
                        {winner.prize}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors duration-300 font-semibold text-lg flex items-center justify-center"
                aria-label="View Full Event Gallery"
              >
                <Camera className="w-6 h-6 mr-2" />
                View Full Gallery
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostEventPage.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      poster: PropTypes.string,
      description: PropTypes.string.isRequired,
      mode: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      attendance: PropTypes.string.isRequired,
      highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      winners: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          position: PropTypes.string.isRequired,
          project: PropTypes.string.isRequired,
          prize: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default PostEventPage;
