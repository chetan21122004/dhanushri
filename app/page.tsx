"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { TextPlugin } from "gsap/TextPlugin"

// Sections
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import WorksSection from "@/components/sections/works-section"
import VideosSection from "@/components/sections/videos-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)

    // Initialize scroll trigger for each section
    const sections = ["hero", "services", "works", "videos", "contact"]

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: "top 80%",
        end: "bottom 20%",
        toggleClass: { targets: `#${section}-nav`, className: "active" },
        onEnter: () => updateActiveNav(section),
        onEnterBack: () => updateActiveNav(section),
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const updateActiveNav = (section) => {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("text-pink-600", "font-semibold")
      item.classList.add("text-gray-700")
    })

    const activeItem = document.getElementById(`${section}-nav`)
    if (activeItem) {
      activeItem.classList.remove("text-gray-700")
      activeItem.classList.add("text-pink-600", "font-semibold")
    }
  }

  const scrollToSection = (sectionId) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${sectionId}`, offsetY: 80 },
      ease: "power3.inOut",
    })
  }

  return (
    <div className="overflow-x-hidden">
      <HeroSection scrollToSection={scrollToSection} />
      <ServicesSection />
      <WorksSection />
      <VideosSection />
      <ContactSection />
    </div>
  )
}
