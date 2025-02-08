"use client"

import Link from "next/link";
import IndexHeader from "@/components/headers/IndexHeader";
import { FaExclamationTriangle } from "react-icons/fa";
import { type FC, type ReactElement } from "react";

const NotFoundPage: FC = (): ReactElement => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <IndexHeader />
      <main className="flex-grow">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

const HeroSection: FC = () => (
  <section className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 text-white py-20 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center text-center relative z-10">
        <FaExclamationTriangle className="text-7xl mb-6 animate-pulse" />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Oops! Page Not Found
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/status"
          className="bg-white text-red-500 hover:bg-red-100 font-bold py-3 px-8 rounded-full text-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Return to Homepage
        </Link>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-20"></div>
    </div>
    <div className="absolute -top-10 -left-10 w-96 h-96 bg-red-400 rounded-full blur-3xl opacity-30"></div>
    <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-30"></div>
  </section>
);

const Footer: FC = (): ReactElement => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} UptimeX. All rights reserved.</p>
    </div>
  </footer>
);

export default NotFoundPage;
