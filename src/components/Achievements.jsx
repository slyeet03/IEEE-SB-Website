import { motion } from "framer-motion";
import PropTypes from "prop-types";
import BentoGrid from "./bento";

const achievementsData = [
  {
    id: 1,
    label: "Achievement 1",
    description: "test achievement 1",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 2,
    label: "Achievement 2",
    description: "test achievement 2",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 3,
    label: "Achievement 3",
    description: "test achievement 3",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 4,
    label: "Achievement 4",
    description: "test achievement 4",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 5,
    label: "Achievement 5",
    description: "test achievement 5",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 6,
    label: "Achievement 6",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 7,
    label: "Achievement 7",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 8,
    label: "A COMMUNITY OF INNOVATION",
    description: "",
    image: "",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 9,
    label: "Achievement 9",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 10,
    label: "Achievement 10",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 11,
    label: "Achievement 11",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

const AchievementCard = ({ achievement }) => (
  <motion.div
    className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden p-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="aspect-square overflow-hidden">
      <img
        src={achievement.image}
        alt={achievement.label}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
      <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
        {achievement.description}
      </p>
    </div>
    <h3 className="text-center text-xl font-semibold text-gray-900 dark:text-white mt-2">
      {achievement.label}
    </h3>
  </motion.div>
);

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

function Achievements() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <BentoGrid items={achievementsData} />
    </section>
  );
}

export default Achievements;
