"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Instagram, Twitter, Youtube, Linkedin, Heart } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      ".footer-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top bottom",
        },
      },
    )
  }, [])

  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-poppins mb-4 bg-gradient-to-r from-pink-300 to-purple-300 text-transparent bg-clip-text">
              Dhanushri
            </h3>
            <p className="text-purple-200 mb-4">
              Creating authentic content and connecting brands with audiences through creative storytelling.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-300 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-purple-200 hover:text-pink-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/works" className="text-purple-200 hover:text-pink-300 transition-colors">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-purple-200 hover:text-pink-300 transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-purple-200 hover:text-pink-300 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-200 hover:text-pink-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-purple-200 mb-2">Email: hello@dhanshri.com</p>
            <p className="text-purple-200">For business inquiries and collaborations</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-800 text-center text-purple-300">
          <p className="flex items-center justify-center">
            Made with <Heart size={16} className="mx-1 text-pink-400" /> © {new Date().getFullYear()} Dhanshri. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
