import React from "react";
import HorizontalScroll from "../components/HorizontalScroll";
import SwipeCards from "../components/SwipeCards";

export default function Events() {
  return (
    <section className="w-full bg-white dark:bg-ieee-dark">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <SwipeCards />
        <HorizontalScroll />
      </div>
    </section>
  );
}