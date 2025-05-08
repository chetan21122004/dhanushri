"use client"

import { useState } from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

const brands = [
  {
    id: 1,
    name: "Luxe Beauty",
    category: "Beauty",
    image: "/placeholder.svg?height=600&width=800",
    description: "A collaborative campaign showcasing their new skincare line with authentic reviews and tutorials.",
  },
  {
    id: 2,
    name: "Fashion Forward",
    category: "Fashion",
    image: "/placeholder.svg?height=600&width=800",
    description: "Seasonal lookbook featuring their latest collection styled in everyday settings.",
  },
  {
    id: 3,
    name: "Tech Innovations",
    category: "Technology",
    image: "/placeholder.svg?height=600&width=800",
    description: "Product review series highlighting the user-friendly features of their smart home devices.",
  },
  {
    id: 4,
    name: "Wellness Co",
    category: "Health",
    image: "/placeholder.svg?height=600&width=800",
    description: "A month-long wellness challenge showcasing their supplements and fitness equipment.",
  },
  {
    id: 5,
    name: "Travel Escapes",
    category: "Travel",
    image: "/placeholder.svg?height=600&width=800",
    description: "Destination features and travel guides in partnership with their booking platform.",
  },
  {
    id: 6,
    name: "Gourmet Delights",
    category: "Food",
    image: "/placeholder.svg?height=600&width=800",
    description: "Recipe development and food styling for their artisanal food products.",
  },
]

export default function Works() {
  const headerRef = useRef(null)
  const brandsRef = useRef(null)
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header animations
    gsap.fromTo(".works-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })

    gsap.fromTo(
      ".works-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 },
    )

    gsap.fromTo(
      ".filter-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.4 },
    )

    // Brand card animations
    gsap.fromTo(
      ".brand-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: brandsRef.current,
          start: "top 70%",
        },
      },
    )
  }, [])

  const filteredBrands = filter === "All" ? brands : brands.filter((brand) => brand.category === filter)

  return (
    <div className="min-h-screen py-20">
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="works-title section-title">Brands & Collaborations</h1>
        <p className="works-subtitle text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Explore my partnerships with amazing brands across different industries, creating authentic content that
          resonates with audiences.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {["All", "Beauty", "Fashion", "Technology", "Health", "Travel", "Food"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-item px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-purple-50 border border-purple-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div ref={brandsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBrands.map((brand) => (
            <div key={brand.id} className="brand-card card group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl">{brand.name}</h3>
                    <p className="text-purple-100 text-sm">{brand.category}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800">{brand.name}</h3>
                <p className="text-purple-600 text-sm mb-3">{brand.category}</p>
                <p className="text-gray-600 mb-4">{brand.description}</p>
                <Link
                  href={`/works/${brand.id}`}
                  className="inline-flex items-center text-pink-600 font-medium hover:text-purple-600 transition-colors"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 md:p-12 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Want to collaborate?</h2>
              <p className="text-gray-700 mb-6">
                I'm always open to new and exciting partnerships with brands that align with my values and audience
                interests. Let's create authentic content together that resonates with your target audience.
              </p>
              <Link href="/contact" className="btn-primary inline-block">
                Get in Touch
              </Link>
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=600&width=800" alt="Collaboration" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
