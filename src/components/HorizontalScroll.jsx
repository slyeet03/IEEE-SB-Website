import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../sanity";
import { FiChevronDown } from "react-icons/fi";
import imageUrlBuilder from "@sanity/image-url";
import { FaCalendarAlt, FaUsers, FaTrophy } from "react-icons/fa";
import CountUp from "react-countup";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const HorizontalScroll = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [events, setEvents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const societies = useMemo(() => ["ieeexacm", "genesis", "ieee-sb", "ieee-cs", "ieee-wie"], []);
  const hasEvents = filteredEvents.length > 0;

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-ieee-dark dark:to-gray-900 p-4 scroll-smooth">
      <div className="sticky top-0 bg-white dark:bg-ieee-dark z-20 py-4 mb-4">
        <div className="flex justify-end">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold text-ieee-blue dark:text-ieee-light">Year:</span>
            <motion.div className="relative dropdown-menu" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200/60 dark:bg-gray-700/80 backdrop-blur-lg text-gray-800 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-colors"
                aria-label="Select Year"
              >
                <span className="font-medium text-sm">{selectedYear}</span>
                <FiChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-xl rounded-md w-32 mt-2 z-10"
                  >
                    {[2022, 2023, 2024, 2025].map((year) => (
                      <motion.li
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setDropdownOpen(false);
                        }}
                        className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors cursor-pointer"
                      >
                        {year}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ieee-blue"></div>
        </div>
      )}

      {!loading && !hasEvents && (
        <p className="text-center text-gray-500 mt-4 text-lg">No events found for {selectedYear}</p>
      )}

      {!loading &&
        hasEvents &&
        societies.map((society) => {
          const societyEvents = filteredEvents.filter((event) => event.society === society);
          return societyEvents.length > 0 ? (
            <div key={society} className="mb-8">
              {/* Sticky Heading */}
              <div className="sticky top-16 bg-white dark:bg-ieee-dark z-10 py-4 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-ieee-blue dark:text-ieee-light uppercase">
                  {society.replace("-", " ")}
                </h2>
                <hr className="border-gray-300 mt-2" />
              </div>
              <HorizontalScrollCarousel events={societyEvents} />
            </div>
          ) : null;
        })}
    </div>
  );
};

const HorizontalScrollCarousel = ({ events }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const totalCards = events.length;

  let stopPercentage;

if (window.innerWidth < 640) {
  if (totalCards === 1) {
    stopPercentage = "0%";
  } else if (totalCards === 2) {
    stopPercentage = "-50%";
  } else {
    stopPercentage = "-85%";
  }
} else {
  if (totalCards === 1) {
    stopPercentage = "0%";
  } else if (totalCards === 2) {
    stopPercentage = "-10%";
  } else {
    stopPercentage = "-60%";
  }
}

  const x = useTransform(scrollYProgress, [0, 1], ["0%", stopPercentage]);

  return (
    <section ref={targetRef} className="relative h-[140vh] bg-white dark:bg-ieee-dark">
      <div className="sticky top-16 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-2 will-change-transform"
        >
          {events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const eventDate = new Date(event.startDateTime);
  const today = new Date();

  const handleClick = () => {
    const route = eventDate < today ? `/events/post/${event._id}` : `/events/pre/${event._id}`;
    navigate(route);
  };


  const formattedDate = eventDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  const optimizedImageUrl = urlFor(event.imageUrl)
    .width(window.innerWidth < 640 ? 280 : 440)
    .height(window.innerWidth < 640 ? 380 : 420)
    .auto("format")
    .url();

  return (
    <motion.div
      onClick={handleClick}
      className="group relative h-[280px] w-[200px] sm:h-[420px] sm:w-[440px] overflow-hidden rounded-2xl shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105 will-change-transform"
      whileHover={{ scale: 1.05 }}
      aria-label={`Event: ${event.name}`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${optimizedImageUrl || "/fallback.jpg"})` }}
      ></div>

      <motion.div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-xl sm:text-3xl font-bold uppercase text-white tracking-wide mb-2 drop-shadow-xl">
          {event.name}
        </h3>
        <div className="flex items-center space-x-2 sm:space-x-4 text-gray-200">
          <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          <p className="text-sm sm:text-base">{formattedDate}</p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 text-gray-200 mt-2">
          <FaUsers className="w-4 h-4 sm:w-5 sm:h-5" />
          <p className="text-sm sm:text-base">Team Size: <CountUp end={event.teamSize} duration={2} /></p>
        </div>
        {event.prizePool > 0 && (
          <div className="flex items-center space-x-2 sm:space-x-4 text-gray-200 mt-2">
            <FaTrophy className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="text-sm sm:text-base">Prize Pool: <CountUp end={event.prizePool} duration={2} prefix="₹" /></p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HorizontalScroll;