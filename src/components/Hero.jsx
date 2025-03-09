import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef, useMemo } from "react";
import ElectricBackground from "./background";

export default function Hero() {
  const words = useMemo(() => ["Innovation", "Technology", "Collaboration"], []);
  const indexRef = useRef(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [ref] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % words.length;
      setCurrentWord(words[indexRef.current]);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  const memoryImages = [
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/235d12a437a470bb1e8262c8fb1d0e0aecd18b0f-6000x4000.jpg", top: "10%", left: "5%" },
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/4bcf01ecd1cc7e830b18df82f4e7068a777cd86b-1600x1200.jpg", top: "15%", right: "0%" },
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/edd7bd9b7efa440bf0a6747300de4289d77ef32f-1600x1200.jpg", top: "45%", left: "5%" },
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/2c1b2f168ddd0ae226b1db29581377359f256374-6000x3376.jpg", top: "75%", left: "10%" },
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/69f31f2fdb3b852cf4d25da52147c2ce18601f02-6000x3368.jpg", top: "90%", right: "10%" },
  ];

  const isMobile = window.innerWidth < 640;

  const glowTransition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: isMobile ? 2 : 1.5,
    ease: "easeInOut",
  };

  const glowAnimation = {
    boxShadow: [
      "0px 0px 10px rgba(0, 128, 255, 0.4)",
      "0px 0px 15px rgba(0, 128, 255, 0.6)",
      "0px 0px 10px rgba(0, 128, 255, 0.4)",
    ],
  };

  return (
    <ElectricBackground>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-32 pb-20 relative">
        
        {/* Floating Memory Images */}
        {memoryImages.map(({ src, top, left, right }, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Memory ${i + 1}`}
            className="absolute w-20 h-16 sm:w-40 sm:h-32 object-cover rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: isMobile ? [0, -5, 0] : [0, -10, 0] }} 
            transition={{ duration: isMobile ? 3 : 2, delay: i * 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            style={{ top, left, right }}
          />
        ))}

        <div ref={ref} className="relative z-10 flex flex-col text-center gap-12 w-full items-center">
          <div className="space-y-8">
            <h2 className="text-ieee-blue dark:text-blue-400 text-sm sm:text-xl font-semibold font-display">
              IEEE Student Branch MUJ
            </h2>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white font-display relative">
              Empowering
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  className="text-ieee-blue inline-block"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: isMobile ? 0.4 : 0.6 }}
                >
                  {currentWord}
                </motion.span>
              </AnimatePresence>
              <br />
              Together
            </h1>

            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 px-2 sm:px-0">
              Join the world&apos;s largest technical professional organization and be part of the future of technology.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                className="bg-ieee-blue text-white px-4 py-2 sm:px-8 sm:py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                animate={glowAnimation}
                transition={glowTransition}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/events"
              >
                Explore Events
              </motion.a>
             
              <motion.a
                className="border-2 border-ieee-blue text-ieee-blue dark:border-white dark:text-white px-4 py-2 sm:px-8 sm:py-3 rounded-md hover:bg-ieee-blue hover:text-white dark:hover:bg-white dark:hover:text-ieee-dark transition-colors duration-200"
                animate={glowAnimation}
                transition={glowTransition}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.ieee.org/"
              >
                Join IEEE
              </motion.a>
            </div>

            {/* People Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex -space-x-2">
                {["krishna.avif", "garima.avif", "yashgarg.avif", "aayush.avif"].map((image, i) => (
                  <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-900">
                    <img src={`/${image}`} alt={`Person ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-md text-center sm:text-left">
                Join 1000+ members in our community
              </p>
            </div>
          </div>
        </div>
      </div>
    </ElectricBackground>
  );
}
