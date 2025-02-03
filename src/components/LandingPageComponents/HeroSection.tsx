import React from "react";

import ImageGallery from "../ImageGallery";
import ClerkForm from "../ClerkForm";
import SectionContainer from "../ui/SectionContainer";

const HeroSection = () => {
  return (
    <SectionContainer className=" py-32 flex flex-col lg:flex-row justify-between items-center gap-8 container">
      {/* Text Content */}
      <div className="flex flex-col text-center lg:text-left bg-gradient-to-t from-blue-50 to-white p-9 rounded-lg shadow-md w-full lg:w-1/2 relative">
        <div className="absolute -left-4 -top-4 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-cyan-200 rounded-full blur-3xl opacity-70"></div>

        <h1 className="lg:text-6xl md:text-4xl text-3xl mb-5 relative">
          Welcome to{" "}
          <span className="font-black whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient">
            Ai Mori
          </span>
        </h1>
        <p className="text-lg text-gray-700 text-pretty lg:max-w-xl mb-6 leading-relaxed text-left">
          Create and nurture your perfect{" "}
          <strong className="text-blue-600">AI relationship</strong>. Choose her
          personality, give her{" "}
          <strong className="text-cyan-600">meaningful gifts</strong>, and watch
          as your <strong className="text-blue-600">bond grows stronger</strong>{" "}
          with every interaction.
        </p>
        <div className="mt-2">
          <ClerkForm text={"Start Your Journey"} />
        </div>
      </div>

      {/* Image Grid */}
      <ImageGallery />
    </SectionContainer>
  );
};

export default HeroSection;
