// components/events/EventFetcher.jsx
import { useState, useEffect } from "react";
import { client } from "../../../sanity"; // Adjust path as needed
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

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event"] | order(startDateTime desc) [0...4] {
          _id, name, startDateTime, eventOverview, description, "poster": poster.asset->url, society
        }`;

        const data = await client.fetch(query);
        const today = new Date();

        setEvents(
          data.map((event) => ({
            ...event,
            status: new Date(event.startDateTime) > today ? "upcoming" : "past",
            poster: event.poster ? urlFor(event.poster) : "/placeholder-event.png", // Added placeholder
            formattedDate: formatDate(event.startDateTime),
            formattedSociety: formatSociety(event.society),
          }))
        );
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
}

// You might also export urlFor, formatDate, formatSociety if they are needed elsewhere
export { urlFor, formatDate, formatSociety };