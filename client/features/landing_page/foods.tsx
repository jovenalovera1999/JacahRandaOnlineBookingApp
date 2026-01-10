"use client";

import Image from "next/image";

import Food1 from "@/public/img/ui/foods/Food1.jpg";
import Food2 from "@/public/img/ui/foods/Food2.jpg";
import Food3 from "@/public/img/ui/foods/Food3.jpg";
import Food4 from "@/public/img/ui/foods/Food4.jpg";
import Food5 from "@/public/img/ui/foods/Food5.jpg";
import Food6 from "@/public/img/ui/foods/Food6.jpg";
import Food7 from "@/public/img/ui/foods/Food7.jpg";
import Food8 from "@/public/img/ui/foods/Food8.jpg";
import Food10 from "@/public/img/ui/foods/Food10.jpg";
import Food11 from "@/public/img/ui/foods/Food11.jpg";
import Food12 from "@/public/img/ui/foods/Food12.jpg";
import Food13 from "@/public/img/ui/foods/Food13.jpg";

export default function Foods() {
  const foods = [
    Food1,
    Food2,
    Food3,
    Food4,
    Food5,
    Food6,
    Food7,
    Food8,
    Food10,
    Food11,
    Food12,
    Food13,
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mt-4 mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <span className="text-sm uppercase tracking-widest text-gray-500">
            Dining Experience
          </span>
          <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-gray-800">
            Featured Foods
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            A curated selection of freshly prepared dishes served at Jacah Randa
            Beach Cabanas—crafted to complement your seaside experience.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Featured Image */}
          <div className="relative col-span-2 row-span-2 aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={foods[0]}
              alt="Featured food"
              fill
              priority
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Supporting Images */}
          {foods.slice(1).map((food, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow"
            >
              <Image
                src={food}
                alt={`Food item ${index + 2}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
