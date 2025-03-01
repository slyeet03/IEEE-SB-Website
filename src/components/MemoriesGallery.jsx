import React from "react";
import { motion } from "framer-motion";

const MemoriesGallery = () => {
  const images = [
  {
    src: "https://cdn.sanity.io/images/gcb0j4e6/production/2008031103c9d34c555aa6a97e48316264d295f4-4032x3024.jpg?w=300&h=200",
    caption: "Late-night brainstorming.",
    rotate: "-10deg",
    top: "6%",
    left: "12%",
  },
  {
    src: "https://cdn.sanity.io/images/gcb0j4e6/production/d124c306560fae1f571a4a9ab9fa819ee574bd5b-5184x3888.jpg?w=250&h=180",
    caption: "Dance Night",
    rotate: "7deg",
    top: "8%",
    left: "67%",
  },
  {
    src: "https://cdn.sanity.io/images/gcb0j4e6/production/0482052eaa923378378a047234467198971bf109-1080x658.jpg?w=280&h=190",
    caption: "Hackathon chaos 😆",
    rotate: "-8deg",
    top: "36%",
    left: "5%",
  },
  {
    src: "https://cdn.sanity.io/images/gcb0j4e6/production/130cb579a92c47fa96072b08f48a329610be444e-6000x4000.jpg?w=320&h=210",
    caption: "Pure energy, unforgettable vibes",
    rotate: "6deg",
    top: "35%",
    left: "72%",
  },
  {
    src: "https://cdn.sanity.io/images/gcb0j4e6/production/24dbf2c3cdf1964c93f0b88d6a3af3940d740266-4032x3024.jpg?w=260&h=200",
    caption: "Building something wild.",
    rotate: "-7deg",
    top: "58%",
    left: "15%",
  },
  {
    src: "https://cdn.sanity.io/images/gcb0j4e6/production/eb38838bead81a27e44b1ef84c23ab8dc824d65d-6000x4000.jpg?w=270&h=180",
    caption: "That one night we didn't sleep.",
    rotate: "5deg",
    top: "62%",
    left: "65%",
  },
  {
    src: "https://cdn.sanity.io/images/gcb0j4e6/production/ba678005d9e8dc41d083894919389a86fce9cc97-4032x3024.jpg?w=410&h=290",
    caption: "IEEE Family forever.",
    rotate: "0deg",
    top: "38%",
    left: "38%",
    isBig: true,
  },
];
  return (
    <section className="relative py-16 px-6 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] dark:bg-gray-900 flex justify-center overflow-hidden h-[750px]">
      
      {/* Fairy Lights */}
      <div className="absolute top-0 left-0 w-full h-20 dark:bg-gradient-to-b from-ieee-blue to-transparent opacity-80 blur-sm"></div>

      {/* Title */}
      <h2 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-5xl font-extrabold text-gray-900 dark:text-gray-100 drop-shadow-md">
        Reliving the <span className="text-ieee-blue">Memories</span> ✨
      </h2>

      {/* Nostalgic Subtext */}
      <p className="absolute top-20 left-1/2 transform -translate-x-1/2 italic text-lg text-gray-700 dark:text-gray-300">
        "Some moments never fade, they just grow fonder with time..."
      </p>

      {/* Sticky Notes */}
      <motion.div 
        className="absolute bg-yellow-200 px-4 py-3 rounded-md shadow-md rotate-3 text-gray-900 text-sm font-bold" 
        style={{ top: "82%", left: "40%" }}
        whileHover={{ scale: 1.05 }}
      >
        📌 "Best memories are made here!"
      </motion.div>

      {/* Memory Cards */}
      {images.map((item, index) => (
        <MemoryCard key={index} {...item} />
      ))}

      {/* Faint, Blurred Background Memories */}
      <motion.div
        className="absolute w-full h-full bg-[url('https://picsum.photos/800/600?random=10')] opacity-10 blur-lg"
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

    </section>
  );
};

const MemoryCard = ({ src, caption, top, left, rotate, isBig }) => {
  return (
    <motion.div
      style={{ top, left, rotate }}
      className={`absolute ${isBig ? "scale-110" : ""}`}
      animate={{ y: [0, -3, 0], rotate: [rotate, `${parseFloat(rotate) + 2}deg`, rotate] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Masking Tape Effect */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-yellow-300 opacity-80 rotate-2"></div>

      {/* Polaroid Style Card */}
      <div className="relative bg-white dark:bg-gray-800 border-4 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl p-2 transform transition duration-300 hover:scale-105">
        
        {/* Image */}
        <img
          src={src}
          alt={caption}
          className="w-full h-full object-cover rounded-md border border-gray-400 dark:border-gray-600"
        />

        {/* Caption with Handwritten Effect */}
        <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs md:text-sm font-handwriting text-gray-800 dark:text-white bg-white/80 dark:bg-black/70 px-3 py-1 rounded-md shadow-md">
          {caption}
        </p>
      </div>
    </motion.div>
  );
};

export default MemoriesGallery;