import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import PropTypes from "prop-types";

const events = [
  {
    id: 1,
    title: "Hack To The Future",
    image: "/public/hacktofuture.avif",
    
    tag: "IEEE SB MUJ",
    date: "2023-11-15",
  },
  {
    id: 2,
    title: "Campus Coders",
    image: "/public/campuscoders.avif",
    tag: "IEEE SB MUJ",
    date: "2023-11-20",
  },
  {
    id: 3,
    title: "21 Days Of Code 2.0",
    image: "/public/21daysodcode2.0.avif",
    tag: "IEEE SB MUJ",
    date: "2023-12-01",
  },
  {
    id: 4,
    title: "AI Workshop",
    image: "/placeholder.svg?height=200&width=300",
    tag: "IEEE SB MUJ",
    date: "2023-12-10",
  },
];

const EventCard = ({ event }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={event.image || "/placeholder.svg"}
        alt={event.title}
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute top-0 left-0 bg-ieee-blue text-white px-3 py-1 m-2 rounded-full text-sm font-semibold">
        {event.tag}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {event.title}
      </h3>
      <div className="flex items-center text-gray-600 dark:text-gray-400">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{new Date(event.date).toLocaleDateString()}</span>
      </div>
    </div>
  </motion.div>
);

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Events() {
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 3;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-display">
            Latest Events
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our upcoming and ongoing events
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {events
                .slice(
                  currentPage * eventsPerPage,
                  (currentPage + 1) * eventsPerPage
                )
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </AnimatePresence>
          </div>

          <motion.div
            className="absolute top-1/2 -left-12 transform -translate-y-1/2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={prevPage}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </motion.div>

          <motion.div
            className="absolute top-1/2 -right-12 transform -translate-y-1/2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={nextPage}
              className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </motion.div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentPage
                  ? "bg-ieee-blue"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-ieee-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            View All Events
          </motion.button>
        </div>
      </div>
    </section>
  );
}
