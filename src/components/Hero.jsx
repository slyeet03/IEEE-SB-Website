import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { useState, useEffect, useRef, useMemo } from "react";
import ElectricBackground from "./background";

export default function Hero() {
  const words = useMemo(() => ["Innovation", "Technology", "Collaboration"], []);
  const indexRef = useRef(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [ref] = useInView({ threshold: 0.1, triggerOnce: true });

  // Handle word transitions with animation
  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % words.length;
      setCurrentWord(words[indexRef.current]);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  // Floating memory images
  const memoryImages = [
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/235d12a437a470bb1e8262c8fb1d0e0aecd18b0f-6000x4000.jpg", top: "10%", left: "15%" },
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/4bcf01ecd1cc7e830b18df82f4e7068a777cd86b-1600x1200.jpg", top: "10%", right: "0%" },
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/edd7bd9b7efa440bf0a6747300de4289d77ef32f-1600x1200.jpg", top: "40%", left: "5%" },
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/2c1b2f168ddd0ae226b1db29581377359f256374-6000x3376.jpg", top: "70%", left: "20%" },
    { src: "https://cdn.sanity.io/images/gcb0j4e6/production/69f31f2fdb3b852cf4d25da52147c2ce18601f02-6000x3368.jpg", top: "85%", right: "15%" },
  ];

  // Button Glow Animation
  const glowTransition = { repeat: Infinity, repeatType: "reverse", duration: 1.5, ease: "easeInOut" };
  const glowAnimation = { boxShadow: ["0px 0px 15px rgba(0, 128, 255, 0.5)", "0px 0px 25px rgba(0, 128, 255, 0.8)", "0px 0px 15px rgba(0, 128, 255, 0.5)"] };

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
            className="absolute w-40 h-32 object-cover rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            style={{ top, left, right }}
          />
        ))}

        <div ref={ref} className="relative z-10 flex flex-col text-center gap-12 w-screen items-center">
          <div className="space-y-8">
            <h2 className="text-ieee-blue dark:text-blue-400 text-md sm:text-xl font-semibold font-display">
              IEEE Student Branch MUJ
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white font-display relative">
              Empowering
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  className="text-ieee-blue inline-block"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.6 }}
                >
                  {currentWord}
                </motion.span>
              </AnimatePresence>
              <br />
              Together
            </h1>

            <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-300">
              Join the world&apos;s largest technical professional organization and be part of the future of technology.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                className="bg-ieee-blue text-white px-5 py-3 sm:px-8 sm:py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                animate={glowAnimation}
                transition={glowTransition}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="/events"
              >
                Explore Events
              </motion.a>
             
              <motion.a
                className="border-2 border-ieee-blue text-ieee-blue dark:border-white dark:text-white px-8 py-3 rounded-md hover:bg-ieee-blue hover:text-white dark:hover:bg-white dark:hover:text-ieee-dark transition-colors duration-200"
                animate={glowAnimation}
                transition={glowTransition}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.ieee.org/"
              >
                Join IEEE
              </motion.a>
            </div>

            {/* People Section */}
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex -space-x-2">
                {["krishna.avif", "garima.avif", "yashgarg.avif", "aayush.avif"].map((image, i) => (
                  <div key={i} className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-900">
                    <img src={`/${image}`} alt={`Person ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-md">Join 1000+ members in our community</p>
            </div>
          </div>
        </div>
      </div>
    </ElectricBackground>
  );
}
