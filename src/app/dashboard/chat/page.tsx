"use client";
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import BackgroundGrid from "@/components/BackgroundGrid";
import Sidebar from "@/components/DashboardComponents/Sidebar";

function Page() {
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNotAtBottom = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollButton(isNotAtBottom);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const userAvatar = user?.imageUrl || "/user-avatar.jpg"; // Fallback to default if no Clerk image

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "I'm just bugging ya.",
      action: "She smiled warmly and leaned her head back on your shoulder",
      avatar: "/images/bessie.jpg",
      name: "Moms friend daughter",
    },
    {
      role: "user",
      content: "So then...",
      avatar: userAvatar,
      name: user?.firstName || "You",
    },
    {
      role: "assistant",
      content: "Then what? You still want to take me out?",
      avatar: "/images/bessie.jpg",
      name: "Moms friend daughter",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message with Clerk avatar
    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
        avatar: userAvatar,
        name: user?.firstName || "You",
      },
    ]);
    // Clear input
    setInput("");
  };

  return (
    <>
      <BackgroundGrid />
      <div className="flex h-screen">
        <Sidebar />
        {/* Main content */}
        <div className="flex-1">
          <div className="flex h-[calc(100vh-64px)] bg-gradient-to-b from-white to-blue-50/30 mt-16 pl-16 ">
            <div className="flex-1 flex flex-col">
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 relative
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-thumb]:bg-blue-200
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-track]:bg-transparent"
              >
                <div className="flex flex-col space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-1 max-w-3xl mx-auto">
                        <div className="flex items-start gap-3">
                          {message.role === "assistant" && (
                            <div className="relative">
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-30"></div>
                              <img
                                src={message.avatar}
                                alt={message.name}
                                className="relative w-8 h-8 rounded-full object-cover ring-2 ring-white"
                              />
                            </div>
                          )}
                          <div
                            className={`flex flex-col ${
                              message.role === "user"
                                ? "items-end"
                                : "items-start"
                            } flex-1`}
                          >
                            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-1">
                              {message.name}
                            </span>
                            <div
                              className={`rounded-2xl p-4 max-w-[80%] shadow-md ${
                                message.role === "user"
                                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                                  : "bg-white border border-gray-100"
                              }`}
                            >
                              <p
                                className={
                                  message.role === "assistant"
                                    ? "text-gray-800"
                                    : ""
                                }
                              >
                                {message.content}
                              </p>
                              {message.action && (
                                <p className="text-sm italic mt-2 opacity-90 bg-black/5 p-2 rounded-lg">
                                  {message.action}
                                </p>
                              )}
                            </div>
                          </div>
                          {message.role === "user" && (
                            <div className="relative">
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-30"></div>
                              <img
                                src={message.avatar}
                                alt={message.name}
                                className="relative w-8 h-8 rounded-full object-cover ring-2 ring-white"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {showScrollButton && (
                  <button
                    onClick={scrollToBottom}
                    className="fixed bottom-24 right-8 p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg 
                    hover:shadow-blue-500/25 hover:scale-105 transition-all z-10 animate-fade-in"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="border-t border-blue-100 bg-white p-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 max-w-3xl mx-auto"
                >
                  <div className="flex-1 flex items-center bg-gradient-to-r from-gray-50 to-white rounded-full px-6 py-3 shadow-sm border border-blue-100">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Mensaje Moms friend daughter..."
                      className="flex-1 bg-transparent outline-none"
                    />
                    <button
                      type="submit"
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </button>
                  </div>
                </form>
                <div className="text-xs text-center text-gray-500 mt-2 max-w-3xl mx-auto">
                  Esto es IA y no una persona real. Toma todo lo que dice como
                  ficción.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
