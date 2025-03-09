import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { client } from "../../sanity";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatSociety = (society) => {
  const societyMap = {
    "ieee-sb": "IEEE SB",
    "ieee-cs": "IEEE CS",
    "ieee-wie": "IEEE WIE",
    "ieee-cis": "IEEE CIS",
    "ieeexacm": "IEEE X ACM",
    "genesis": "Genesis",
  };
  return societyMap[society?.toLowerCase()] || society;
};

export default function SwipeCards() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const query = `*[_type == "event"] | order(startDateTime desc) [0...4] {
        _id, name, startDateTime, eventOverview, description, "poster": poster.asset->url, society
      }`;

      const data = await client.fetch(query);
      const today = new Date();

      setEvents(
        data.map((event) => ({
          ...event,
          status: new Date(event.startDateTime) > today ? "upcoming" : "past",
          poster: event.poster ? urlFor(event.poster) : "",
          formattedDate: formatDate(event.startDateTime),
          formattedSociety: formatSociety(event.society),
        }))
      );
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-ieee-dark">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-ieee-blue dark:text-ieee-light mb-6 text-center"
      >
        Events
      </motion.h1>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto mb-8">
        Explore upcoming and past events organized by IEEE MUJ.
      </p>
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        <EventCardSection events={events} />
      </div>
    </section>
  );
}

const EventCardSection = ({ events }) => {
  const [cards, setCards] = useState(events);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    if (events.length > 0 && cards.length === 0) {
      setCards([...events].reverse());
      setCurrentEventIndex(events.length - 1);
    }
  }, [events, cards.length]);

  if (events.length === 0) {
    return <p className="text-center text-gray-500">No events available</p>;
  }

  const handleCardRemove = (removedCardId) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card._id !== removedCardId);
      const newIndex = updatedCards.length - 1;

      if (updatedCards.length === 0) {
        return [...events].reverse();
      }

      setCurrentEventIndex(newIndex >= 0 ? newIndex : 0);
      return updatedCards;
    });
  };

  const currentEvent = cards.length > 0 ? cards[cards.length - 1] : null;

  const WORD_LIMIT = 50;
  const truncateText = (text, limit) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    return words.length <= limit ? text : words.slice(0, limit).join(" ") + "...";
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
      <div className="grid place-items-center bg-white dark:bg-ieee-dark">
        {cards.map((card) => (
          <SwipeCard
            key={card._id}
            {...card}
            onRemove={() => handleCardRemove(card._id)}
            isFront={card._id === cards[cards.length - 1]._id}
          />
        ))}
      </div>
      <div className="flex items-center justify-center p-6 bg-white dark:bg-ieee-dark">
        {currentEvent ? (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ieee-blue dark:text-ieee-light">
              {currentEvent.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {currentEvent.formattedSociety} | {currentEvent.formattedDate}
            </p>
            <div className="text-md md:text-lg text-gray-800 dark:text-gray-200 mb-6 space-y-4">
              {truncateText(
                currentEvent.status === "upcoming"
                  ? currentEvent.eventOverview
                  : currentEvent.description,
                WORD_LIMIT
              )
                .split("\n")
                .map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
            </div>
            <Link
              to={`/events/${currentEvent.status === "upcoming" ? "pre" : "post"}/${currentEvent._id}`}
              state={{ event: currentEvent }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        ) : (
          <p className="text-gray-500">Loading event details...</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-gray-500 dark:text-gray-400 text-sm"
        >
          Swipe to explore more events!
        </motion.p>
      </div>
    </div>
  );
};

const SwipeCard = ({ _id, poster, onRemove, isFront }) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotate = useTransform(() => {
    const offset = isFront ? 0 : _id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowHint(false), 2000);
  }, []);

  return (
    <motion.img
      src={poster}
      alt={`Poster for ${_id}`}
      className="h-[22rem] md:h-[31rem] w-[18rem] md:w-[25rem] origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
      style={{ gridRow: 1, gridColumn: 1, x, opacity, rotate }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={() => {
        const velocityThreshold = window.innerWidth < 768 ? 300 : 400; // Lower threshold for mobile
        const distanceThreshold = window.innerWidth < 768 ? 75 : 100; // Reduced distance threshold for mobile
      
        if (Math.abs(x.getVelocity()) > velocityThreshold || Math.abs(x.get()) > distanceThreshold) {
          onRemove();
        }
      }}  
    />
  );
};

EventCardSection.propTypes = {
  events: PropTypes.array.isRequired,
};

SwipeCard.propTypes = {
  _id: PropTypes.string.isRequired,
  poster: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  isFront: PropTypes.bool.isRequired,
};
