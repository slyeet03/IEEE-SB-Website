import { motion } from "framer-motion";
import PropTypes from "prop-types";

const achievementsData = [
  {
    id: 1,
    title: "Achievement 1",
    description: "test achievement 1",
    image: "/public/achievement1.webp",
  },
  {
    id: 2,
    title: "Achievement 2",
    description: "test achievement 2",
    image: "/public/achievement2.webp",
  },
  {
    id: 3,
    title: "Achievement 3",
    description: "test achievement 3",
    image: "/public/achievement3.webp",
  },
  {
    id: 4,
    title: "Achievement 4",
    description: "test achievement 4",
    image: "/public/achievement4.webp",
  },
  {
    id: 5,
    title: "Achievement 5",
    description: "test achievement 5",
    image: "/public/achievement5.webp",
  },
  {
    id: 6,
    title: "Achievement 6",
    description: "test achievement 6",
    image: "test achievement 6",
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
        alt={achievement.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
      <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
        {achievement.description}
      </p>
    </div>
    <h3 className="text-center text-xl font-semibold text-gray-900 dark:text-white mt-2">
      {achievement.title}
    </h3>
  </motion.div>
);

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

function Achievements() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-display">
            Our Achievements
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our milestones and success stories
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievementsData.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
