"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { TextPlugin } from "gsap/TextPlugin"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)
}

// Scroll to section
export const scrollToSection = (sectionId: string, offset = 80) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: `#${sectionId}`, offsetY: offset },
    ease: "power3.inOut",
  })
}

// Fade in animation
export const fadeIn = (element: string, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
    },
  )
}

// Fade in from left
export const fadeInLeft = (element: string, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power2.out",
    },
  )
}

// Fade in from right
export const fadeInRight = (element: string, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power2.out",
    },
  )
}

// Staggered animation for multiple elements
export const staggerItems = (elements: string, delay = 0, stagger = 0.1, duration = 0.6) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      stagger,
      duration,
      delay,
      ease: "power2.out",
    },
  )
}

// Scroll trigger animation
export const scrollTriggerAnimation = (
  element: string | Element,
  trigger: string | Element,
  start = "top 70%",
  animation = { opacity: 0, y: 50 },
  endAnimation = { opacity: 1, y: 0 },
  scrub = false,
) => {
  return gsap.fromTo(element, animation, {
    ...endAnimation,
    duration: scrub ? undefined : 0.8,
    ease: scrub ? "none" : "power2.out",
    scrollTrigger: {
      trigger,
      start,
      scrub,
    },
  })
}

// Text reveal animation
export const textReveal = (element: string | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    { width: 0, opacity: 0 },
    { width: "100%", opacity: 1, duration: 1, delay, ease: "power2.inOut" },
  )
}

// Counter animation
export const counterAnimation = (element: string | Element, target: number, duration = 2) => {
  return gsap.to(element, {
    innerText: target,
    duration,
    snap: { innerText: 1 },
    ease: "power2.out",
  })
}

// Parallax effect
export const parallaxEffect = (element: string | Element, yPercent = -20, scrub = true) => {
  return gsap.to(element, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub,
    },
  })
}

// Scale animation
export const scaleAnimation = (element: string | Element, delay = 0, duration = 1) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: "power2.out",
    },
  )
}

// 3D tilt effect
export const tiltEffect = (element: string | Element) => {
  const el = typeof element === "string" ? document.querySelector(element) : element
  if (!el) return

  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = (x / rect.width - 0.5) * 20
    const yPercent = (y / rect.height - 0.5) * 20

    gsap.to(el, {
      rotationY: xPercent,
      rotationX: -yPercent,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power1.out",
    })
  })

  el.addEventListener("mouseleave", () => {
    gsap.to(el, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power1.out",
    })
  })
}
