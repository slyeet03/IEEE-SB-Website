
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";

const StatCard = ({ number, label }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <h3 className="text-4xl font-bold text-ieee-blue dark:text-blue-400 mb-2 font-display">
        {number}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{label}</p>
    </motion.div>
  );
};

StatCard.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-16"
        >
          
          <div className="text-center space-y-8">
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-display"
            >
              Institute of Electrical and Electronics Engineers
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-ieee-blue dark:text-blue-400 font-semibold"
            >
              Advancing technology for the benefit of humanity.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400"
            >
              IEEE is the world&apos;s largest technical professional organization
              dedicated to advancing technology for the benefit of humanity.
            </motion.p>
          </div>

          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number="500+" label="Members" />
            <StatCard number="50+" label="Events" />
            <StatCard number="4" label="Societies" />
            <StatCard number="10+" label="Mentors" />
          </div>

          
          <div className="space-y-12">
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
                About IEEE SB MUJ
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                IEEE Student Branch, Manipal University Jaipur is a group of
                driven individuals striving to create and spread awareness about
                various technologies that surround us. In our pursuit of quality
                and practical knowledge, we are guided by a group of dedicated
                faculty members who are relentless in their efforts to hone our
                potential and mould us into the best engineers we could possibly
                become.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  IEEE SB MUJ envisions itself as the world&apos;s premier provider
                  of technical knowledge, community services, educational
                  seminars, and individualised services to the world&apos;s top
                  professionals.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  IEEE SB MUJ is the biggest technical professional organisation
                  of Manipal University, Jaipur. Our mission here is to work on
                  projects and development into advancing technology in order to
                  transform lives through the power of technology and education.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
