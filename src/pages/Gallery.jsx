import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import FsLightbox from "fslightbox-react";

export const Gallery = () => {
  return (
    <div className="relative bg-white dark:bg-black text-black dark:text-white transition-all overflow-hidden">
      <ReactLenis root options={{ lerp: 0.08, infinite: true }}>
        <ParallaxImages />
      </ReactLenis>
    </div>
  );
};

const ParallaxImages = () => {
  const [images, setImages] = useState(() =>
    Array.from({ length: 30 }, (_, i) => `https://picsum.photos/600/400?random=${i}`)
  );

  const [lightboxController, setLightboxController] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400) {
        setImages((prev) => [
          ...prev,
          ...Array.from({ length: 10 }, (_, i) => `https://picsum.photos/600/400?random=${prev.length + i}`),
        ]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLightbox = (index) => {
    setCurrentSlide(index);
    setLightboxController(!lightboxController);
  };

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((src, i) => (
          <ParallaxImg key={i} src={src} alt={`Gallery Image ${i + 1}`} index={i + 1} openLightbox={openLightbox} row={i % 4} />
        ))}
      </div>
      <FsLightbox toggler={lightboxController} sources={images} slide={currentSlide} key={currentSlide} />
    </div>
  );
};

const ParallaxImg = ({ alt, src, index, openLightbox, row }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-200px start", "end end"],
  });

  // Smoother Depth Animations
  const yValues = [[-80, 80], [80, -80], [-60, 60], [60, -60]];
  const y = useTransform(scrollYProgress, [0, 1], yValues[row]);
  const scale = useTransform(scrollYProgress, [0.2, 1], [0.9, 1.2]);

  // Mouse Interaction (3D depth)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 40 });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const rect = ref.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 50);
    mouseY.set(y * 50);
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-xl cursor-pointer shadow-lg transition-all"
      style={{ y, scale, rotateX: springX, rotateY: springY }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 10px 40px rgba(0, 255, 255, 0.5)",
      }}
      onMouseMove={handleMouseMove}
      onClick={() => openLightbox(index)}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-64 object-cover rounded-xl transition-all duration-300"
        whileHover={{
          filter: "brightness(1.2) contrast(1.2)",
        }}
      />
    </motion.div>
  );
};

export default Gallery;
