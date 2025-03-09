import BentoGrid from "./bento";
import achievementsData from "../Data/achievementsData";

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