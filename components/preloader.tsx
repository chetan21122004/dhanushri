"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Animate the preloader
    const tl = gsap.timeline()

    // Animate the letters individually
    tl.fromTo(
      ".preloader-letter",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "back.out(1.7)", duration: 0.8 },
    )

    // Animate the line
    tl.fromTo(".preloader-line", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.inOut" }, "-=0.2")

    // Hide the preloader
    setTimeout(() => {
      gsap.to(".preloader", {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          setIsLoading(false)
          // Trigger initial animations for the page
          gsap.fromTo(".hero-content", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        },
      })
    }, 2500)
  }, [])

  if (!isLoading) return null

  return (
    <div className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {Array.from("DHANUSHRI").map((letter, index) => (
            <span
              key={index}
              className="preloader-letter inline-block text-5xl md:text-7xl font-bold font-poppins bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="preloader-line h-1 w-48 md:w-64 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 transform origin-left"></div>
      </div>
    </div>
  )
}
