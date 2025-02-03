import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Search, Calendar, Tag } from "lucide-react";
import PreEventCard from "./PreEventCard";
import PostEventCard from "./PostEventCard";
import PropTypes from "prop-types";

const events = [
  {
    id: 1,
    title: "Hack To The Future",
    tag: "IEEE SB MUJ",
    date: "2023-11-15",
    poster: "/placeholder.svg?height=400&width=600",
    overview:
      "Join us for an exciting 24-hour hackathon where you'll build innovative solutions for real-world problems!",
    mode: "Online",
    startDate: "2023-11-15T09:00:00",
    endDate: "2023-11-16T09:00:00",
    prizePool: "$5000",
    teamSize: "3-4 members",
    registrationLink: "https://example.com/register",
    organizingCommittee: [
      { name: "John Doe", role: "Event Lead" },
      { name: "Jane Smith", role: "Technical Lead" },
      { name: "Alex Johnson", role: "Marketing Lead" },
    ],
    schedule: [
      {
        time: "09:00 AM",
        event: "Opening Ceremony",
        description: "Welcome address and event kickoff",
      },
      {
        time: "10:00 AM",
        event: "Team Formation",
        description: "Form teams and brainstorm ideas",
      },
      {
        time: "12:00 PM",
        event: "Mentorship Session",
        description: "One-on-one mentorship with industry experts",
      },
    ],
    sponsors: [
      {
        name: "TechCorp",
        tier: "Gold",
        logo: "/placeholder.svg?height=100&width=200",
      },
      {
        name: "InnovateHub",
        tier: "Silver",
        logo: "/placeholder.svg?height=100&width=200",
      },
    ],
    status: "upcoming",
  },
  {
    id: 2,
    title: "Campus Coders",
    tag: "IEEE SB MUJ",
    date: "2023-11-20",
    poster: "/placeholder.svg?height=400&width=600",
    description:
      "A successful coding competition that brought together talented programmers from across the campus. Participants showcased their skills in algorithmic problem-solving and creative coding challenges.",
    mode: "On-campus",
    venue: "Main Auditorium, MUJ Campus",
    attendance: "200+ participants",
    highlights: [
      "Advanced problem-solving workshops",
      "Live coding challenges",
      "Industry expert sessions",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    winners: [
      {
        name: "Team Algorithmics",
        position: "1st Place",
        project: "Smart Traffic Management System",
        prize: "$1000",
      },
      {
        name: "Code Warriors",
        position: "2nd Place",
        project: "AI-powered Study Assistant",
        prize: "$750",
      },
      {
        name: "Binary Bandits",
        position: "3rd Place",
        project: "Blockchain Voting Platform",
        prize: "$500",
      },
    ],
    status: "past",
  },
  // Add more events here...
];

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

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to={`/events/${
                    event.status === "upcoming" ? "pre" : "post"
                  }/${event.id}`}
                  state={{ event }}
                >
                  {event.status === "upcoming" ? (
                    <PreEventCard event={event} />
                  ) : (
                    <PostEventCard event={event} />
                  )}
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 dark:text-gray-400 text-center text-lg col-span-full"
            >
              No events found matching the criteria.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}

Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    })
  ).isRequired,
};
