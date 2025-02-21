import React from "react";

const Societies = () => {
  const societies = [
    {
      name: "IEEE Student Branch",
      description: [
        `"Empowering Innovation, Inspiring Excellence" – this is the guiding vision of IEEE Student Branch, Manipal University Jaipur. Our branch is a dynamic community of passionate individuals dedicated to fostering awareness and proficiency in the ever-evolving world of technology. With the steadfast support of our esteemed faculty mentors, we strive to push boundaries, enhance our skills, and evolve into future-ready engineers.`,
        `Established with the goal of enriching technical knowledge and professional development, IEEE SB MUJ has consistently provided a platform for students to explore, innovate, and grow. Through diverse initiatives, including workshops, hackathons, expert talks, and collaborative projects, we bridge the gap between academia and industry, ensuring our members gain practical exposure and hands-on experience.`,
        `As the largest technical professional organization at Manipal University Jaipur, our mission is to harness the power of technology and education to drive impactful change. By nurturing a culture of research, learning, and teamwork, we aim to create an ecosystem where aspiring technologists can thrive, contribute, and lead in shaping the future of engineering and innovation.`,
      ],
      lightImage:
        "https://cdn.sanity.io/images/gcb0j4e6/production/092b293692686480e83aac9316168fbfd142e588-344x194.png",
      darkImage:
        "https://cdn.sanity.io/images/gcb0j4e6/production/b34ec0b0932ccb66e8bf4c16a473392f27e420a7-344x194.png",
    },
    {
      name: "IEEE Computer Society",
      description: [
        `“Serving computing at its best with inclusion and diversity” is the prime motto of the IEEE Computer Society. This society was created keeping in mind IEEE’s continued commitment to providing options at best. The IEEE Computer Society is driven by the central goals of equity, diversity, inclusion, and yearn to serve computing at its perfection.`,
        `With an intent to expand the IEEE’s reach and learnings, this society was started a year back in early 2020. Since then, society has tried every possible course of action by conducting diverse events such as webinars, competitions, workshops, and mentorship programs to set a goal for the young achievers.`,
        `We aim to proactively support diversity and inclusion by being the premier source for information, inspiration, and collaboration in computer science and engineering. Connecting members on campus, this IEEE Computer Society empowers the students who wish to advance in technology by delivering tools at all stages of their professional careers.`,
      ],
      lightImage:
        "https://cdn.sanity.io/images/gcb0j4e6/production/edd196ff7ee299f2b7f74ce9d4ae7207040c6ea4-3120x955.png",
      darkImage:
        "https://cdn.sanity.io/images/gcb0j4e6/production/458be942a4d281485d8d5ba3fb32a5e0baa2ffe8-1559x628.png",
    },
    {
      name: "IEEE Women in Engineering",
      description: [
        `IEEE Women in Engineering (WIE) is one of the largest international professional organizations dedicated to promoting women engineers, scientists, and inspiring girls everywhere to follow their academic interests in a career in engineering. The mission of IEEE WIE is to facilitate the recruitment and retention of women in technical disciplines globally.`,
        `IEEE-WIE MUJ Student Branch started in 2018 and has left no stone unturned in providing a platform where women can share ideas and collaborate. We seek to maintain a healthy and warm ambience for young women to discuss opinions, practice leadership, and hone their skills by hosting numerous webinars, workshops, competitions, and internships.`,
        `We strive to recognize the outstanding achievements of women and organize receptions at major technical conferences to enhance networking and promote membership at WIE. IEEE-WIE MUJ pledges to work towards gender-diversified panels at all IEEE conferences and events.`,
      ],
      lightImage:
        "https://cdn.sanity.io/images/gcb0j4e6/production/0de15fff7a0e79bee1004894081f4a6b30b411a9-1000x1000.png",
      darkImage: "https://cdn.sanity.io/images/gcb0j4e6/production/0de15fff7a0e79bee1004894081f4a6b30b411a9-1000x1000.png",
    },
    {
      name: "IEEE Computational Intelligence Society",
      description: [
        `The IEEE Computational Intelligence Society (CIS) is dedicated to advancing biologically-inspired computational paradigms for solving real-world problems. At its core, IEEE CIS focuses on technologies like neural networks, fuzzy systems, evolutionary computation, and hybrid intelligent systems that combine these paradigms with other innovative approaches.`,
        `Over the decades, the Society has evolved from the Neural Network Council to the Neural Network Society, and finally, to the Computational Intelligence Society, reflecting the growing diversity and impact of its core technologies.`,
        `IEEE CIS fosters research and development in computational intelligence by offering a platform for innovation, collaboration, and dissemination of knowledge. Its methods are applied to some of the most complex challenges of our time, from optimizing power systems to dynamic analysis in sensor networks.`,
      ],
      lightImage:
        "https://cdn.sanity.io/images/gcb0j4e6/production/5dffca4477ffc49c878df5cbb14c105f7114c72e-942x348.png",
      darkImage:
        "https://cdn.sanity.io/images/gcb0j4e6/production/d09cd5ee4c7c92139be9eb4ca915129317762012-942x348.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-ieee-dark py-12 px-6 lg:px-20">
      <h1 className="text-3xl font-extrabold text-center text-ieee-blue dark:text-ieee-light mb-16">
        Our Societies
      </h1>
      <div className="space-y-24">
        {societies.map((society, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-12 ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full max-w-md lg:max-w-sm">
              <div>
              <img
                src={society.lightImage}
                alt={society.name}
                className={`rounded-lg w-full dark:hidden ${
                  society.name === "IEEE Student Branch" ? "max-w-[300px] mx-auto" : ""
                }`}
              />
              {society.darkImage && (
                <img
                  src={society.darkImage}
                  alt={`${society.name} (Dark Mode)`}
                  className={`rounded-lg w-full hidden dark:block ${
                    society.name === "IEEE Student Branch" ? "max-w-[300px] mx-auto" : ""
                  }`}
              />
              )}
              </div>
            </div>

            <div className="flex-grow space-y-6">
              <h2 className="text-2xl font-semibold text-ieee-blue dark:text-ieee-light">
                {society.name}
              </h2>
              {society.description.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-gray-700 dark:text-gray-300 text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Societies;
