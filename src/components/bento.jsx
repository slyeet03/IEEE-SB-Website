import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BentoGrid({ items }) {
  let disp = [
    "col-span-1 row-span-3",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-3",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-2 row-span-1",
  ];
  let index = 0;
  let glowTransition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: 1,
    ease: "easeInOut",
  };

  let glowAnimation = {
    boxShadow: [
      "0px 0px 10px rgba(0, 128, 255, 0.2)",
      "0px 0px 20px rgba(0, 128, 255, 0.3)",
      "0px 0px 10px rgba(0, 128, 255, 0.2)",
    ],
  };

  const [popup, setPopup] = useState({ isOpen: false, title: "", content: "" });

  const handleItemClick = (title, content) => {
    setPopup({ isOpen: true, title, content });
  };
  const handleClosePopup = () => {
    setPopup({ isOpen: false, title: "", content: "" });
  };

  return (
    <>
      {popup.isOpen && (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-ieee-dark rounded-xl  z-50 m-10 p-40 overflow-scroll ">
          <motion.div
            className="bg-white dark:bg-ieee-dark dark:text-white p-4 min-h-[30vh] min-w-[70vw] rounded-lg shadow-lg relative flex-col justify-start items-center"
            animate={glowAnimation}
            transition={glowTransition}
          >
            <div className="title w-full h-full">
              <button
                className="absolute top-2 right-2 text-gray-600 text-3xl"
                onClick={handleClosePopup}
              >
                &times;
              </button>
            </div>
            <div className="text-3xl w-full text-center top-4">
              <h1 className="text-3xl font-bold text-ieee-blue">
                {popup.title}
              </h1>
            </div>
            <br />
            <div className="text-lg">{popup.content}</div>
          </motion.div>
        </motion.div>
      )}
      <div
        className={`flex-col md:grid md:grid-cols-4 md:grid-rows-5 gap-4 p-4 *:rounded-xl *:min-h-24 w-screen`}
      >
        {items.map((item, index) =>
          index != 7 ? (
            <motion.div
              key={index}
              className={`bento-item  h-auto flex items-center justify-center text-white text-lg font-bold ${disp[index]}`}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
              }}
              animate={glowAnimation}
              transition={glowTransition}
              onHoverStart={() => {}}
              onHoverEnd={() => {}}
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.01 }}
              onClick={() => handleItemClick(item.label, item.content)}
            >
              <div
                className={`relative w-full rounded-xl h-full bottom-0 left-0 right-0 flex justify-center items-center ${
                  index != 7 ? "bg-[#000]" : ""
                } bg-opacity-60 ${
                  index != 7
                    ? "dark:text-white text-white"
                    : "dark:text-white text-ieee-blue"
                } text-xl p-2 rounded-b-md`}
              >
                {item.label}
              </div>
            </motion.div>
          ) : (
            <div
              key={index}
              className={`bento-item  h-auto flex items-center justify-center text-white text-lg font-bold ${disp[index]}`}
            >
              <motion.div
                className={` relative rounded-xl w-full h-full bottom-0 left-0 right-0 flex justify-center items-center ${
                  index != 7 ? "bg-[#000]" : ""
                } bg-opacity-60 text-ieee-blue text-3xl p-2 rounded-b-md`}
              >
                {item.label}
              </motion.div>
            </div>
          )
        )}
      </div>
    </>
  );
}

BentoGrid.prototypes = {
  items: PropTypes.array.isRequired,
};
