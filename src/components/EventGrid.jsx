import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../sanity"; // Assuming sanity client is correctly configured
import { FiChevronDown } from "react-icons/fi";
import imageUrlBuilder from "@sanity/image-url";
import { FaCalendarAlt, FaUsers, FaTrophy, FaRupeeSign } from "react-icons/fa";
import CountUp from "react-countup";
import { Fade, Zoom } from "react-awesome-reveal";
import PropTypes from "prop-types";

// Sanity image builder
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// Utility to format society names (can be moved to a shared utility file)
const formatSocietyName = (society) => {
  const societyMap = {
    "ieee-sb": "IEEE SB",
    "ieee-cs": "IEEE CS",
    "ieee-wie": "IEEE WIE",
    "ieee-cis": "IEEE CIS",
    "ieeexacm": "IEEE X ACM",
    "genesis": "GENESIS",
  };
  return societyMap[society?.toLowerCase()] || society?.replace("-", " ").toUpperCase() || '';
};

const EventGrid = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [events, setEvents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSociety, setSelectedSociety] = useState("");
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await client.fetch(
        `*[_type == "event"]{
          _id, name, startDateTime, 
          "imageUrl": poster.asset->url, 
          formLink, society, teamSize, prizePool
        }`
      );
      setEvents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => new Date(event.startDateTime).getFullYear() === selectedYear)
      .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
  }, [events, selectedYear]);

  const availableYears = useMemo(() => {
    const years = new Set();
    events.forEach(event => {
      const year = new Date(event.startDateTime).getFullYear();
      if (year >= 2022) {
        years.add(year);
      }
    });
    years.add(currentYear);
    years.add(currentYear + 1);
    return Array.from(years).sort((a, b) => b - a);
  }, [events, currentYear]);

  const societiesInSelectedYear = useMemo(() => {
    const societies = new Set();
    filteredEvents.forEach(event => {
      if (event.society) {
        societies.add(event.society);
      }
    });
    const fixedOrder = ['ieee-sb', 'ieee-cs', 'ieee-wie'];
    let allSocieties = Array.from(societies);
    const ordered = [];
    fixedOrder.forEach(soc => {
      const idx = allSocieties.indexOf(soc);
      if (idx !== -1) {
        ordered.push(soc);
        allSocieties.splice(idx, 1);
      }
    });
    allSocieties.sort((a, b) => formatSocietyName(a).localeCompare(formatSocietyName(b)));
    return ['all', ...ordered, ...allSocieties];
  }, [filteredEvents]);

  useEffect(() => {
    if (societiesInSelectedYear.length > 0) {
      if (societiesInSelectedYear.includes("all")) {
        setSelectedSociety("all");
      } else {
        setSelectedSociety(societiesInSelectedYear[0]);
      }
    } else {
      setSelectedSociety("");
    }
  }, [societiesInSelectedYear, selectedYear]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const finalFilteredEvents = useMemo(() => {
    if (selectedSociety === "all" || !selectedSociety) {
      return filteredEvents;
    }
    return filteredEvents.filter((event) => event.society === selectedSociety);
  }, [filteredEvents, selectedSociety]);

  return (
    <div className="bg-white dark:bg-ieee-dark py-8 px-4 sm:px-6 lg:px-8">
      {/* Filter Controls (Sticky Header) */}
      <div className="sticky top-0 bg-white dark:bg-ieee-dark z-20 pt-4 pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Year Selector */}
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-ieee-blue-DEFAULT dark:text-ieee-light whitespace-nowrap">
              Filter by:
            </span>
            <motion.div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue-DEFAULT focus:ring-opacity-50"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="Select Event Year"
              >
                <span className="font-medium text-base">{selectedYear}</span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bg-white dark:bg-gray-800 shadow-xl rounded-lg w-32 mt-2 z-30 ring-1 ring-ieee-blue-light/20 dark:ring-ieee-blue-dark/20 max-h-60 overflow-y-auto"
                  >
                    {availableYears.map((year) => (
                      <li
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setDropdownOpen(false);
                        }}
                        className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-ieee-blue-light/10 dark:hover:bg-gray-700/50 transition-colors cursor-pointer last:rounded-b-lg first:rounded-t-lg"
                      >
                        {year}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
           {/* Society Filter Tabs */}
          {societiesInSelectedYear.length > 1 && (
            <Fade direction="right" triggerOnce>
              <div className="flex flex-wrap justify-center gap-2">
                {societiesInSelectedYear.map((society) => (
                  <motion.button
                    key={society}
                    onClick={() => setSelectedSociety(society)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-out shadow-sm
                      ${selectedSociety === society
                        ? "bg-ieee-blue text-white dark:bg-ieee-light dark:text-ieee-dark font-semibold border border-ieee-blue dark:border-ieee-light"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-transparent"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {formatSocietyName(society)}
                  </motion.button>
                ))}
              </div>
            </Fade>
          )}
        </div>
      </div>
      {/* Content Area */}
      <div className="max-w-7xl mx-auto py-6">
        {loading && (
          <div className="flex flex-col justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-ieee-blue-DEFAULT border-t-transparent rounded-full mb-4"
            ></motion.div>
            <p className="text-ieee-blue-DEFAULT dark:text-ieee-light text-lg">Loading events...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 dark:text-red-400 text-lg py-8">
            <p>{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 px-6 py-2 bg-ieee-blue-DEFAULT text-white rounded-lg hover:bg-ieee-blue-dark transition-colors"
            >
              Retry
            </button>
          </div>
        )}
        {!loading && !error && finalFilteredEvents.length === 0 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-500 dark:text-gray-400 text-xl py-10"
          >
            No events found for {selectedSociety === "all" ? "the selected year" : formatSocietyName(selectedSociety)} in {selectedYear}.
            <br />Please select another year or society.
          </motion.p>
        )}
        {!loading && !error && finalFilteredEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            <AnimatePresence>
              {finalFilteredEvents.map((event) => (
                <Zoom key={event._id} triggerOnce duration={600} cascade damping={0.1}>
                  <EventCard event={event} navigate={navigate} />
                </Zoom>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event, navigate }) => {
  const eventDate = new Date(event.startDateTime);
  const today = new Date();

  const handleClick = useCallback(() => {
    const route =
      eventDate < today
        ? `/events/post/${event._id}`
        : `/events/pre/${event._id}`;
    navigate(route, { state: { event: event } });
  }, [event, eventDate, navigate, today]);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const optimizedImageUrl = useMemo(() => {
    const width = 600;
    const height = 400;
    return urlFor(event.imageUrl)
      .width(width)
      .height(height)
      .quality(80)
      .auto("format")
      .url();
  }, [event.imageUrl]);


  return (
    <motion.div
      onClick={handleClick}
      className="group relative w-full aspect-[9/13] mx-auto overflow-hidden rounded-2xl shadow-xl dark:shadow-2xl cursor-pointer transition-all duration-300 ease-out hover:scale-[1.035] active:scale-[0.98] will-change-transform border border-gray-100 dark:border-gray-700/50"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Event: ${event.name}, ${formattedDate}`}
      role="button"
    >
      {/* Poster as background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${optimizedImageUrl || "/placeholder-event.jpg"})` }}
      />
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
      {/* Content Overlay at bottom - Adjusted padding and flex for better content display */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 sm:px-5 sm:py-4 flex flex-col justify-end">
        <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide mb-1 drop-shadow-lg leading-tight text-white line-clamp-2"> {/* Added line-clamp-2 */}
          {event.name}
        </h3>
        <div className="flex items-center space-x-3 text-gray-200 text-sm sm:text-base mb-1">
          <FaCalendarAlt className="w-4 h-4 text-ieee-blue-light" />
          <p>{formattedDate}</p>
        </div>
        <div className="flex items-center space-x-3 text-gray-200 text-sm sm:text-base mb-1">
          <FaUsers className="w-4 h-4 text-ieee-blue-light" />
          <p>Team Size: <CountUp end={event.teamSize || 1} duration={1.5} /></p>
        </div>
        {(event.prizePool ?? 0) > 0 && (
          <div className="flex items-center space-x-3 text-gray-200 text-sm sm:text-base">
            <FaTrophy className="w-4 h-4 text-ieee-blue-light" />
            <p>
              Prize Pool:&nbsp;
              <CountUp end={event.prizePool} duration={1.5} prefix="₹" separator="," />
            </p>
          </div>
        )}
      </div>
      {/* Status Badge */}
      <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full shadow-md z-30
        ${eventDate < today
          ? "bg-gray-600 text-white"
          : "bg-ieee-blue-DEFAULT text-white"
        }`}
      >
        {eventDate < today ? "Past" : "Upcoming"}
      </span>
    </motion.div>
  );
};

// PropTypes for EventCard
EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default EventGrid;