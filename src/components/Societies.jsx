import React from "react";
import ieeecs from "../assets/ieeecs.png";
import ieeewie from "../assets/ieeewie.png";
import ieeecis from "../assets/ieeecis.png";

const Societies = () => {
  const societies = [
    {
      name: "IEEE Computer Society",
      description: [
        `“Serving computing at its best with inclusion and diversity” is the prime motto of the IEEE Computer Society. This society was created keeping in mind IEEE’s continued commitment to providing options at best. The IEEE Computer Society is driven by the central goals of equity, diversity, inclusion, and yearn to serve computing at its perfection.`,
        `With an intent to expand the IEEE’s reach and learnings, this society was started a year back in early 2020. Since then, society has tried every possible course of action by conducting diverse events such as webinars, competitions, workshops, and mentorship programs to set a goal for the young achievers.`,
        `We aim to proactively support diversity and inclusion by being the premier source for information, inspiration, and collaboration in computer science and engineering. Connecting members on campus, this IEEE Computer Society empowers the students who wish to advance in technology by delivering tools at all stages of their professional careers.`,
      ],
      image: ieeecs,
    },
    {
      name: "IEEE Women in Engineering",
      description: [
        `IEEE Women in Engineering (WIE) is one of the largest international professional organizations dedicated to promoting women engineers, scientists, and inspiring girls everywhere to follow their academic interests in a career in engineering. The mission of IEEE WIE is to facilitate the recruitment and retention of women in technical disciplines globally.`,
        `IEEE-WIE MUJ Student Branch started in 2018 and has left no stone unturned in providing a platform where women can share ideas and collaborate. We seek to maintain a healthy and warm ambience for young women to discuss opinions, practice leadership, and hone their skills by hosting numerous webinars, workshops, competitions, and internships.`,
        `We strive to recognize the outstanding achievements of women and organize receptions at major technical conferences to enhance networking and promote membership at WIE. IEEE-WIE MUJ pledges to work towards gender-diversified panels at all IEEE conferences and events.`,
      ],
      image: ieeewie,
    },
    {
      name: "IEEE Computational Intelligence Society",
      description: [
        `The IEEE Computational Intelligence Society (CIS) is dedicated to advancing biologically-inspired computational paradigms for solving real-world problems. At its core, IEEE CIS focuses on technologies like neural networks, fuzzy systems, evolutionary computation, and hybrid intelligent systems that combine these paradigms with other innovative approaches.`,
        `Over the decades, the Society has evolved from the Neural Network Council to the Neural Network Society, and finally, to the Computational Intelligence Society, reflecting the growing diversity and impact of its core technologies.`,
        `IEEE CIS fosters research and development in computational intelligence by offering a platform for innovation, collaboration, and dissemination of knowledge. Its methods are applied to some of the most complex challenges of our time, from optimizing power systems to dynamic analysis in sensor networks.`,
      ],
      image: ieeecis,
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
            {/* Image Container */}
            <div className="w-full max-w-md lg:max-w-sm">
              <div className="dark:bg-gray-800 dark:p-4 dark:rounded-lg">
                <img
                  src={society.image}
                  alt={society.name}
                  className="rounded-lg w-full"
                />
              </div>
            </div>

            {/* Content */}
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
