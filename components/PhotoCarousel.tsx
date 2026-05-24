"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { EventGalleryImage } from "@/lib/content";
import { playArcadeBlip } from "@/components/client-sound";

type PhotoCarouselProps = {
  images: EventGalleryImage[];
};

export function PhotoCarousel({ images }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const active = images[index];

  function move(direction: -1 | 1) {
    setIndex((value) => (value + direction + images.length) % images.length);
    playArcadeBlip("soft");
  }

  return (
    <section className="photo-carousel" aria-label="Event photo gallery">
      <div className="photo-carousel__frame">
        <Image alt={active.alt} fill priority sizes="(max-width: 880px) 92vw, 52vw" src={active.src} />
        <button aria-label="Previous photo" className="icon-button photo-carousel__arrow photo-carousel__arrow--prev" onClick={() => move(-1)} type="button">
          <ChevronLeft aria-hidden="true" size={28} strokeWidth={3} />
        </button>
        <button aria-label="Next photo" className="icon-button photo-carousel__arrow photo-carousel__arrow--next" onClick={() => move(1)} type="button">
          <ChevronRight aria-hidden="true" size={28} strokeWidth={3} />
        </button>
      </div>
    </section>
  );
}
