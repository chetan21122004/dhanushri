"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Camera, Megaphone, Palette, Video, Briefcase, Globe } from "lucide-react"

const services = [
  {
    icon: <Camera className="h-10 w-10 text-pink-500" />,
    title: "Content Creation",
    description: "High-quality photo and video content tailored to your brand's aesthetic and message.",
    features: ["Professional photography", "Creative direction", "Visual storytelling", "Brand-aligned aesthetics"],
  },
  {
    icon: <Megaphone className="h-10 w-10 text-purple-500" />,
    title: "Brand Partnerships",
    description: "Strategic collaborations that authentically connect your brand with my engaged audience.",
    features: ["Sponsored content", "Brand ambassadorship", "Product launches", "Campaign promotion"],
  },
  {
    icon: <Video className="h-10 w-10 text-pink-500" />,
    title: "Video Production",
    description: "Engaging video content from concept to execution, designed to captivate and convert.",
    features: ["Product reviews", "Tutorials", "Behind-the-scenes", "Lifestyle integration"],
  },
  {
    icon: <Palette className="h-10 w-10 text-purple-500" />,
    title: "Creative Consulting",
    description: "Strategic guidance on content strategy, branding, and social media optimization.",
    features: ["Content strategy", "Brand positioning", "Audience insights", "Trend forecasting"],
  },
  {
    icon: <Globe className="h-10 w-10 text-pink-500" />,
    title: "Event Appearances",
    description: "In-person or virtual appearances to elevate your brand events and connect with audiences.",
    features: ["Product launches", "Meet & greets", "Panel discussions", "Live demonstrations"],
  },
  {
    icon: <Briefcase className="h-10 w-10 text-purple-500" />,
    title: "Social Media Management",
    description: "End-to-end management of social media campaigns to maximize reach and engagement.",
    features: ["Content calendar", "Community engagement", "Performance analytics", "Growth strategies"],
  },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      },
    )

    // Cards staggered animation
    gsap.fromTo(
      ".service-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      },
    )

    // Icon hover animations
    gsap.utils.toArray(".service-icon").forEach((icon) => {
      const tl = gsap.timeline({ paused: true })
      tl.to(icon, {
        rotate: 360,
        scale: 1.2,
        duration: 0.6,
        ease: "back.out(1.7)",
      })

      icon.parentElement.addEventListener("mouseenter", () => tl.play())
      icon.parentElement.addEventListener("mouseleave", () => tl.reverse())
    })
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="section-title">My Services</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mt-4">
            Comprehensive solutions to elevate your brand through authentic content and strategic partnerships.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group"
            >
              <div className="p-8">
                <div className="service-icon mb-6 transform transition-all duration-500">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#contact" className="btn-primary inline-flex items-center">
            Discuss Your Project
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
