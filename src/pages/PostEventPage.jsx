import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanity";
import { Calendar, MapPin, Camera, Users, ArrowLeft } from "lucide-react";

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
  const [activeImage, setActiveImage] = useState(0);

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
        <Link
          to="/events"
          className="inline-flex items-center text-ieee-blue dark:text-blue-400 hover:underline mb-8"
          aria-label="Back to Events"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Poster */}
          {eventData?.poster && (
            <div className="w-full h-64 overflow-hidden mb-8">
              <img
                src={eventData.poster}
                alt={`Event poster for ${eventData.name}`}
                className="w-full h-full object-cover rounded-t-lg" // Stretched horizontally
              />
            </div>
          )}

          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {eventData.name}
            </h1>
          </div>

          <div className="p-6 space-y-8">
            {/* Event Details */}
            <div className="flex flex-wrap gap-6">
              {/* Mode */}
              {eventData?.mode && (
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-green-500" />
                  <span>{eventData.mode}</span>
                </div>
              )}

              {/* Start and End Date */}
              {eventData?.startDateTime && eventData?.endDateTime && (
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Calendar className="w-5 h-5 mr-2 text-green-500" />
                  <span>
                    {new Date(eventData.startDateTime).toLocaleString()} -{" "}
                    {new Date(eventData.endDateTime).toLocaleString()}
                  </span>
                </div>
              )}

              {/* Team Size */}
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
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Event Gallery
              </h2>
              {eventData?.images?.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {eventData.images.map((image, index) => (
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
                        src={image}
                        alt={`Event highlight ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  No images available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap PostEventPage with ErrorBoundary
export default () => (
  <ErrorBoundary>
    <PostEventPage />
  </ErrorBoundary>
);