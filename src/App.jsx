import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Events from "./components/Events";
import Testimonials from "./components/Testimonials";
import Achievements from "./components/Achievements";
import BlogPosts from "./components/BlogPosts";
import Footer from "./components/Footer";
import Societies from "./components/Societies"; 
import Contact from "./components/Contact";

const Home = () => (
  <>
    <Hero />
    <About />
    <Events />
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
                <Events />
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
          {/* Update the Contact route to use the Contact component */}
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
