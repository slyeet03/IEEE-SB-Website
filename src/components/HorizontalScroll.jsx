import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../sanity";
import { FiChevronDown } from "react-icons/fi";

const HorizontalScroll = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [events, setEvents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "event"]{
            _id,
            name,
            startDateTime,
            "imageUrl": poster.asset->url,
            formLink,
            society
          }`
        );

        const filteredEvents = data
          .filter(event => new Date(event.startDateTime).getFullYear() === selectedYear)
          .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));

        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedYear]);

  const societies = ["ieee-sb", "ieee-cs", "ieee-wie"];

  return (
    <div className="bg-white dark:bg-ieee-dark p-4 scroll-smooth">
      {/* Sorting Filters */}
      <div className="sticky top-0 bg-white dark:bg-ieee-dark z-20 py-4 mb-4">
        <div className="flex justify-end">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold text-ieee-blue dark:text-ieee-light">Year:</span>
            <motion.div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <span className="font-medium text-sm">{selectedYear}</span>
                <FiChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
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

      {/* Horizontal Scroll Sections */}
      {societies.map((society) => {
        const societyEvents = events.filter(event => event.society === society);
        return (
          <div key={society} className="mb-4">
            <div className="sticky top-20 bg-white dark:bg-ieee-dark z-10 py-4 text-left">
              <h2 className="text-3xl font-semibold text-ieee-blue dark:text-ieee-light uppercase">
                {society.replace("-", " ")}
              </h2>
              <hr className="border-gray-300 mt-1" />
            </div>
            {societyEvents.length > 0 ? (
              <HorizontalScrollCarousel events={societyEvents} />
            ) : (
              <p className="text-center text-gray-500 mt-2">No events found</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const HorizontalScrollCarousel = ({ events }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-100%"]);

  return (
    <section ref={targetRef} className="relative h-[180vh] bg-white dark:bg-ieee-dark">
      <div className="sticky top-24 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-5">
          {events.slice(0, 7).map((event) => (
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
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${event.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0"
      ></div>

      {/* Animated Hover Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <p className="text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide px-6 text-center drop-shadow-xl">
          {event.name}
        </p>
      </motion.div>
    </div>
  );
};

export default HorizontalScroll;
