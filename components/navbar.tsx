"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { gsap } from "gsap"

const navLinks = [
  { name: "Home", path: "hero" },
  { name: "Services", path: "services" },
  { name: "Works", path: "works" },
  { name: "Videos", path: "videos" },
  { name: "Contact", path: "contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navbarRef = useRef(null)
  const tl = useRef(null)

  useEffect(() => {
    // Initialize timeline
    tl.current = gsap.timeline({ paused: true })

    // Animate navbar items
    tl.current.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", duration: 0.6 },
    )

    // Animate logo
    tl.current.fromTo(".logo", { x: -20, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", duration: 0.6 }, "<0.2")

    // Play animation
    tl.current.play()

    // Scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Mobile menu animation
    if (isOpen) {
      gsap.fromTo(
        ".mobile-nav-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", duration: 0.4 },
      )
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  const scrollToSection = (sectionId) => {
    setIsOpen(false)

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${sectionId}`, offsetY: 80 },
      ease: "power3.inOut",
    })
  }

  return (
    <nav
      ref={navbarRef}
      
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 border-b border-purple-100 ${
        scrolled ? "bg-white/80 backdrop-blur-sm shadow-md" : "bg-white "
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 logo">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("hero")
              }}
              className="font-poppins font-bold text-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
            >
              Dhanushri
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={`#${link.path}`}
                  id={`${link.path}-nav`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.path)
                  }}
                  className={`nav-item font-medium transition-all duration-300 hover:text-purple-600 text-gray-700`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-600 hover:text-pink-600 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md absolute w-full border-b border-purple-100 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={`#${link.path}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.path)
                }}
                className="mobile-nav-item block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
