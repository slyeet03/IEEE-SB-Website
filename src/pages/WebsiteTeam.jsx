import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from "../../sanity";
import { Container } from '../components/Container';
import { FadeIn, FadeInStagger } from '../components/FadeIn';
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const socialMediaIcons = {
  instagram: <FaInstagram />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedin />,
  github: <FaGithub />,
};

const WebsiteTeam = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      const query = `*[_type == "team" && isWebsiteTeam == "Yes"] {
        name, photo { asset -> { url } }, committee, position, socialMedia[] { platform, url }, isWebsiteTeam
      } | order(committee)`;
               
      try {
        const data = await client.fetch(query);
        setTeamData(data);
      } catch (error) {
        setError('Failed to load team data.');
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, []);

  useEffect(() => {
    const selectedImages = teamData
      .filter((member) => member.isWebsiteTeam)
      .map((member) => member.photo?.asset?.url)
      .filter(Boolean);

    setImageUrls(selectedImages);
    setImagesLoaded(0); 
  }, [teamData]);

  useEffect(() => {
    if (imageUrls.length > 0) {
      preloadImages(imageUrls);
    }
  }, [imageUrls]);

  const preloadImages = (urls) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => setImagesLoaded((prev) => prev + 1);
    });
  };

  const renderImage = (photo, person) => {
    const imageUrl = photo?.asset?.url;
    if (imageUrl) {
      return (
        <div className="relative h-72 w-full group overflow-hidden rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
          <img
            src={imageUrl}
            alt="Team member"
            className="rounded-t-lg transition-transform duration-500 group-hover:scale-105"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p className="text-xl font-semibold text-white">{person.name}</p>
            <p className="text-sm text-gray-300">{person.position}</p>
            <div className="flex space-x-4 mt-2">{renderSocialLinks(person.socialMedia)}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-72 w-full bg-gray-300 dark:bg-gray-600 flex justify-center items-center group rounded-lg shadow-md">
          <span className="text-gray-500 dark:text-gray-200 text-lg">No Image</span>
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p className="text-xl font-semibold text-white">{person.name}</p>
            <p className="text-sm text-gray-300">{person.position}</p>
            <div className="flex space-x-4 mt-2">{renderSocialLinks(person.socialMedia)}</div>
          </div>
        </div>
      );
    }
  };

  const renderSocialLinks = (socialMedia) => (
    socialMedia?.map((social, index) => {
      const Icon = socialMediaIcons[social.platform.trim().toLowerCase()];
      return Icon ? (
        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="text-xl text-ieee-blue hover:text-gray-400 dark:hover:text-gray-200 transition-all duration-300">
          {Icon}
        </a>
      ) : null;
    })
  );

  return (
    <Container className="mt-16 sm:mt-24 lg:mt-32 relative pb-24">
  <div className="text-center mt-8 mb-12">
    <h1 className="text-4xl sm:text-5xl font-bold text-ieee-blue dark:text-ieee-light">Meet Our Website Team</h1>
    <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400">
      Discover the talented individuals behind the development of our website.
    </p>
  </div>

  {error && <p className="text-red-500">{error}</p>}

  {loading || imagesLoaded < imageUrls.length ? (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="h-72 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
      ))}
    </div>
  ) : (
    <FadeInStagger>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
        {teamData.filter((person) => person.isWebsiteTeam).map((person) => (
          <FadeIn key={`${person.name}-${person.position}`}>
            <div className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              {renderImage(person.photo, person)}
            </div>
          </FadeIn>
        ))}
      </div>
    </FadeInStagger>
  )}
</Container>

  );
};

export default WebsiteTeam;
