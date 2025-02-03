import React from "react";

const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full bg-background bg-[linear-gradient(to_right,rgb(var(--color-grid))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--color-grid))_1px,transparent_1px)] bg-[size:2rem_2rem]">
      {/* Radial gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_1000px_at_50%_-100px,rgb(var(--color-primary-light)),transparent)]" />

      {/* Edge fade masks */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-70" />
    </div>
  );
};

export default BackgroundGrid;
