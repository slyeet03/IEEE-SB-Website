import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import FsLightbox from "fslightbox-react";
import { useMediaQuery } from "react-responsive";
import galleryImages from "../Data/GalleryData";

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
  const [images] = useState(galleryImages);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const openLightbox = (index) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index,
    });
  };

  return (
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {images.map((src, i) => (
          <ParallaxImg
            key={i}
            src={src}
            alt={`Gallery Image ${i + 1}`}
            index={i + 1}
            openLightbox={openLightbox}
            row={i % 4}
          />
        ))}
      </div>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={images}
        slide={lightboxController.slide}
      />
    </div>
  );
};

const ParallaxImg = ({ alt, src, index, openLightbox, row }) => {
  const ref = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Check if mobile

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["-200px start", "end end"],
  });

  // Smoother Depth Animations (disabled on mobile)
  const yValues = [[-80, 80], [80, -80], [-60, 60], [60, -60]];
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : yValues[row]);
  const scale = useTransform(scrollYProgress, [0.2, 1], isMobile ? [1, 1] : [0.9, 1.2]);

  // Mouse Interaction (3D depth, disabled on mobile)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 40 });

  const handleMouseMove = (event) => {
    if (isMobile) return; // Disable mouse interaction on mobile
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
      style={{
        y,
        scale,
        rotateX: isMobile ? 0 : springX, // Disable 3D rotation on mobile
        rotateY: isMobile ? 0 : springY, // Disable 3D rotation on mobile
      }}
      whileHover={isMobile ? {} : { scale: 1.1, boxShadow: "0px 10px 40px rgba(0, 255, 255, 0.5)" }}
      onMouseMove={handleMouseMove}
      onClick={() => openLightbox(index)}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-48 sm:h-64 object-cover rounded-xl transition-all duration-300"
        whileHover={isMobile ? {} : { filter: "brightness(1.2) contrast(1.2)" }}
      />
    </motion.div>
  );
};

export default Gallery;