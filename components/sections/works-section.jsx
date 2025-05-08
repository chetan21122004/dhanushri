"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

const brands = [
  {
    id: 1,
    name: "Luxe Beauty",
    category: "Beauty",
    image: "/IMG_8064.JPG",
    description: "A collaborative campaign showcasing their new skincare line with authentic reviews and tutorials.",
  },
  {
    id: 2,
    name: "Fashion Forward",
    category: "Fashion",
    image: "/IMG_8141.PNG",
    description: "Seasonal lookbook featuring their latest collection styled in everyday settings.",
  },
  {
    id: 3,
    name: "Tech Innovations",
    category: "Technology",
    image: "/IMG_8142.PNG",
    description: "Product review series highlighting the user-friendly features of their smart home devices.",
  },
  {
    id: 4,
    name: "Wellness Co",
    category: "Health",
    image: "/IMG_8143.PNG",
    description: "A month-long wellness challenge showcasing their supplements and fitness equipment.",
  },
  {
    id: 5,
    name: "Gourmet Delights",
    category: "Food",
    image: "/IMG_8145.PNG",
    description: "Recipe development and food styling for their artisanal food products.",
  },
]

export default function WorksSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const brandsRef = useRef(null)
  const sliderRef = useRef(null)
  const [filter, setFilter] = useState("All")
  const [activeIndex, setActiveIndex] = useState(null)

  // Function to handle slide movement
  const handleSlide = (direction = 1) => {
    if (!sliderRef.current) return;
    
    const cards = sliderRef.current.children;
    const cardWidth = window.innerWidth < 640 ? 216 : window.innerWidth < 768 ? 238 : 274;
    const totalWidth = cardWidth * (cards.length / 2);

    gsap.to(cards, {
      x: `-=${cardWidth * direction}`,
      duration: 0.8,
      ease: "power2.inOut",
      modifiers: {
        x: gsap.utils.unitize((x) => {
          return parseFloat(x) % totalWidth;
        })
      },
      onUpdate: () => {
        // Update opacity based on position and screen size
        Array.from(cards).forEach((card) => {
          const rect = card.getBoundingClientRect();
          const center = window.innerWidth / 2;
          const distance = Math.abs(rect.left + rect.width / 2 - center);
          const maxDistance = window.innerWidth / 2;
          
          // Calculate opacity with different values for mobile
          const isMobile = window.innerWidth < 640;
          const minOpacity = isMobile ? 0.95 : 0.87;
          const opacityFactor = isMobile ? 0.08 : 0.17;
          
          const opacity = gsap.utils.clamp(minOpacity, 1, 1 - (distance / maxDistance) * opacityFactor);
          
          gsap.set(card, {
            opacity: opacity,
          });
        });
      }
    });
  };

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
      ".filter-item",
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

    // Initial opacity setup for cards
    if (sliderRef.current) {
      const cards = sliderRef.current.children;
      Array.from(cards).forEach((card) => {
        const rect = card.getBoundingClientRect();
        const center = window.innerWidth / 2;
        const distance = Math.abs(rect.left + rect.width / 2 - center);
        const maxDistance = window.innerWidth / 2;
        
        // Calculate initial opacity with different values for mobile
        const isMobile = window.innerWidth < 640;
        const minOpacity = isMobile ? 0.95 : 0.87;
        const opacityFactor = isMobile ? 0.08 : 0.17;
        
        const opacity = gsap.utils.clamp(minOpacity, 1, 1 - (distance / maxDistance) * opacityFactor);
        gsap.set(card, { opacity });
      });
    }
  }, [filter])

  const filteredBrands = filter === "All" ? brands : brands.filter((brand) => brand.category === filter)

  return (
    <section id="works" ref={sectionRef} className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="section-title">Brands & Collaborations</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Explore my partnerships with amazing brands across different industries, creating authentic content that
          resonates with audiences.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
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

      {/* brands section */}

      <div ref={brandsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative">
          {/* Gradient overlays for side fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-pink-50/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-purple-50/50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => handleSlide(-1)} 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => handleSlide(1)} 
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-[1200px] mx-auto overflow-hidden">
            <div 
              ref={sliderRef} 
              className="flex gap-4 sm:gap-6 py-4"
            >
              {[...filteredBrands, ...filteredBrands].map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className={`brand-card card group ${activeIndex === index ? "z-10" : ""} w-[200px] sm:w-[220px] md:w-[240px] flex-shrink-0 mx-2 transition-all duration-300 ease-in-out`}
                >
                  <div className="relative w-full pt-[177.78%] overflow-hidden">
                    <Image
                      src={brand.image || "/placeholder.svg"}
                      alt={brand.name}
                      fill
                      className="object-cover object-center absolute top-0 left-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 sm:p-6">
                        <h3 className="text-white font-bold text-lg sm:text-xl">{brand.name}</h3>
                        <p className="text-purple-100 text-xs sm:text-sm">{brand.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 bg-white">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-800">{brand.name}</h3>
                    <p className="text-purple-600 text-xs sm:text-sm mb-2 sm:mb-3">{brand.category}</p>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">{brand.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>









      {/* want to collaborate section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap- items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">Want to collaborate?</h2>
              <p className="text-gray-700 ">
                I'm always open to new and exciting partnerships with brands that align with my values and audience
                interests. Let's create authentic content together that resonates with your target audience.
              </p>
              <a href="#contact" className="btn-primary my-3 inline-block">
                Get in Touch
              </a>
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <Image src="https://media.licdn.com/dms/image/v2/C4D12AQGEEQb5Mc3_cQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1652213713167?e=2147483647&v=beta&t=DgbkzPk7S92ZGxexQnBSCBi4UISDnOgMS5sh6NhrWfQ" alt="Collaboration" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-purple-600/30 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
