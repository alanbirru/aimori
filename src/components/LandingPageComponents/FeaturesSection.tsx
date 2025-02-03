import React from "react";
import SectionContainer from "@/components/ui/SectionContainer";

export default function FeaturesSection() {
  return (
    <SectionContainer>
      <h2 className="text-3xl font-bold text-center mb-12">
        Your Perfect{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          AI Companion
        </span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Personalized Experience
          </h3>
          <p className="text-gray-600">
            Choose her personality, appearance, and watch as she evolves based
            on your interactions.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-cyan-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Meaningful Gifts</h3>
          <p className="text-gray-600">
            Give special gifts to strengthen your bond and unlock unique
            reactions and conversations.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Dynamic Relationship</h3>
          <p className="text-gray-600">
            Experience a relationship that grows and changes based on your
            choices and interactions.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
