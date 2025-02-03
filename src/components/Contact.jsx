import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 py-8 px-4 lg:px-20 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold text-center mb-16 text-ieee-blue dark:text-ieee-light">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Team Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-center text-ieee-blue dark:text-ieee-light">
            Our Team
          </h2>
          <div className="space-y-6">
            {[
              { name: "Lakshita Agrawal", role: "Chairperson", phone: "+91 9312941940" },
              { name: "Karan Kapoor", role: "Vice Chairperson", phone: "+91 7742372409" },
              { name: "Sai Praketh Voona", role: "Managing Director", phone: "+91 7249777857" },
              { name: "Krishnav Gupta", role: "General Secretary", phone: "+91 9811187903" },
              { name: "Shivam Shandilya", role: "Treasurer", phone: "+91 8918899791" },
              { name: "Ayana Takshak", role: "HR Director", phone: "+91 8949398854" },
              { name: "Kunal Kumar", role: "Community Director", phone: "+91 8210165797" },
            ].map(({ name, role, phone }) => (
              <motion.div
                key={name}
                className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-md transform transition-transform hover:scale-105"
              >
                {/* Avatar */}
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                  {name.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-base font-medium">{name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300 hover:underline"
                    aria-label={`Call ${name}`}
                  >
                    <FaPhoneAlt />
                    <span>{phone}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-center text-ieee-blue dark:text-ieee-light">
            Get in Touch
          </h2>
          <form className="space-y-6" autoComplete="on">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message"
                className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-3 text-sm font-medium rounded-lg bg-blue-500 text-white shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 space-y-8">
        <h2 className="text-3xl font-semibold text-center text-ieee-blue dark:text-ieee-light">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              question: "How can I join IEEE?",
              answer:
                "You can contact any of the team members listed above or visit the official IEEE membership website to register.",
            },
            {
              question: "What kind of events does IEEE organize?",
              answer:
                "We host workshops, technical talks, coding competitions, hackathons, and community outreach programs.",
            },
            {
              question: "Where can I find updates on upcoming events?",
              answer:
                "Follow our social media handles or keep an eye on your student portal for regular updates.",
            },
            {
              question: "Do I need any technical experience to participate?",
              answer:
                "No, IEEE events are open to students from all fields and levels of experience. We encourage everyone to join!",
            },
            {
              question: "Can I participate in multiple events at once?",
              answer:
                "Yes, you can participate in multiple events as long as there are no scheduling conflicts.",
            },
            {
              question: "How can I volunteer for IEEE events?",
              answer:
                "Reach out to the HR Director, or keep an eye on volunteer opportunities posted on our website and social media.",
            },
          ].map(({ question, answer }, idx) => (
            <motion.div
              key={idx}
              className="p-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-md transform transition-transform hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div>
                <h3 className="font-medium text-lg">{question}</h3>
              </div>

              <motion.div
                className="mt-2 text-sm text-gray-600 dark:text-gray-400 opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p>{answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final Section without BG */}
      <div className="mt-16 flex justify-between items-center py-8 px-4 lg:px-20">
        <div className="text-gray-900 dark:text-gray-100 max-w-md space-y-4">
          <h3 className="text-2xl font-semibold text-ieee-blue dark:text-ieee-light">
            Discover what IEEE has to offer. Become a member.
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Be a part of a community that prepares you for college and beyond.
          </p>
        </div>
        <motion.button
          className="py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md transform transition-transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          Join Now
        </motion.button>
      </div>
    </div>
  );
};

export default Contact;