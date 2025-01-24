import React from "react";
import ieeecs from "../assets/ieeecs.png";
import ieeewie from "../assets/ieeewie.png";
import ieeeap from "../assets/ieeeap.jpeg";

const Societies = () => {
  const societies = [
    {
      name: "IEEE Computer Society",
      description: `“Serving computing at its best with inclusion and diversity” is the prime motto of the IEEE Computer Society. This society was created keeping in mind IEEE’s continued commitment to providing options at best. The IEEE Computer Society is driven by the central goals of equity, diversity, inclusion, and yearn to serve computing at its perfection.

      With an intent to expand the IEEE’s reach and learnings, this society was started a year back in early 2020. Since then, society has tried every possible course of action by conducting diverse events such as webinars, competitions, workshops, and mentorship programs to set a goal for the young achievers. The members of IEEE CS have been skilled and earned minimal expertise in roughly all possible sub-sections of CS via our accelerator program. The senior student mentors steer them on each stage they take and deliver them with the professional material for further reference.

      We aim to proactively support diversity and inclusion by being the premier source for information, inspiration, and collaboration in computer science and engineering. Connecting members on campus, this IEEE Computer Society empowers the students who wish to advance in technology by delivering tools at all stages of their professional careers.

      “Computer science is the operating system for all innovations.” At IEEE CS, we look at it similarly, trying to make a better world by working as a team.`,
      image: ieeecs,
    },
    {
      name: "IEEE Women in Engineering",
      description: `IEEE Women in Engineering (WIE) is one of the largest international professional organizations dedicated to promoting women engineers, scientists, and inspiring girls everywhere to follow their academic interests in a career in engineering. The mission of IEEE WIE is to facilitate the recruitment and retention of women in technical disciplines globally. IEEE WIE envisions a vibrant community of professionals using their diverse talents to innovate for the benefit of humanity.

      IEEE-WIE MUJ Student Branch started in 2018 and has left no stone unturned in providing a platform where women can share ideas and collaborate. We seek to maintain a healthy and warm ambience for young women to discuss opinions, practice leadership and hone their skills by hosting numerous webinars, workshops, competitions, and internships.

      We strive to recognize the outstanding achievements of women and organize receptions at major technical conferences to enhance networking and promote membership at WIE. IEEE-WIE MUJ pledges to work towards gender-diversified panels at all IEEE conferences and events.`,
      image: ieeewie,
    },
    {
      name: "IEEE AP-MMTS",
      description: `The IEEE AP-MTTS student branch is a group of dedicated students from Manipal University in Jaipur who have a background in RF and microwave engineering. The chapter was founded with the goal of increasing the popularity of microwave engineering and improving student learning experiences in many practical and exciting application elements of the electromagnetic field.`,
      image: ieeeap,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-ieee-dark transition-colors duration-300 py-12 px-6 lg:px-16">
      <h1 className="text-4xl font-bold text-center text-ieee-blue dark:text-ieee-light mb-12">
        Our Societies
      </h1>
      <div className="space-y-16">
        {societies.map((society, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-12 mb-16`}
          >
            <div className="flex-shrink-0 w-full max-w-lg">
              <img
                src={society.image}
                alt={society.name}
                className="rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-ieee-blue dark:text-ieee-light mb-6">
                {society.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {society.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Societies;
