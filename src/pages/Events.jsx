import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, Calendar, Tag } from 'lucide-react';
import PropTypes from 'prop-types';
import ieeecs from "../assets/ieeecs.png";
import ieeewie from "../assets/ieeewie.png";
import ieeecis from "../assets/ieeecis.png";

const events = [
  {
    id: 1,
    title: "Hack To The Future",
    tag: "IEEE SB MUJ",
    date: "2023-11-15",
    poster: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    overview: "Join us for an exciting 24-hour hackathon where you'll build innovative solutions for real-world problems!",
    description: "An innovative hackathon that brings together tech enthusiasts to solve real-world challenges and push the boundaries of technological innovation.",
    status: "upcoming",
    mode: "Online",
    prizePool: "$5000",
    registrationLink: "https://example.com/hackathon-register"
  },
  {
    id: 2,
    title: "Campus Coders",
    tag: "IEEE SB MUJ", 
    date: "2023-11-20",
    poster: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A comprehensive coding workshop designed to enhance programming skills, covering the latest trends and technologies in software development.",
    status: "past",
    venue: "Main Campus Auditorium"
  },
  {
    id: 3,
    title: "AI Workshop",
    tag: "IEEE SB MUJ",
    date: "2023-12-10",
    poster: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    overview: "Dive deep into the world of Artificial Intelligence with our comprehensive workshop.",
    description: "An in-depth exploration of Artificial Intelligence, covering machine learning, neural networks, and practical applications of AI technologies.",
    status: "upcoming",
    mode: "Hybrid",
    speakerDetails: "Featuring industry experts from leading tech companies"
  },
  {
    id: 4,
    title: "Robotics Expo",
    tag: "IEEE Region",
    date: "2024-01-15",
    poster: "https://images.unsplash.com/photo-1555255707-c349906ac33e?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    overview: "Showcase of cutting-edge robotics technologies and innovations.",
    description: "A comprehensive exhibition featuring the latest advancements in robotics, with demonstrations from top research institutions and tech companies.",
    status: "upcoming",
    mode: "On-campus",
    projectCategories: ["Industrial Robotics", "AI-powered Robots", "Student Innovations"]
  },
  {
    id: 5,
    title: "Blockchain Symposium",
    tag: "Global IEEE",
    date: "2024-02-20",
    poster: "https://images.unsplash.com/photo-1637763723781-4b141ac94863?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    overview: "Global conference on blockchain technologies and their impact on various industries.",
    description: "An international symposium exploring the transformative potential of blockchain technologies across finance, healthcare, and other critical sectors.",
    status: "upcoming",
    mode: "Online",
    keyTopics: ["Cryptocurrency", "Smart Contracts", "Decentralized Finance"]
  },
  {
    id: 6,
    title: "Machine Learning Bootcamp",
    tag: "IEEE SB MUJ",
    date: "2024-03-05",
    poster: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    overview: "Intensive training program in machine learning and data science.",
    description: "A hands-on bootcamp designed to equip participants with practical machine learning skills, from basic concepts to advanced applications.",
    status: "upcoming",
    mode: "Hybrid",
    prerequisite: "Basic programming knowledge recommended"
  },
  {
    id: 7,
    title: "Cybersecurity Summit",
    tag: "IEEE Region",
    date: "2024-04-12",
    poster: "https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    overview: "Comprehensive conference on latest cybersecurity trends and threats.",
    description: "A critical gathering of cybersecurity professionals, researchers, and industry leaders to discuss emerging threats and innovative protection strategies.",
    status: "upcoming",
    mode: "On-campus",
    keyExperts: ["Renowned Ethical Hackers", "Cybersecurity Research Leads"]
  }
];

// ... rest of the previous component code remains the same
export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState(events);

  const years = ["2023", "2024", "2025"];
  const tags = ["All", "IEEE SB MUJ", "IEEE Region", "Global IEEE"];

  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        event.date.startsWith(selectedYear) &&
        (selectedTag === "All" || event.tag === selectedTag)
    );
    setFilteredEvents(filtered);
  }, [searchQuery, selectedYear, selectedTag]);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        >
          IEEE SB MUJ Events
        </motion.h1>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-10 pr-8 py-2 w-full md:w-40 appearance-none border border-gray-300 dark:border-gray-700 rounded-full shadow-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-10 pr-8 py-2 w-full md:w-48 appearance-none border border-gray-300 dark:border-gray-700 rounded-full shadow-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Swiping Events Section */}
        <EventCardSection events={filteredEvents} />
      </div>
    </section>
  );
}

const EventCardSection = ({ events }) => {
  const [cards, setCards] = useState(events);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    setCards(events);
    setCurrentEventIndex(0);
  }, [events]);

  const currentEvent = events[currentEventIndex];

  const handleCardRemove = (removedCardId) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.id !== removedCardId);
      
      if (updatedCards.length === 0) {
        return events;
      }
      
      return updatedCards;
    });

    setCurrentEventIndex((prevIndex) => 
      (prevIndex + 1) % events.length
    );
  };

  return (
    <div className="grid md:grid-cols-2 h-[600px]">
      {/* Swipe Cards Section */}
      <div className="grid h-full w-full place-items-center bg-white dark:bg-gray-800">
        {cards.map((card) => (
          <SwipeCard 
            key={card.id} 
            {...card} 
            onRemove={() => handleCardRemove(card.id)}
            cards={cards}
          />
        ))}
      </div>

      {/* Event Information Section */}
      <div className="flex items-center justify-center p-8 bg-white dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {currentEvent.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {currentEvent.tag} | {new Date(currentEvent.date).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
            {currentEvent.description || currentEvent.overview}
          </p>
          <Link 
            to={`/events/${currentEvent.status === 'upcoming' ? 'pre' : 'post'}/${currentEvent.id}`}
            state={{ event: currentEvent }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

const SwipeCard = ({ id, poster, url, onRemove, cards }) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  
  const isFront = id === cards[cards.length - 1].id;
  
  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      onRemove();
    }
  };

  return (
    <motion.img
      src={poster || url}
      alt="Event Card"
      className="h-96 w-72 origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    />
  );
};

Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  )
};

EventCardSection.propTypes = {
  events: PropTypes.array.isRequired
};