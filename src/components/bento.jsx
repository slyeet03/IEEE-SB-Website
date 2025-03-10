import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function BentoGrid({ items }) {
  const disp = [
    "md:col-span-1 md:row-span-3",
    "md:col-span-1 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-3",
    "md:col-span-1 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-2 md:row-span-1",
  ];

  const [popup, setPopup] = useState({
    isOpen: false,
    title: "",
    content: "",
    image: "",
  });

  const handleItemClick = (title, content, image) => {
    setPopup({ isOpen: true, title, content, image });
  };

  const handleClosePopup = () => {
    setPopup({ isOpen: false, title: "", content: "", image: "" });
  };

  return (
    <>
      {/* Popup Display */}
      {/* Popup Display */}
<AnimatePresence>
  {popup.isOpen && (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClosePopup}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full md:w-[90%] overflow-hidden border-4 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section - Full Height */}
        {popup.image && (
          <div className="relative w-full h-[60vh] md:h-[70vh]">
            <img
              src={popup.image || "/placeholder.svg"}
              alt={popup.title}
              className="w-full h-full object-cover"
            />

            {/* Text Overlay on Image */}
            <div className="absolute bottom-0 w-full bg-black/70 text-white p-4 md:p-6">
              <motion.h2
                className="text-lg md:text-2xl font-bold text-white mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {popup.title}
              </motion.h2>

              <motion.div
                className="text-sm md:text-base"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p>{popup.content}</p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={handleClosePopup}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* Grid for Desktop (Same as before) / Improved Mobile Design */}
<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-5 md:max-w-[1200px] mx-auto">
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      className={`bento-item min-h-[120px] md:min-h-[150px] flex items-center justify-center text-white text-lg font-bold rounded-xl overflow-hidden ${
        disp[index]
      }`}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "top", 
      }}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={() =>
        handleItemClick(item.label, item.content, item.image)
      }
    >
      <div
        className={`relative w-full h-full flex justify-center items-center bg-black/60 backdrop-blur-sm transition-all duration-300 hover:bg-black/40 dark:text-white text-white text-sm md:text-xl p-2 md:p-4 rounded-xl`}
      >
        {item.label}
      </div>
    </motion.div>
  ))}
</div>
    </>
  );
}

BentoGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
};
