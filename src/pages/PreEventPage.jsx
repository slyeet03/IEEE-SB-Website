import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Award,
  Clock,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PreEventPage = ({ events }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number.parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Event not found
          </h2>
          <Link
            to="/events"
            className="text-ieee-blue dark:text-blue-400 hover:underline flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/events"
          className="inline-flex items-center text-ieee-blue dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        <Card className="overflow-hidden">
          <div className="relative h-96">
            <img
              src={event.poster || "/placeholder.svg?height=400&width=800"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4 text-lg bg-ieee-blue text-white px-4 py-2">
              {event.tag}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white">
              {event.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-ieee-blue" />
                <span>{event.mode}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Calendar className="w-5 h-5 mr-2 text-ieee-blue" />
                <span>{new Date(event.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Clock className="w-5 h-5 mr-2 text-ieee-blue" />
                <span>
                  {new Date(event.startDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Award className="w-5 h-5 mr-2 text-ieee-blue" />
                <span>{event.prizePool}</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Users className="w-5 h-5 mr-2 text-ieee-blue" />
                <span>{event.teamSize}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Event Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {event.overview}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Event Schedule
              </h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-start p-4">
                      <div className="flex-shrink-0 w-24 font-semibold text-ieee-blue dark:text-blue-400">
                        {item.time}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.event}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Organizing Committee
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {event.organizingCommittee.map((member, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center space-x-4 p-4">
                      <img
                        src="/placeholder.svg?height=100&width=100"
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Sponsors
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {event.sponsors.map((sponsor, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 text-center">
                      <img
                        src={
                          sponsor.logo ||
                          "/placeholder.svg?height=100&width=200"
                        }
                        alt={sponsor.name}
                        className="h-16 mx-auto object-contain mb-2"
                      />
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {sponsor.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {sponsor.tier} Sponsor
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="w-full bg-ieee-blue text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg flex items-center justify-center"
              >
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

PreEventPage.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      poster: PropTypes.string,
      overview: PropTypes.string.isRequired,
      mode: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      prizePool: PropTypes.string.isRequired,
      teamSize: PropTypes.string.isRequired,
      registrationLink: PropTypes.string.isRequired,
      organizingCommittee: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          role: PropTypes.string.isRequired,
        })
      ).isRequired,
      schedule: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string.isRequired,
          event: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
      sponsors: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          tier: PropTypes.string.isRequired,
          logo: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default PreEventPage;
