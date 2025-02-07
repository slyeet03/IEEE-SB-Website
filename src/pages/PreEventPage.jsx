import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanity";
import { Calendar, MapPin, Users, DollarSign, Award, Phone, User, FileText, ArrowLeft } from "lucide-react";

const PreEventPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const query = `*[_type == "event" && _id == $id][0] {
          name,
          startDateTime,
          endDateTime,
          mode,
          eventOverview,
          formLink,
          teamSize,
          prizePool,
          entryFee,
          society,
          category,
          resources[]{"url": asset->url},
          contactInfo
        }`;
        const data = await client.fetch(query, { id });
        setEventData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, [id]);

  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Loading event details...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/events"
          className="inline-flex items-center text-ieee-blue dark:text-blue-400 hover:underline mb-8"
          aria-label="Back to Events"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{eventData.name}</h1>

          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-green-500" />
                <span>{eventData.mode}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-2 text-green-500" />
                <span>
                  {new Date(eventData.startDateTime).toLocaleString()} - {new Date(eventData.endDateTime).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Users className="w-5 h-5 mr-2 text-green-500" />
                <span>Team Size: {eventData.teamSize}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                <span>Entry Fee: {eventData.entryFee}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Award className="w-5 h-5 mr-2 text-green-500" />
                <span>Prize Pool: {eventData.prizePool}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <FileText className="w-5 h-5 mr-2 text-green-500" />
                <span>Category: {eventData.category}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <User className="w-5 h-5 mr-2 text-green-500" />
                <span>Organized by: {eventData.society}</span>
              </div>
            </div>

            <hr className="border-gray-300 dark:border-gray-700" />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event Overview</h2>
              {eventData.eventOverview.split("\n").map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 dark:text-gray-400 mb-4">{paragraph}</p>
              ))}
            </div>

            {eventData.resources?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resources</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {eventData.resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ieee-blue dark:text-blue-400 hover:underline"
                      >
                        Resource {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {eventData.contactInfo && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <User className="w-5 h-5 mr-2 text-green-500" />
                  <span>{eventData.contactInfo.contactPerson}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Phone className="w-5 h-5 mr-2 text-green-500" />
                  <span>{eventData.contactInfo.contactPhone}</span>
                </div>
              </div>
            )}

            {eventData.formLink && (
              <div className="text-center mt-6">
                <a
                  href={eventData.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-ieee-blue text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
                >
                  Register Now
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreEventPage;
