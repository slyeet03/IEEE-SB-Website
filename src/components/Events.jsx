import { useState } from "react";
import { ChevronDown } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Hack To The Future",
    tag: "IEEE SB MUJ",
    date: "2023-11-15",
  },
  {
    id: 2,
    title: "Campus Coders",
    tag: "IEEE SB MUJ",
    date: "2023-11-20",
  },
  {
    id: 3,
    title: "21 Days Of Code 2.0",
    tag: "IEEE SB MUJ",
    date: "2023-12-01",
  },
  {
    id: 4,
    title: "AI Workshop",
    tag: "IEEE SB MUJ",
    date: "2023-12-10",
  },
];

export default function EventsFilterBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedTag, setSelectedTag] = useState("SB MUJ");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      event.date.startsWith(selectedYear) &&
      event.tag === selectedTag
  );

  const years = ["2023", "2024", "2025"];
  const tags = ["SB MUJ", "IEEE Region", "Global IEEE"];

  return (
    <div className="w-full py-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Year Dropdown */}
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

          {/* Tag Dropdown */}
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

        {/* Filtered Events List */}
        <div className="mt-6">
          {filteredEvents.length > 0 ? (
            <ul className="space-y-4">
              {filteredEvents.map((event) => (
                <li
                  key={event.id}
                  className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {new Date(event.date).toLocaleDateString()} - {event.tag}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center">
              No events found matching the criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
