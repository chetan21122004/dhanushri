"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play, Clock, Eye, ThumbsUp } from "lucide-react"

const videos = [
  {
    id: 1,
    title: "Summer Lookbook 2023",
    category: "Fashion",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "12:45",
    views: "1.2M",
    likes: "85K",
    featured: true,
  },
  {
    id: 2,
    title: "My Morning Skincare Routine",
    category: "Beauty",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "08:32",
    views: "950K",
    likes: "72K",
    featured: false,
  },
  {
    id: 3,
    title: "Travel Vlog: Exploring Bali",
    category: "Travel",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "18:20",
    views: "1.5M",
    likes: "120K",
    featured: true,
  },
  {
    id: 4,
    title: "Tech Essentials for Content Creators",
    category: "Technology",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "14:15",
    views: "780K",
    likes: "65K",
    featured: false,
  },
  {
    id: 5,
    title: "Healthy Meal Prep for the Week",
    category: "Lifestyle",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "15:40",
    views: "1.1M",
    likes: "93K",
    featured: false,
  },
  {
    id: 6,
    title: "Behind the Scenes: Brand Photoshoot",
    category: "Fashion",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "10:25",
    views: "820K",
    likes: "68K",
    featured: false,
  },
  {
    id: 7,
    title: "Home Office Tour & Organization Tips",
    category: "Lifestyle",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "13:50",
    views: "930K",
    likes: "78K",
    featured: false,
  },
  {
    id: 8,
    title: "Q&A: My Journey as an Influencer",
    category: "Personal",
    thumbnail: "/placeholder.svg?height=720&width=1280",
    duration: "22:10",
    views: "1.3M",
    likes: "110K",
    featured: true,
  },
]

export default function Videos() {
  const headerRef = useRef(null)
  const featuredRef = useRef(null)
  const videosRef = useRef(null)
  const [filter, setFilter] = useState("All")
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header animations
    gsap.fromTo(".videos-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })

    gsap.fromTo(
      ".videos-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 },
    )

    gsap.fromTo(
      ".filter-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.4 },
    )

    // Featured video animations
    gsap.fromTo(
      ".featured-video",
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 70%",
        },
      },
    )

    // Video grid animations
    gsap.fromTo(
      ".video-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: videosRef.current,
          start: "top 70%",
        },
      },
    )
  }, [])

  const featuredVideos = videos.filter((video) => video.featured)

  const filteredVideos = filter === "All" ? videos : videos.filter((video) => video.category === filter)

  return (
    <div className="min-h-screen py-20">
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="videos-title section-title">Video Content</h1>
        <p className="videos-subtitle text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Explore my video content across different categories, from fashion and beauty to lifestyle and travel.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {["All", "Fashion", "Beauty", "Travel", "Technology", "Lifestyle", "Personal"].map((category) => (
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

      {/* Featured Videos */}
      <div ref={featuredRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-2xl font-bold mb-8 gradient-text">Featured Videos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVideos.map((video) => (
            <div key={video.id} className="featured-video card group overflow-hidden">
              <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white transform hover:scale-110 transition-transform duration-300"
                  >
                    <Play className="h-8 w-8 text-white fill-white" />
                  </button>
                </div>
                <div className="absolute bottom-0 right-0 bg-black/70 text-white text-sm px-2 py-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{video.title}</h3>
                <p className="text-purple-600 text-sm mb-3">{video.category}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <div className="flex items-center mr-4">
                    <Eye className="h-4 w-4 mr-1" />
                    {video.views} views
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {video.likes} likes
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Videos */}
      <div ref={videosRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 gradient-text">All Videos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-card card group overflow-hidden">
              <div className="relative h-40 sm:h-36 md:h-44 overflow-hidden">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white transform hover:scale-110 transition-transform duration-300"
                  >
                    <Play className="h-6 w-6 text-white fill-white" />
                  </button>
                </div>
                <div className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {video.duration}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-gray-800 line-clamp-1">{video.title}</h3>
                <p className="text-purple-600 text-xs mb-2">{video.category}</p>
                <div className="flex items-center text-gray-500 text-xs">
                  <div className="flex items-center mr-3">
                    <Eye className="h-3 w-3 mr-1" />
                    {video.views}
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {video.likes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-20 w-20 text-white/50" />
                <p className="absolute text-white/70">Video player would be here</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{activeVideo.title}</h3>
              <p className="text-purple-600 mb-4">{activeVideo.category}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <div className="flex items-center mr-6">
                  <Eye className="h-4 w-4 mr-1" />
                  {activeVideo.views} views
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {activeVideo.likes} likes
                </div>
              </div>
              <button
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
