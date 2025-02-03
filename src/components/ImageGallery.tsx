"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { useState } from "react";

const ImageGallery = () => {
  const [imagesLoaded, setImagesLoaded] = useState(Array(4).fill(false));

  const images = [
    {
      src: "/images/fannie.jpg",
      className: "col-span-2 row-span-2",
    },
    {
      src: "/images/lucy.jpg",
      className: "col-span-1 row-span-1",
    },
    {
      src: "/images/bernice.jpg",
      className: "col-span-1 row-span-2",
    },
    {
      src: "/images/bessie.jpg",
      className: "col-span-2 row-span-1",
    },
  ];

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="w-full lg:w-1/2 grid grid-cols-3 grid-rows-3 gap-4 h-[500px]">
      {images.map(({ src, className }, index) => (
        <Tilt
          key={index}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          scale={1.02}
          transitionSpeed={2000}
          className={`relative rounded-2xl overflow-hidden ${className}`}
        >
          {/* Skeleton */}
          {!imagesLoaded[index] && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
          )}

          {/* Image */}
          <Image
            className={`object-cover transition-opacity duration-300 ${
              imagesLoaded[index] ? "opacity-100" : "opacity-0"
            }`}
            src={src}
            alt={`Gallery Image ${index + 1}`}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            onLoad={() => handleImageLoad(index)}
          />
        </Tilt>
      ))}
    </div>
  );
};

export default ImageGallery;
