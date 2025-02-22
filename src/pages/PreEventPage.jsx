import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../../sanity";
import { Calendar, MapPin, Users, DollarSign, Award, ArrowLeft, X, Phone, User } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";

// Sanity Image Builder
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).width(800).url();

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
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <h2 className="text-2xl font-bold">Something went wrong. Please try again later.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

const EventDetails = ({ eventData }) => {
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-5">
      <motion.h2
        className="text-4xl font-extrabold text-ieee-blue dark:text-ieee-light"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {eventData.name}
      </motion.h2>

      <div className="flex gap-2">
        {eventData?.category && (
          <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-full">
            {eventData.category}
          </span>
        )}
        {eventData?.society && (
          <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-purple-600 dark:bg-purple-500 rounded-full">
            {eventData.society.replace(/-/g, " ")}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <MapPin className="w-6 h-6 text-green-500" />
        <span className="font-medium">{eventData.mode}</span>
      </div>

      <div className="space-y-3 text-lg">
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

        {eventData?.entryFee && (
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-blue-400" />
            <span className="font-medium">Entry Fee: {eventData.entryFee}</span>
          </div>
        )}

        {eventData?.prizePool && (
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-orange-400" />
            <span className="font-medium">Prize Pool: {eventData.prizePool}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const EventOverview = ({ eventOverview }) => (
  <motion.div
    className="mt-10 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h3 className="text-2xl font-bold text-ieee-blue dark:text-ieee-light">Overview</h3>
    <div className="text-gray-700 dark:text-gray-300 mt-4 space-y-4">
      {eventOverview.split("\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  </motion.div>
);

const ContactInfo = ({ contactInfo }) => (
  <motion.div
    className="mt-10 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <h3 className="text-2xl font-bold text-ieee-blue dark:text-ieee-light">Contact Information</h3>
    <div className="text-gray-700 dark:text-gray-300 mt-4 space-y-4">
      <div className="flex items-center space-x-3">
        <User className="w-6 h-6 text-green-500" />
        <span className="font-medium">{contactInfo.contactPerson}</span>
      </div>
      <div className="flex items-center space-x-3">
        <Phone className="w-6 h-6 text-blue-500" />
        <span className="font-medium">{contactInfo.contactPhone}</span>
      </div>
    </div>
  </motion.div>
);

const PreEventPage = () => {
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
          startDateTime,
          endDateTime,
          mode,
          eventOverview,
          formLink,
          teamSize,
          prizePool,
          entryFee,
          society,
          category,
          poster,
          resources[]{"url": asset->url},
          contactInfo {
            contactPerson,
            contactPhone
          }
        }`;
        const data = await client.fetch(query, { id });
        if (!data) throw new Error("Event not found");
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

  const closeImageModal = () => setActiveImage(null);

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
      <Link
        to="/events"
        className="absolute top-5 left-5 text-ieee-blue dark:text-ieee-light hover:underline"
      >
        <ArrowLeft className="w-6 h-6 inline-block" /> Back
      </Link>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">
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

          <EventDetails eventData={eventData} />
        </div>

        {eventData?.eventOverview && <EventOverview eventOverview={eventData.eventOverview} />}

        {eventData?.contactInfo && <ContactInfo contactInfo={eventData.contactInfo} />}

        {eventData?.formLink && (
          <div className="text-center mt-10">
            <a
              href={eventData.formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-ieee-blue text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            >
              Register Now
            </a>
          </div>
        )}
      </div>

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
            />
            <X className="absolute top-5 right-5 w-8 h-8 text-white cursor-pointer" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WrappedPreEventPage = () => (
  <ErrorBoundary>
    <PreEventPage />
  </ErrorBoundary>
);

export default WrappedPreEventPage;