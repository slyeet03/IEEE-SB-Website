import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ElectricBackground = ({ children }) => {
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    const createPulse = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
    });

    // Generate initial pulses
    setPulses(Array.from({ length: 7 }, createPulse));

    const interval = setInterval(() => {
      setPulses((prev) => {
        const newPulse = createPulse();
        return [...prev.slice(1), newPulse]; // Keep limited pulses for smooth transitions
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, rgba(0, 98, 155, 0.2), rgba(255, 255, 255, 0))`,
        }}
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Connecting Lines */}
      <svg className="absolute w-full h-full">
        {pulses.map((pulseA, i) =>
          pulses
            .slice(i + 1)
            .map((pulseB) => (
              <motion.line
                key={`${pulseA.id}-${pulseB.id}`}
                x1={`${pulseA.x}%`}
                y1={`${pulseA.y}%`}
                x2={`${pulseB.x}%`}
                y2={`${pulseB.y}%`}
                stroke="rgba(0, 102, 153, 0.5)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: pulseA.duration }}
              />
            ))
        )}
      </svg>

      {/* Electric Pulses */}
      {pulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          className="absolute bg-blue-500"
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            top: `${pulse.y}%`,
            left: `${pulse.x}%`,
            boxShadow: "0 0 12px rgba(0, 102, 153, 0.8)",
          }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: pulse.duration, ease: "easeOut" }}
        />
      ))}

      {/* Children Content */}
      <div className="relative z-10 text-[rgb(0_102_153_/var(--tw-text-opacity,1))] font-bold text-gray-900 dark:text-white font-display text-center">
        {children}
      </div>
    </div>
  );
};

export default ElectricBackground;
