"use client"

import Image from "next/image"
import IndexHeader from "@/components/headers/IndexHeader"
import { FaCheckCircle, FaExclamationCircle, FaRocket, FaChartLine, FaShieldAlt } from "react-icons/fa"
import Link from "next/link"
import { type FC, type JSX, type ReactElement, ReactNode } from "react"

interface IFeature {
  icon: JSX.Element
  title: string
  description: string
}

const Index: FC = (): ReactElement => {
  const features: IFeature[] = [
    {
      icon: <FaRocket className="text-green-500 text-4xl" />,
      title: "Real-time Monitoring",
      description: "Monitor service uptime in real-time and get instant notifications for downtime.",
    },
    {
      icon: <FaChartLine className="text-blue-500 text-4xl" />,
      title: "Easy Integration",
      description: "Seamlessly integrate with your existing tools and workflows for efficient management.",
    },
    {
      icon: <FaExclamationCircle className="text-red-500 text-4xl" />,
      title: "Smart Alerting",
      description: "Receive instant notifications of potential issues before they impact your users.",
    },
    {
      icon: <FaShieldAlt className="text-purple-500 text-4xl" />,
      title: "Advanced Security",
      description: "Ensure your monitoring data is protected with state-of-the-art security measures.",
    },
  ]
  const monitors: string[] = ["HTTP/HTTPS", "TCP", "MongoDB", "PostgreSQL", "Redis", "SSL/TLS"]

  return (
    <div className="flex flex-col min-h-screen">
      <IndexHeader />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection features={features} />
        <MonitorsSection monitors={monitors} />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

const HeroSection: FC = () => (
  <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Ultimate <span className="text-yellow-300">Uptime</span> Monitor Service
          </h1>
          <p className="text-xl mb-8">
            Ensure high availability and reliability for your applications with our real-time uptime monitoring service.
          </p>
          <Link
            href="/create-account"
            className="bg-white text-green-500 hover:bg-green-100 font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Start Monitoring for Free
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src="https://i.ibb.co/MshLk9P/bg.jpg"
            alt="API Monitor"
            className="rounded-lg shadow-2xl ml-6"
            width={600}
            height={400}
            priority
          />
        </div>
      </div>
    </div>
  </section>
)

const FeaturesSection: FC<{ features: IFeature[] }> = ({ features }) => (
  <section className="py-20 bg-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  </section>
)

const Feature: FC<IFeature> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
    <div className="flex items-center mb-4">
      <div className="mr-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
)

const MonitorsSection: FC<{ monitors: string[] }> = ({ monitors }) => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Supported Monitors</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {monitors.map((monitor, index) => (
          <div key={index} className="bg-green-100 p-4 rounded-lg text-center">
            <FaCheckCircle className="text-green-500 text-2xl mx-auto mb-2" />
            <p className="font-semibold">{monitor}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const TestimonialSection: FC = () => (
  <section className="py-20 bg-gray-800 text-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <Testimonial
          quote="UptimeX has been a game-changer for our team. We've significantly reduced our downtime and improved our response times."
          author="Jane Doe, CTO at TechCorp"
        />
        <Testimonial
          quote="The real-time alerts and comprehensive reporting have made our operations much more efficient. Highly recommended!"
          author="John Smith, DevOps Lead at StartupX"
        />
      </div>
    </div>
  </section>
)

const Testimonial: FC<{ quote: string; author: string }> = ({ quote, author }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-md max-w-md">
    <p className="text-lg mb-4">"{quote}"</p>
    <p className="font-semibold text-green-400">- {author}</p>
  </div>
)

const CTASection: FC = () => (
  <section className="py-20 bg-green-500 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Ensure 99.9% Uptime?</h2>
      <p className="text-xl mb-8">Join thousands of satisfied customers and start monitoring your services today.</p>
      <Link
        href="/create-account"
        className="bg-white text-green-500 hover:bg-green-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Get Started for Free
      </Link>
    </div>
  </section>
)

const Footer: FC = (): ReactElement => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h3 className="text-2xl font-bold mb-4">UptimeX</h3>
          <p className="text-gray-400">Ensuring your services stay up and running 24/7.</p>
        </div>
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/features" className="text-gray-400 hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-gray-400 hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaRocket className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaChartLine className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaShieldAlt className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p>&copy; {new Date().getFullYear()} UptimeX. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

export default Index

