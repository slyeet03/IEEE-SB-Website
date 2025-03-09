
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GeometricPattern = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circles */}
        {[...Array(7)].map((_, i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: 1 - scrollPosition / 500,
              scale: 1 - scrollPosition / 2000,
              x: (i + 1) * 70,
              y: 100 + (scrollPosition / 10) * (i % 2 === 0 ? 1 : -1),
              transition: { duration: 0.8 },
            }}
            cx={(i + 1) * 70}
            cy="100"
            r="40"
            fill={'#00238b'}
          />
        ))}

        {/* Rectangles */}
        {[...Array(7)].map((_, i) => (
          <motion.rect
            key={i}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: 1 - scrollPosition / 300,
              scale: 1 + scrollPosition / 3000,
              x: 100 + i * 70,
              y: 250 + (scrollPosition / 10) * (i % 2 === 0 ? 1 : -1),
              transition: { duration: 1 },
            }}
            x={100 + i * 70}
            y="250"
            width="60"
            height="60"
            fill={`rgba(255, 0, ${i * 50}, 0.6)`}
          />
        ))}

        {/* Circles in Bottom Row */}
        {[...Array(7)].map((_, i) => (
          <motion.circle
            key={i + 7}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: 1 - scrollPosition / 500,
              scale: 1 - scrollPosition / 2000,
              x: (i + 1) * 70,
              y: 400 + (scrollPosition / 10) * (i % 2 === 0 ? 1 : -1),
              transition: { duration: 0.8 },
            }}
            cx={(i + 1) * 70}
            cy="400"
            r="40"
            fill={`rgba(${(i + 1) * 50}, 255, 255, 0.7)`}
          />
        ))}

        {/* Rectangles in Bottom Row */}
        {[...Array(7)].map((_, i) => (
          <motion.rect
            key={i + 7}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: 1 - scrollPosition / 300,
              scale: 1 + scrollPosition / 2500,
              x: 100 + i * 70,
              y: 500 + (scrollPosition / 10) * (i % 2 === 0 ? -1 : 1),
              transition: { duration: 1 },
            }}
            x={100 + i * 70}
            y="500"
            width="60"
            height="60"
            fill={`rgba(0, 255, ${i * 30}, 0.6)`}
          />
        ))}

        {/* Circles in Bottom-most Row */}
        {[...Array(4)].map((_, i) => (
          <motion.circle
            key={i + 14}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: 1 - scrollPosition / 500,
              scale: 1 - scrollPosition / 2000,
              x: (i + 1) * 100,
              y: 600 + (scrollPosition / 10) * (i % 2 === 0 ? 1 : -1),
              transition: { duration: 0.8 },
            }}
            cx={(i + 1) * 100}
            cy="600"
            r="40"
            fill={'#1565C0'}
          />
        ))}

        <motion.line
          x1="1000" 
          x2="1000"
          y1="460" 
          y2="460" 
          stroke="#0D47A1" 
          strokeWidth="2"
          animate={{
            x1: -(scrollPosition / 2) - 100, 
            x2: 200 - (scrollPosition / 2) - 100,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default GeometricPattern;




