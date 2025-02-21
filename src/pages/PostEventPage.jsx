import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../../sanity";
import { Calendar, MapPin, Users, ArrowLeft, X, Award, User, Mic } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";

// Sanity image builder
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).width(800).url();

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
          "poster": poster.asset,
          startDateTime,
          endDateTime,
          mode,
          "images": images[].asset,
          description,
          prizePool,
          teamSize,
          entryFee,
          society,
          category,
          winners {
            firstPlace,
            secondPlace,
            thirdPlace
          },
          speakers[] {
            name,
            profession,
            "photo": photo.asset->url
          }
        }`;
        const data = await client.fetch(query, { id });
        if (!data) {
          throw new Error("Event not found");
        }
        setEventData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const formatDateTime = (dateStr) => {
    const options = { 
      day: "numeric", 
      month: "long", 
      year: "numeric",
      hour: "numeric", 
      minute: "numeric", 
      hour12: true
    };
    return new Date(dateStr).toLocaleString("en-US", options);
  };

  const closeImageModal = useCallback(() => setActiveImage(null), []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h2 className="text-3xl font-extrabold animate-pulse">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        <h2 className="text-2xl font-bold">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white relative">
      {/* Back Button */}
      <Link
        to="/events"
        className="absolute top-5 left-5 text-ieee-blue dark:text-ieee-light hover:underline"
      >
        <ArrowLeft className="w-6 h-6 inline-block" /> Back
      </Link>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Event Poster */}
          {eventData?.poster && (
            <motion.div
              className="w-full aspect-[3/4] max-w-md mx-auto overflow-hidden rounded-lg shadow-lg"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={urlFor(eventData.poster)}
                alt="Event Poster"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Event Details */}
          <div className="space-y-5">
            {/* Event Title */}
            <motion.h2
              className="text-4xl font-extrabold text-ieee-blue dark:text-ieee-light"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {eventData.name}
            </motion.h2>

            {/* Tags - Category & Society */}
            <div className="flex gap-2">
              {eventData?.category && (
                <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-full">
                  {eventData.category}
                </span>
              )}
              {eventData?.society && (
                <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-purple-600 dark:bg-purple-500 rounded-full">
                  {eventData.society}
                </span>
              )}
            </div>

            <div className="space-y-3 text-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-green-500" />
                <span className="font-medium">{eventData.mode}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-yellow-400" />
                <span className="font-medium">
                  {formatDateTime(eventData.startDateTime)} -{" "}
                  {formatDateTime(eventData.endDateTime)}
                </span>
              </div>

              {eventData?.teamSize && (
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-pink-400" />
                  <span className="font-medium">Team Size: {eventData.teamSize}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Description */}
        {eventData?.description && (
          <motion.div className="mt-10 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-ieee-blue dark:text-ieee-light">Overview</h3>
            <div className="text-gray-700 dark:text-gray-300 mt-4 space-y-4">
              {eventData.description.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Speakers Section */}
        {eventData?.speakers?.length > 0 && (
          <motion.div
            className="mt-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-ieee-blue dark:text-ieee-light mb-6">Speakers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {eventData.speakers.map((speaker, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  {speaker.photo && (
                    <img
                      src={urlFor(speaker.photo)}
                      alt={speaker.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                  )}
                  <h4 className="text-xl font-semibold">{speaker.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{speaker.profession}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Event Gallery */}
        {eventData?.images?.length > 0 && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-ieee-blue dark:text-ieee-light mb-6">Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {eventData.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveImage(urlFor(image))}
                >
                  <img
                    src={urlFor(image)}
                    alt={`Event highlight ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* View Gallery Button */}
            <div className="flex justify-center mt-8">
              <Link
                to="/gallery"
                className="px-6 py-3 bg-ieee-blue text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                View Gallery
              </Link>
            </div>
          </motion.div>
        )}

        {/* Winners Section */}
        {eventData?.winners && (
          <motion.div
            className="mt-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-ieee-blue dark:text-ieee-light mb-6">Winners</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {eventData.winners.firstPlace && (
                <motion.div
                  className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold">1st Place</h4>
                  <p className="text-gray-700 dark:text-gray-300">{eventData.winners.firstPlace}</p>
                </motion.div>
              )}
              {eventData.winners.secondPlace && (
                <motion.div
                  className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold">2nd Place</h4>
                  <p className="text-gray-700 dark:text-gray-300">{eventData.winners.secondPlace}</p>
                </motion.div>
              )}
              {eventData.winners.thirdPlace && (
                <motion.div
                  className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold">3rd Place</h4>
                  <p className="text-gray-700 dark:text-gray-300">{eventData.winners.thirdPlace}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.img
              src={activeImage}
              className="max-w-3xl rounded-lg shadow-lg"
            />
            <X className="absolute top-5 right-5 w-8 h-8 text-white cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostEventPage;