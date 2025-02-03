import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Award, Clock } from "lucide-react";
import PropTypes from "prop-types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PreEventCard = ({ event }) => {
  return (
    <Card className="overflow-hidden">
      <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
        <div className="relative h-48">
          <img
            src={event.poster || "/placeholder.svg?height=200&width=400"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-ieee-blue text-white">
            {event.tag}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {event.overview}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-2 text-ieee-blue" />
              <span>{event.mode}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-2 text-ieee-blue" />
              <span>{new Date(event.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2 text-ieee-blue" />
              <span>
                {new Date(event.startDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Award className="w-4 h-4 mr-2 text-ieee-blue" />
              <span>{event.prizePool}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4 mr-2 text-ieee-blue" />
              <span>{event.teamSize}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-gray-50 dark:bg-gray-800">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-ieee-blue text-white py-2 px-4 rounded-md text-center text-sm font-semibold cursor-pointer"
          >
            View Details
          </motion.div>
        </CardFooter>
      </motion.div>
    </Card>
  );
};

PreEventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    prizePool: PropTypes.string.isRequired,
    teamSize: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string,
  }).isRequired,
};

export default PreEventCard;
