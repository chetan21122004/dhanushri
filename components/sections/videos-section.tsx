"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play, Clock, Eye, ThumbsUp } from "lucide-react"

interface Video {
  id: number
  title: string
  category: string
  thumbnail: string
  videoUrl: string
  duration: string
  views: string
  likes: string
  featured: boolean
}

const videos: Video[] = [
  {
    id: 1,
    title: "Summer Lookbook 2023",
    category: "Fashion",
    thumbnail: "/IMG_8064.JPG",
    videoUrl: "/Video-125.mp4",
    duration: "12:45",
    views: "1.2M",
    likes: "85K",
    featured: true,
  },
  {
    id: 2,
    title: "My Morning Skincare Routine",
    category: "Beauty",
    thumbnail: "/IMG_8141.PNG",
    videoUrl: "/Video-126.mp4",
    duration: "08:32",
    views: "950K",
    likes: "72K",
    featured: false,
  },
  {
    id: 3,
    title: "Travel Vlog: Exploring Bali",
    category: "Travel",
    thumbnail: "/IMG_8142.PNG",
    videoUrl: "/Video-399.mp4",
    duration: "18:20",
    views: "1.5M",
    likes: "120K",
    featured: true,
  },
  {
    id: 4,
    title: "Tech Essentials for Content Creators",
    category: "Technology",
    thumbnail: "/IMG_8143.PNG",
    videoUrl: "/Video-514.mp4",
    duration: "14:15",
    views: "780K",
    likes: "65K",
    featured: false,
  },
  {
    id: 5,
    title: "Healthy Meal Prep for the Week",
    category: "Lifestyle",
    thumbnail: "/IMG_8145.PNG",
    videoUrl: "/Video-868.mp4",
    duration: "15:40",
    views: "1.1M",
    likes: "93K",
    featured: false,
  },
  {
    id: 6,
    title: "Behind the Scenes: Brand Photoshoot",
    category: "Fashion",
    thumbnail: "/IMG_8145.PNG",
    videoUrl: "/Video-125.mp4",
    duration: "10:25",
    views: "820K",
    likes: "68K",
    featured: false,
  }
]

export default function VideosSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const videosRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState("All")
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header animations
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      },
    )

    // Filter buttons animation
    gsap.fromTo(
      ".video-filter-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      },
    )

    // Featured video animations
    gsap.fromTo(
      ".featured-video",
      {
        scale: 0.9,
        opacity: 0,
        y: 50,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
        },
      },
    )

    // Video grid animations with staggered reveal
    gsap.fromTo(
      ".video-card",
      {
        y: 50,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: {
          each: 0.1,
          grid: [2, 3],
          from: "start",
        },
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: videosRef.current,
          start: "top 80%",
        },
      },
    )

    // Play button hover animation
    gsap.utils.toArray<HTMLButtonElement>(".play-button").forEach((button) => {
      const tl = gsap.timeline({ paused: true })
      tl.to(button, {
        scale: 1.2,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      })

      button.addEventListener("mouseenter", () => tl.play())
      button.addEventListener("mouseleave", () => tl.reverse())
    })
  }, [])

  const featuredVideos = videos.filter((video) => video.featured)
  const filteredVideos = filter === "All" ? videos : videos.filter((video) => video.category === filter)

  return (
    <section id="videos" ref={sectionRef} className="py-20 bg-white">

      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="section-title">Video Content</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Explore my video content across different categories, from fashion and beauty to lifestyle and travel.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {["All", "Fashion", "Beauty", "Travel", "Technology", "Lifestyle"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`video-filter-item px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
        <h3 className="text-2xl font-bold mb-8 gradient-text">Featured Videos</h3>

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
                    className="play-button h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white transform transition-transform duration-300"
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
        <h3 className="text-2xl font-bold mb-8 gradient-text">All Videos</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-card card group overflow-hidden">
              <div className="relative h-[200px] sm:h-[180px] md:h-[220px] overflow-hidden">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="play-button h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white transform transition-transform duration-300"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-[300px] bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pt-[177.78%]">
              <video
                src={activeVideo.videoUrl}
                className="absolute inset-0 w-full h-full object-contain"
                controls
                autoPlay
                playsInline
                controlsList="nodownload"
              >
                Your browser does not support the video tag.
              </video>
              <button
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors duration-200 backdrop-blur-sm z-10"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 sm:p-5 bg-white">
              <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2">{activeVideo.title}</h3>
              <p className="text-purple-600 text-sm mb-3">{activeVideo.category}</p>
              <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                <div className="flex items-center mr-4">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  {activeVideo.views} views
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  {activeVideo.likes} likes
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
