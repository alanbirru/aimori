"use client";
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import BackgroundGrid from "@/components/BackgroundGrid";
import Link from "next/link";

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
        {/* Sidebar - added modal={false} */}
        <Sheet modal={false}>
          <SheetTrigger asChild>
            <button
              className="fixed top-20 left-4 p-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg 
              hover:shadow-lg hover:shadow-blue-500/25 transition-all z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                Navegación
              </SheetTitle>
            </SheetHeader>

            <div className="h-full py-6 flex flex-col">
              {/* Navigation Links */}
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span className="font-medium">Dashboard</span>
                </Link>

                <Link
                  href="/dashboard/chat"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors bg-blue-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-cyan-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                    />
                  </svg>
                  <span className="font-medium">Chat</span>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main content - added padding-left for mobile */}
        <div className="flex-1">
          <div className="flex h-[calc(100vh-64px)] bg-gradient-to-b from-white to-blue-50/30 mt-16 pl-16 sm:pl-0">
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
