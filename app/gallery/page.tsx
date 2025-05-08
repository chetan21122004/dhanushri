"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Fashion photoshoot",
    category: "Fashion",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Beauty product showcase",
    category: "Beauty",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=800&width=800",
    alt: "Travel destination",
    category: "Travel",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Lifestyle moment",
    category: "Lifestyle",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Brand collaboration",
    category: "Brands",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=800&width=800",
    alt: "Behind the scenes",
    category: "BTS",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Fashion event",
    category: "Fashion",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Travel adventure",
    category: "Travel",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=800&width=800",
    alt: "Beauty routine",
    category: "Beauty",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Home decor",
    category: "Lifestyle",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Brand event",
    category: "Brands",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=800&width=800",
    alt: "Content creation",
    category: "BTS",
  },
]

export default function Gallery() {
  const headerRef = useRef(null)
  const galleryRef = useRef(null)
  const [filter, setFilter] = useState("All")
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header animations
    gsap.fromTo(".gallery-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })

    gsap.fromTo(
      ".gallery-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 },
    )

    gsap.fromTo(
      ".filter-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.4 },
    )

    // Gallery animations
    gsap.fromTo(
      ".gallery-item",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 70%",
        },
      },
    )
  }, [])

  const filteredImages = filter === "All" ? galleryImages : galleryImages.filter((image) => image.category === filter)

  return (
    <div className="min-h-screen py-20">
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="gallery-title section-title">Photo Gallery</h1>
        <p className="gallery-subtitle text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          A visual journey through my work as an influencer, showcasing moments from photoshoots, travels, and
          collaborations.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {["All", "Fashion", "Beauty", "Travel", "Lifestyle", "Brands", "BTS"].map((category) => (
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

      <div ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item relative group overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                    <p className="text-purple-200 text-xs">{image.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={1000}
                height={1000}
                className="object-contain max-h-[80vh]"
              />
              <button
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="bg-white p-4 rounded-b-lg">
              <h3 className="font-bold text-gray-800">{selectedImage.alt}</h3>
              <p className="text-purple-600 text-sm">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
