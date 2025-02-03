import React, { useEffect, useState } from 'react';
import { client } from "../../sanity"; 
import { Container } from './Container';
import { FadeIn, FadeInStagger } from './FadeIn'; 
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const socialMediaIcons = {
  instagram: <FaInstagram />,
  facebook: <FaFacebook />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedin />,
};

const Team = () => {
  const [teamData, setTeamData] = useState([]);
  const [year, setYear] = useState("2024");
  const [selectedTab, setSelectedTab] = useState("Advisory"); 
  const [selectedCommittee, setSelectedCommittee] = useState("EC");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      const query = `*[_type == "team" && year == $year] {
        name,
        photo {
          asset -> {
            url
          }
        },
        committee,
        position,
        socialMedia[] {
          platform,
          url
        },
        society
      } | order(society, committee)`;

      try {
        const data = await client.fetch(query, { year });
        console.log('Fetched Team Data:', data);
        setTeamData(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setError('Failed to load team data.');
      }
    };

    let isMounted = true;
    if (isMounted) {
      fetchTeamData();
    }

    return () => {
      isMounted = false;
    };
  }, [year, selectedTab, selectedCommittee]);

  const groupedData = teamData.reduce((acc, member) => {
    if (!acc[member.society]) acc[member.society] = { EC: [], CC: [], Faculty: [], Advisory: [] };
    acc[member.society][member.committee].push(member);
    return acc;
  }, {});

  const sortMembers = (members) => {
    return members.sort((a, b) => {
      if (a.position.toLowerCase().includes("chairperson")) return -1;
      if (b.position.toLowerCase().includes("chairperson")) return 1;
      if (a.position.toLowerCase().includes("vice-chairperson")) return -1;
      if (b.position.toLowerCase().includes("vice-chairperson")) return 1;
      return 0;
    });
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setSelectedCommittee("EC");
  };

  const renderImage = (photo) => {
    if (photo?.asset?.url) {
      return <img src={photo.asset.url} alt="Team member" className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105" />;
    }
    return (
      <div className="h-80 w-full bg-gray-300 dark:bg-gray-600 flex justify-center items-center">
        <span className="text-gray-500 dark:text-gray-200 text-lg">No Image</span>
      </div>
    );
  };

  const renderSocialLinks = (socialMedia) => {
    return socialMedia?.map((social, index) => {
      const normalizedPlatform = social.platform.trim().toLowerCase(); 
      const Icon = socialMediaIcons[normalizedPlatform];
      return Icon ? (
        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300">
          {Icon}
        </a>
      ) : null;
    });
  };

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Team</h1>
      <div className="flex items-center space-x-4 mb-8">
  <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">Year:</span>
  <select
    id="year"
    value={year}
    onChange={(e) => setYear(e.target.value)}
    className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
  >
    <option value="2022">2022</option>
    <option value="2023">2023</option>
    <option value="2024">2024</option>
  </select>
</div>


      <div className="flex space-x-4 mb-8">
        {["Advisory", "IEEE SB", "IEEE CS", "IEEE WIE"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 rounded-lg font-semibold ${selectedTab === tab ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'} transition-all duration-300`}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {selectedTab && (
        <>
          <div className="mb-8">
            <hr className="border-t-2 mb-4 border-gray-300 dark:border-gray-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{selectedTab}</h2>

            {selectedTab === "Advisory" ? (
              <>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Faculty</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupedData[selectedTab]?.["Faculty"]?.map((person) => (
                    <FadeIn key={`${person.name}-${person.position}`}>
                      <div className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                        {renderImage(person.photo)}
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-6">
                          <p className="text-lg font-semibold text-white">{person.name}</p>
                          <p className="text-sm text-gray-300">{person.position}</p>
                          <div className="flex space-x-3 mt-2">
                            {renderSocialLinks(person.socialMedia)}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <hr className="border-t-2 mb-8 border-gray-300 dark:border-gray-600" />
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Advisory</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupedData[selectedTab]?.["Advisory"]?.map((person) => (
                    <FadeIn key={`${person.name}-${person.position}`}>
                      <div className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                        {renderImage(person.photo)}
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-6">
                          <p className="text-lg font-semibold text-white">{person.name}</p>
                          <p className="text-sm text-gray-300">{person.position}</p>
                          <div className="flex space-x-3 mt-2">
                            {renderSocialLinks(person.socialMedia)}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Executive Committee</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {sortMembers(groupedData[selectedTab]?.["EC"] || []).map((person) => (
                    <FadeIn key={`${person.name}-${person.position}`}>
                      <div className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                        {renderImage(person.photo)}
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-6">
                          <p className="text-lg font-semibold text-white">{person.name}</p>
                          <p className="text-sm text-gray-300">{person.position}</p>
                          <div className="flex space-x-3 mt-2">
                            {renderSocialLinks(person.socialMedia)}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                <div className="mb-14"></div>

                <hr className="border-t-2 mb-12 border-gray-300 dark:border-gray-600 mx-4" />

                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Core Committee</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {sortMembers(groupedData[selectedTab]?.["CC"] || []).map((person) => (
                    <FadeIn key={`${person.name}-${person.position}`}>
                      <div className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                        {renderImage(person.photo)}
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-6">
                          <p className="text-lg font-semibold text-white">{person.name}</p>
                          <p className="text-sm text-gray-300">{person.position}</p>
                          <div className="flex space-x-3 mt-2">
                            {renderSocialLinks(person.socialMedia)}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default Team;
