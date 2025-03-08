"use client";
import BentoGrid from "./bento";

const achievementsData = [
  {
    id: 1,
    label: "JK Pal and Outstanding Student Volunteer Award",
    description: "Sriansh Raj",
    image: "https://cdn.sanity.io/images/gcb0j4e6/production/719541515991f31db70387c5167951075d060a76-3024x4032.jpg",
    content:
      "Sriansh Raj has been honored with the JK Pal and Outstanding Student Volunteer Award for his relentless contributions to IEEE MUJ. His passion for technology, leadership skills, and dedication have played a crucial role in shaping the IEEE community at our university. This award is a testament to his remarkable efforts and commitment."  },
  {
      id: 2,
    label: "Network Student Award",
    description: "Aashi Sharma",
    image: "https://cdn.sanity.io/images/gcb0j4e6/production/ec4c1831012f3cefaa003bb409cb0e3462d5075c-3024x4032.jpg",
    content:
      "Aashi Sharma’s significant contributions to IEEE have been recognized with the IEEE Delhi Section Network Student Award. Her dedication to IEEE’s mission, along with her outstanding networking skills and initiatives, have made a meaningful impact on the student community."  },
 
  {
    id: 3,
    label: "JK Pal and Outstanding Student Volunteer Award",
    description: "Atul Raj Sharma",
    image: "https://cdn.sanity.io/images/gcb0j4e6/production/04ff9b198fe8ee361776da9d23c0facbe4e30355-3024x4032.jpg",
    content:
      "Atul Raj Sharma’s dedication and contribution to IEEE have been recognized with the JK Pal and Outstanding Student Volunteer Award. His ability to lead and innovate has made a lasting impact, inspiring fellow students to engage and grow in the IEEE community. Congratulations, Atul!"  },
  {
    id: 4,
    label: "Achievement 4",
    description: "test achievement 4",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 5,
    label: "Achievement 5",
    description: "test achievement 5",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 6,
    label: "Achievement 6",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 7,
    label: "Achievement 7",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 8,
    label: "A COMMUNITY OF INNOVATION",
    description: "",
    image: "",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 9,
    label: "Achievement 9",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 10,
    label: "Achievement 10",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 11,
    label: "Achievement 11",
    description: "test achievement 6",
    image: "/public/achievement.webp",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

function Achievements() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-[1400px] mx-auto">
        <div className="w-full overflow-x-hidden px-4">
          <BentoGrid items={achievementsData} />
        </div>
      </div>
    </section>
  );
}

export default Achievements;