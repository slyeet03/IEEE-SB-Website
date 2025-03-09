import { useEffect, useState } from "react";
import MemoriesGallery from "./MemoriesGallery";
import MemoriesGalleryMobile from "./MemoriesGalleryMobile";

const ResponsiveGallery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MemoriesGalleryMobile /> : <MemoriesGallery />;
};

export default ResponsiveGallery;
