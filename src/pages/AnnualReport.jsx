import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../sanity";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const AnnualReport = () => {
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const query = `*[_type == "event"] | order(startDateTime desc) {
        name, 
        description, 
        society,
        startDateTime, 
        "posterUrl": poster.asset->url,
        _id
      }`;
      const data = await client.fetch(query);

      // Filter out future events
      const today = new Date();
      const pastEvents = data.filter((event) => new Date(event.startDateTime) <= today);

      setEvents(pastEvents);
    };
    fetchEvents();
  }, []);

  // Group events by year
  const groupedEvents = events.reduce((acc, event) => {
    const year = new Date(event.startDateTime).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* Header */}
      <motion.div
        className="header w-full text-center py-16 shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold tracking-wider text-ieee-blue">
          Annual Report
        </h1>
        <p className="text-lg opacity-80 font-medium">
          A journey through IEEE MUJ’s greatest events.
        </p>
      </motion.div>

      {/* Year Selector */}
      <div className="flex justify-center mb-8 p-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-color)] text-[var(--text-color)] rounded-lg shadow-md hover:bg-opacity-90 transition-all"
          >
            <span className="text-lg font-semibold">{selectedYear}</span>
            <FiChevronDown
              className={`transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {/* Dropdown Backdrop */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 z-40"
                onClick={() => setDropdownOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute mt-2 w-full bg-[var(--bg-color)] rounded-lg shadow-lg z-50 border border-[var(--accent-color)]"
              >
                {Object.keys(groupedEvents)
                  .sort((a, b) => b - a)
                  .map((year) => (
                    <motion.li
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-[var(--accent-color)] hover:text-[var(--text-color)] cursor-pointer transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      {year}
                    </motion.li>
                  ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Timeline Line */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-[var(--accent-color)]"></div>

        {groupedEvents[selectedYear]?.map((event, index) => (
          <motion.div
            key={event._id}
            className={`relative flex items-center mb-14 cursor-pointer ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => navigate(`/events/post/${event._id}`)}
          >
            {/* Timeline Dot */}
            <div className="absolute left-1/2 w-5 h-5 rounded-full timeline-dot transform -translate-x-1/2"></div>

            {/* Event Card */}
            <motion.div
              className={`relative p-6 rounded-lg shadow-lg event-card max-w-lg transition-transform duration-300 hover:scale-105 ${
                index % 2 === 0 ? "ml-20" : "mr-20"
              }`}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              {event.posterUrl && (
                <motion.img
                  src={event.posterUrl}
                  alt={event.name}
                  className="w-full max-h-56 object-cover rounded-md mb-4"
                  whileHover={{ scale: 1.1 }}
                />
              )}
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-sm font-semibold text-[var(--accent-color)]">
                Organized by: {event.society.toUpperCase()}
              </p>
              <p className="mt-2 text-gray-300">
                {event.description.length > 100
                  ? `${event.description.substring(0, 100)}...`
                  : event.description}
              </p>
              <p className="mt-1 text-sm text-gray-400">
                📅 {new Date(event.startDateTime).toDateString()}
              </p>
            </motion.div>
          </motion.div>
        )) || (
          <p className="text-center text-gray-500 py-10">
            No events found for this year.
          </p>
        )}
      </div>
    </div>
  );
};

export default AnnualReport;