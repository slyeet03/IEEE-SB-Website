import React, { useState } from "react";
import HorizontalScroll from "../components/HorizontalScroll";
import SwipeCards from "../components/SwipeCards";
import EventGrid from "../components/EventGrid";
import { BsGridFill } from "react-icons/bs"; // For Grid View
import { FaArrowsAltH } from "react-icons/fa"; // For Horizontal Scroll

export default function Events() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'horizontal'

  const ToggleButton = ({ mode, currentMode, onClick, icon: Icon }) => (
    <button
      type="button"
      className={`
        relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out
        flex items-center justify-center gap-2
        ${mode === "grid" ? "rounded-l-lg" : "rounded-r-lg"}
        ${
          currentMode === mode
            ? "bg-ieee-blue text-white dark:bg-ieee-light dark:text-gray-900 shadow-lg"
            : "bg-white text-ieee-blue dark:bg-ieee-dark dark:text-ieee-light hover:bg-gray-100 dark:hover:bg-gray-800"
        }
        focus:outline-none focus:ring-2 focus:ring-ieee-blue dark:focus:ring-ieee-light
      `}
      onClick={onClick}
      aria-label={mode === "grid" ? "Grid View" : "Horizontal Scroll View"}
    >
      <Icon className="text-lg" />
      {/* Optional: Add a subtle animated indicator for the active state */}
      {currentMode === mode && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-ieee-blue dark:bg-ieee-light rounded-full opacity-0 animate-fade-in-up" />
      )}
    </button>
  );

  return (
    <section className="w-full bg-white dark:bg-ieee-dark py-8">
      {/* Main content container with minimal padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8"> {/* Adjusted padding here */}
        <SwipeCards />

        {/* Awesome Toggle Button - still contained by the padding */}
        <div className="flex justify-end mt-8 mb-6">
          <div
            className="inline-flex rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden shadow-sm bg-white dark:bg-ieee-dark"
            role="group"
          >
            <ToggleButton
              mode="grid"
              currentMode={viewMode}
              onClick={() => setViewMode("grid")}
              icon={BsGridFill}
            />
            <ToggleButton
              mode="horizontal"
              currentMode={viewMode}
              onClick={() => setViewMode("horizontal")}
              icon={FaArrowsAltH}
            />
          </div>
        </div>

        {/* Conditionally render EventGrid or HorizontalScroll - also contained by the main padding */}
        {viewMode === "grid" ? <EventGrid /> : <HorizontalScroll />}
      </div>

      {/* Add custom CSS for the animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}