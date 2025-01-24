import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 py-8 px-4 lg:px-20 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-semibold text-center mb-6 text-ieee-blue dark:text-ieee-light">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center text-ieee-blue dark:text-ieee-light">
            Our Team
          </h2>
          <div className="space-y-3">
            {[
              { name: "Lakshita Agrawal", role: "Chairperson", phone: "+91 9312941940" },
              { name: "Karan Kapoor", role: "Vice Chairperson", phone: "+91 7742372409" },
              { name: "Sai Praketh Voona", role: "Managing Director", phone: "+91 7249777857" },
              { name: "Krishnav Gupta", role: "General Secretary", phone: "+91 9811187903" },
              { name: "Shivam Shandilya", role: "Treasurer", phone: "+91 8918899791" },
              { name: "Ayana Takshak", role: "HR Director", phone: "+91 8949398854" },
              { name: "Kunal Kumar", role: "Community Director", phone: "+91 8210165797" },
            ].map(({ name, role, phone }) => (
              <div
                key={name}
                className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-500 text-white text-center flex items-center justify-center font-bold">
                  {name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{role}</p>
                  <div className="flex items-center space-x-1 text-xs">
                    <FaPhoneAlt />
                    <span>{phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-center text-ieee-blue dark:text-ieee-light">
            Get in Touch
          </h2>
          <form className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows="3"
                placeholder="Write your message"
                className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <motion.button
                type="submit"
                className="w-full py-2 text-sm font-medium rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
