import React from "react";
import { motion } from "framer-motion";

const MemoriesGalleryMobile = () => {
  const images = [
    {
      src: "https://cdn.sanity.io/images/gcb0j4e6/production/2008031103c9d34c555aa6a97e48316264d295f4-4032x3024.jpg?w=300&h=200",
      caption: "Late-night brainstorming.",
    },
    {
      src: "https://cdn.sanity.io/images/gcb0j4e6/production/d124c306560fae1f571a4a9ab9fa819ee574bd5b-5184x3888.jpg?w=250&h=180",
      caption: "Dance Night",
    },
    {
      src: "https://cdn.sanity.io/images/gcb0j4e6/production/0482052eaa923378378a047234467198971bf109-1080x658.jpg?w=280&h=190",
      caption: "Hackathon chaos 😆",
    },
    {
      src: "https://cdn.sanity.io/images/gcb0j4e6/production/130cb579a92c47fa96072b08f48a329610be444e-6000x4000.jpg?w=320&h=210",
      caption: "Pure energy, unforgettable vibes",
    },
    {
      src: "https://cdn.sanity.io/images/gcb0j4e6/production/24dbf2c3cdf1964c93f0b88d6a3af3940d740266-4032x3024.jpg?w=260&h=200",
      caption: "Building something wild.",
    },
    {
      src: "https://cdn.sanity.io/images/gcb0j4e6/production/eb38838bead81a27e44b1ef84c23ab8dc824d65d-6000x4000.jpg?w=270&h=180",
      caption: "That one night we didn't sleep.",
    },
    {
      src: "https://cdn.sanity.io/images/gcb0j4e6/production/ba678005d9e8dc41d083894919389a86fce9cc97-4032x3024.jpg?w=410&h=290",
      caption: "IEEE Family forever.",
    },
  ];

  return (
    <section className="relative py-12 px-4 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] dark:bg-gray-900 flex flex-col items-center overflow-hidden">

      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-4">
        Reliving the <span className="text-ieee-blue">Memories</span> ✨
      </h2>

      <p className="italic text-base text-gray-700 dark:text-gray-300 text-center mb-8">
        "Some moments never fade, they just grow fonder with time..."
      </p>


      <motion.div
        className="sticky-note bg-yellow-200 px-4 py-3 rounded-md shadow-md text-gray-900 text-sm font-bold mb-6"
        whileHover={{ scale: 1.05 }}
      >
        📌 "Best memories are made here!"
      </motion.div>


      <div className="grid grid-cols-1 gap-6 w-full max-w-lg">
        {images.map((item, index) => (
          <MemoryCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

const MemoryCard = ({ src, caption }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 border-4 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl overflow-hidden"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img
      src={src}
      alt={caption}
      className="w-full h-44 object-cover"
    />
    <p className="text-center py-2 text-sm text-gray-800 dark:text-white bg-white/80 dark:bg-black/70">
      {caption}
    </p>
  </motion.div>
);

export default MemoriesGalleryMobile;
