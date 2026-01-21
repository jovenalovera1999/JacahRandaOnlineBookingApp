import Image from "next/image";
import Kayak1 from "@/public/img/ui/activities/Kayak1.jpg";
import Kayak2 from "@/public/img/ui/activities/Kayak2.jpg";
import Kayak3 from "@/public/img/ui/activities/Kayak3.jpg";

interface ActivitiesProps {
  id: string;
}

export default function Activities({ id }: ActivitiesProps) {
  const kayaks = [Kayak1, Kayak2, Kayak3];

  return (
    <>
      <section id={id || "activities"} className="w-full bg-white scroll-mt-24">
        <div className="max-w-7xl mt-16 mx-auto px-4">
          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <span className="text-sm uppercase tracking-widest text-gray-500">
              Activity Experience
            </span>
            <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-gray-800">
              Activities
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Drift over calm, turquoise waters and feel the sea breeze as you
              kayak along the shore at Jacah Randa Beach Cabanas. Peaceful,
              refreshing, and perfectly freeing.
            </p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Supporting Images */}
            {kayaks.map((kayak, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-2xl overflow-hidden shadow"
              >
                <Image
                  src={kayak}
                  alt={`Activity ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
