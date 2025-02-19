import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../../sanity";
import { Calendar, MapPin, Users, ArrowLeft, X } from "lucide-react";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Something went wrong. Please try again later.
          </h2>
        </div>
      );
    }
    return this.props.children;
  }
}

const PostEventPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const query = `*[_type == "event" && _id == $id][0] {
          name,
          "poster": poster.asset->url,
          startDateTime,
          endDateTime,
          mode,
          "images": images[].asset->url,
          description,
          prizePool,
          teamSize,
          entryFee,
          society,
          category
        }`;
        const data = await client.fetch(query, { id });
        if (!data) {
          throw new Error("Event not found");
        }
        setEventData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const closeImageModal = useCallback(() => setActiveImage(null), []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Loading event details...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/events"
          className="inline-flex items-center text-ieee-blue dark:text-blue-400 hover:underline mb-8"
          aria-label="Back to Events"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Event Poster */}
          {eventData?.poster && (
            <motion.div
              className="w-full h-72 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={eventData.poster}
                alt={`Event poster for ${eventData.name}`}
                className="w-full h-full object-cover rounded-t-lg"
                loading="lazy"
              />
            </motion.div>
          )}

          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {eventData.name}
            </h1>
          </div>

          <div className="p-6 space-y-8">
            {/* Event Details */}
            <div className="flex flex-wrap gap-6">
              {eventData?.mode && (
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-green-500" />
                  <span>{eventData.mode}</span>
                </div>
              )}
              {eventData?.startDateTime && eventData?.endDateTime && (
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Calendar className="w-5 h-5 mr-2 text-green-500" />
                  <span>
                    {new Date(eventData.startDateTime).toLocaleString()} -{" "}
                    {new Date(eventData.endDateTime).toLocaleString()}
                  </span>
                </div>
              )}
              {eventData?.teamSize && (
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Users className="w-5 h-5 mr-2 text-green-500" />
                  <span>Team Size: {eventData.teamSize}</span>
                </div>
              )}
            </div>

            <hr className="my-6 border-t border-gray-200 dark:border-gray-700" />

            {/* Event Overview */}
            {eventData?.description && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Event Overview
                </h2>
                {eventData.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            <hr className="my-6 border-t border-gray-200 dark:border-gray-700" />

            {/* Event Gallery */}
            {eventData?.images?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Event Gallery
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {eventData.images.map((image, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setActiveImage(image)}
                    >
                      <img
                        src={image}
                        alt={`Event highlight ${index + 1}`}
                        className="w-full h-32 object-cover"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.img
              src={activeImage}
              className="max-w-3xl rounded-lg shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <X className="absolute top-5 right-5 w-8 h-8 text-white cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WrappedPostEventPage = () => (
  <ErrorBoundary>
    <PostEventPage />
  </ErrorBoundary>
);

export default WrappedPostEventPage;
