import Image from "next/image";
import BeachView1 from "@/public/img/ui/landing_page/BeachView1.jpg";
import BeachView3 from "@/public/img/ui/landing_page/BeachView3.jpg";
import CottagesView1 from "@/public/img/ui/landing_page/CottagesView1.jpg";
import ResortView1 from "@/public/img/ui/landing_page/ResortView1.jpg";
import ResortView2 from "@/public/img/ui/landing_page/ResortView2.jpg";

interface AboutProps {
  id: string;
}

export default function About({ id }: AboutProps) {
  return (
    <>
      <section id={id || "about"} className="w-full bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto mt-4 md:mt-16 px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text Content */}
          <div className="flex flex-col mt-14">
            <span className="text-sm uppercase tracking-wider text-gray-500 mb-3">
              About the Resort
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Jacah Randa Beach Cabanas
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Jacah Randa Beach Cabanas is a beach resort established on
              November 18, 2021, located in Brgy. San Ramon, Sitio Bat-Os,
              Pilar, Capiz. It was developed as a family-owned business with the
              goal of providing a peaceful and enjoyable seaside destination for
              both local and visiting tourists.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              The name “Jacah Randa” holds personal and cultural significance,
              derived from the names of the owner’s daughters—“JA” from the
              eldest and “CAH” from the youngest—combined with “Randa,” meaning
              worthy of admiration. This reflects the resort’s aspiration to be
              admired for its quality, service, and ambiance.
            </p>

            <p className="text-gray-600 leading-relaxed">
              The resort offers accommodation rooms, rentable cottages, and an
              event hall for weddings, birthdays, and other occasions.
              Recreational activities such as kayaking, beach volleyball, and
              bonfire gatherings promote relaxation and social connection.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {/* Featured Image */}
            <div className="relative col-span-2 aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={ResortView1}
                alt="Jacah Randa Beach Resort"
                fill
                priority
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Portrait Images */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow">
              <Image
                src={BeachView1}
                alt="Beach view"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow">
              <Image
                src={BeachView3}
                alt="Beach cottages"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Bottom Images */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow">
              <Image
                src={CottagesView1}
                alt="Cottages"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow">
              <Image
                src={ResortView2}
                alt="Resort view"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
