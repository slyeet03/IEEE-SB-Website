import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../sanity";
import { FiChevronDown } from "react-icons/fi";

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
          formLink, society
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

  const societies = useMemo(() => ["genesis", "ieee-sb", "ieee-cs", "ieee-wie"], []);
  const hasEvents = filteredEvents.length > 0;

  return (
    <div className="bg-white dark:bg-ieee-dark p-4 scroll-smooth">
      <div className="sticky top-0 bg-white dark:bg-ieee-dark z-20 py-4 mb-4">
        <div className="flex justify-end">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold text-ieee-blue dark:text-ieee-light">Year:</span>
            <motion.div className="relative dropdown-menu" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <span className="font-medium text-sm">{selectedYear}</span>
                <FiChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
              </button>

              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bg-white dark:bg-gray-800 shadow-xl rounded-md w-32 mt-2 z-10"
                >
                  {[2021, 2022, 2023, 2024, 2025].map((year) => (
                    <motion.li
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {year}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500 mt-4 text-lg">Loading events...</p>}

      {!loading && !hasEvents && (
        <p className="text-center text-gray-500 mt-4 text-lg">No events found for {selectedYear}</p>
      )}

      {!loading &&
        hasEvents &&
        societies.map((society) => {
          const societyEvents = filteredEvents.filter((event) => event.society === society);
          return societyEvents.length > 0 ? (
            <div key={society} className="mb-4">
              <div className="sticky top-20 bg-white dark:bg-ieee-dark z-10 py-4 text-left">
                <h2 className="text-3xl font-semibold text-ieee-blue dark:text-ieee-light uppercase">
                  {society.replace("-", " ")}
                </h2>
                <hr className="border-gray-300 mt-1" />
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
  if (totalCards === 1) {
    stopPercentage = "0%"; 
  } else if (totalCards === 2) {
    stopPercentage = "-50%"; 
  } else {
    stopPercentage = "-80%"; 
  }

  const x = useTransform(scrollYProgress, [0, 1], ["0%", stopPercentage]);

  return (
    <section ref={targetRef} className="relative h-[140vh] bg-white dark:bg-ieee-dark">
      <div className="sticky top-16 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-5">
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

  return (
    <div
      onClick={handleClick}
      className="group relative h-[380px] w-[280px] sm:h-[420px] sm:w-[440px] overflow-hidden rounded-xl shadow-xl cursor-pointer transition-transform duration-300 hover:scale-110"
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl || "/fallback.jpg"})` }}
      ></div>

      <motion.div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide px-6 text-center drop-shadow-xl">
          {event.name}
        </p>
      </motion.div>
    </div>
  );
};

export default HorizontalScroll;
