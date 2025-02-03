import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Achievements from "./components/Achievements";
import BlogPosts from "./components/BlogPosts";
import Footer from "./components/Footer";
import Societies from "./components/Societies";
import Contact from "./components/Contact";
import PreEventPage from "./pages/PreEventPage";
import PostEventPage from "./pages/PostEventPage";

const events = [
  {
    id: 1,
    title: "Hack To The Future",
    tag: "IEEE SB MUJ",
    date: "2023-11-15",
    poster: "/placeholder.svg?height=400&width=600",
    overview:
      "Join us for an exciting 24-hour hackathon where you'll build innovative solutions for real-world problems!",
    mode: "Online",
    startDate: "2023-11-15T09:00:00",
    endDate: "2023-11-16T09:00:00",
    prizePool: "$5000",
    teamSize: "3-4 members",
    registrationLink: "https://example.com/register",
    organizingCommittee: [
      { name: "John Doe", role: "Event Lead" },
      { name: "Jane Smith", role: "Technical Lead" },
      { name: "Alex Johnson", role: "Marketing Lead" },
    ],
    schedule: [
      {
        time: "09:00 AM",
        event: "Opening Ceremony",
        description: "Welcome address and event kickoff",
      },
      {
        time: "10:00 AM",
        event: "Team Formation",
        description: "Form teams and brainstorm ideas",
      },
      {
        time: "12:00 PM",
        event: "Mentorship Session",
        description: "One-on-one mentorship with industry experts",
      },
    ],
    sponsors: [
      {
        name: "TechCorp",
        tier: "Gold",
        logo: "/placeholder.svg?height=100&width=200",
      },
      {
        name: "InnovateHub",
        tier: "Silver",
        logo: "/placeholder.svg?height=100&width=200",
      },
    ],
    status: "upcoming",
  },
  {
    id: 2,
    title: "Campus Coders",
    tag: "IEEE SB MUJ",
    date: "2023-11-20",
    poster: "/placeholder.svg?height=400&width=600",
    description:
      "A successful coding competition that brought together talented programmers from across the campus. Participants showcased their skills in algorithmic problem-solving and creative coding challenges.",
    mode: "On-campus",
    venue: "Main Auditorium, MUJ Campus",
    attendance: "200+ participants",
    highlights: [
      "Advanced problem-solving workshops",
      "Live coding challenges",
      "Industry expert sessions",
    ],
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    winners: [
      {
        name: "Team Algorithmics",
        position: "1st Place",
        project: "Smart Traffic Management System",
        prize: "$1000",
      },
      {
        name: "Code Warriors",
        position: "2nd Place",
        project: "AI-powered Study Assistant",
        prize: "$750",
      },
      {
        name: "Binary Bandits",
        position: "3rd Place",
        project: "Blockchain Voting Platform",
        prize: "$500",
      },
    ],
    status: "past",
  },
];
import Team from "./components/Team"

const Home = () => (
  <>
    <Hero />
    <About />
    <Events events={events} />
    <Testimonials />
    <BlogPosts />
    <Achievements />
  </>
);

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-white dark:bg-ieee-dark transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/events"
            element={
              <div className="pt-20">
                <Events events={events} />
              </div>
            }
          />
          <Route
            path="/events/pre/:id"
            element={
              <div className="pt-20">
                <PreEventPage events={events} />
              </div>
            }
          />
          <Route
            path="/events/post/:id"
            element={
              <div className="pt-20">
                <PostEventPage events={events} />
              </div>
            }
          />
          <Route
            path="/blog"
            element={<div className="pt-20">Blog Page</div>}
          />
          <Route
            path="/societies"
            element={
              <div className="pt-20">
                <Societies />
              </div>
            }
          />
          <Route
            path="/achievements"
            element={
              <div className="pt-20">
                <Achievements />
              </div>
            }
          />
          <Route
            path="/team"
            element={<div className="pt-20">Team Page</div>}
          />
          <Route
            path="/contact"
            element={
              <div className="pt-20">
                <Contact />
              </div>
            }
          />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
