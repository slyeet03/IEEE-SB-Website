import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PreEventCard from "./PreEventCard";
import PostEventCard from "./PostEventCard";

const events = [
  {
    id: 1,
    title: "Hack To The Future",
    tag: "IEEE SB MUJ",
    date: "2023-11-15",
    poster: "/placeholder.svg?height=400&width=600",
    overview: "Join us for an exciting 24-hour hackathon!",
    mode: "Online",
    startDate: "2023-11-15T09:00:00",
    endDate: "2023-11-16T09:00:00",
    prizePool: "$5000",
    teamSize: "3-4 members",
    registrationLink: "https://example.com/register",
    organizingCommittee: ["John Doe", "Jane Smith", "Alex Johnson"],
    status: "upcoming",
  },
  {
    id: 2,
    title: "Campus Coders",
    tag: "IEEE SB MUJ",
    date: "2023-11-20",
    poster: "/placeholder.svg?height=400&width=600",
    description:
      "A successful coding competition that brought together talented programmers from across the campus.",
    mode: "On-campus",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
    status: "past",
  },
];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedTag, setSelectedTag] = useState("IEEE SB MUJ");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      event.date.startsWith(selectedYear) &&
      event.tag === selectedTag
  );

  const years = ["2023", "2024", "2025"];
  const tags = ["IEEE SB MUJ", "IEEE Region", "Global IEEE"];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          IEEE SB MUJ Events
        </h1>

        {/* Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Search Events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative w-full md:w-1/4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative w-full md:w-1/4">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="appearance-none w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-12">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {event.status === "upcoming" ? (
                  <PreEventCard event={event} />
                ) : (
                  <PostEventCard event={event} />
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center text-lg">
              No events found matching the criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
