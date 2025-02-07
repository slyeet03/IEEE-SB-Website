import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import HorizontalScroll from "../components/HorizontalScroll";
import { client } from "../../sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

// Function to format date as "5 June, 2024"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Function to properly format society names
const formatSociety = (society) => {
  const societyMap = {
    "ieee-sb": "IEEE SB",
    "ieee-cs": "IEEE CS",
    "ieee-wie": "IEEE WIE",
    "ieee-cis": "IEEE CIS",
  };
  return societyMap[society.toLowerCase()] || society;
};

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const query = `*[_type == "event"] | order(startDateTime desc) [0...4] {
        _id,
        name,
        startDateTime,
        eventOverview,
        description,
        "poster": poster.asset->url,
        society
      }`;

      const data = await client.fetch(query);
      const today = new Date();

      const processedEvents = data.map((event) => ({
        ...event,
        status: new Date(event.startDateTime) > today ? "upcoming" : "past", // Fix date comparison
        poster: event.poster ? urlFor(event.poster) : "",
        formattedDate: formatDate(event.startDateTime), // Format the date correctly
        formattedSociety: formatSociety(event.society), // Format society names
      }));

      setEvents(processedEvents);
    };

    fetchEvents();
  }, []);

  return (
    <section className="w-full py-20 bg-white dark:bg-ieee-dark">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-ieee-blue dark:text-ieee-light mb-4 text-center"
        >
          Events
        </motion.h1>
        <p className="text-lg text-black dark:text-ieee-light text-center">
          Explore upcoming and past events organized by IEEE SB MUJ.
        </p>

        {/* Swiping Events Section */}
        <EventCardSection events={events} />
        <HorizontalScroll />
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

  if (events.length === 0) {
    return <p className="text-center text-gray-500">No events available</p>;
  }

  const currentEvent = events[currentEventIndex];

  const handleCardRemove = (removedCardId) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card._id !== removedCardId);
      return updatedCards.length === 0 ? events : updatedCards;
    });

    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);

    
  };

  const WORD_LIMIT = 50; 
  const truncateText = (text, limit) => {
    if (!text) return ""; 
    const words = text.split(/\s+/); 
    if (words.length <= limit) return text; 
    return words.slice(0, limit).join(" ") + "..."; 
  };
  
  return (
    <div className="grid md:grid-cols-2 h-[600px]">
      {/* Swipe Cards Section */}
      <div className="grid h-full w-full place-items-center bg-white dark:bg-ieee-dark">
        {cards.map((card) => (
          <SwipeCard
            key={card._id}
            {...card}
            onRemove={() => handleCardRemove(card._id)}
            cards={cards}
          />
        ))}
      </div>

      {/* Event Details */}
      <div className="flex items-center justify-center p-8 bg-white dark:bg-ieee-dark">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-ieee-blue dark:text-ieee-light">
            {currentEvent.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {currentEvent.formattedSociety} | {currentEvent.formattedDate}
          </p>
          {(() => {
            const fullText = (currentEvent.status === "upcoming" ? currentEvent.eventOverview : currentEvent.description) || "";
            const truncatedText = truncateText(fullText, WORD_LIMIT);
            return (
              <div className="text-lg text-gray-800 dark:text-gray-200 mb-6 space-y-4">
                {truncatedText.split("\n").map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            );
          })()}
          <Link
            to={`/events/${currentEvent.status === "upcoming" ? "pre" : "post"}/${currentEvent._id}`}
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

const SwipeCard = ({ _id, poster, onRemove, cards }) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = _id === cards[cards.length - 1]._id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : _id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      onRemove();
    }
  };

  return (
    <motion.img
      src={poster}
      alt="Event Card"
      className="h-[31rem] w-[25rem] origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
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

// PropTypes
Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      startDateTime: PropTypes.string.isRequired,
      eventOverview: PropTypes.string,
      description: PropTypes.string,
      society: PropTypes.string.isRequired,
      poster: PropTypes.string,
    })
  ),
};

EventCardSection.propTypes = {
  events: PropTypes.array.isRequired,
};

export { Events };
