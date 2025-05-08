"use client"

import { type ReactNode, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { TextPlugin } from "gsap/TextPlugin"

export default function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Register GSAP plugins only on the client side
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)

      // Set defaults
      gsap.defaults({
        ease: "power2.out",
        duration: 0.8,
      })

      // Refresh ScrollTrigger on window resize
      window.addEventListener("resize", () => {
        ScrollTrigger.refresh()
      })

      // Clean up ScrollTrigger instances on unmount
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        window.removeEventListener("resize", () => {
          ScrollTrigger.refresh()
        })
      }
    }
  }, [])

  return <>{children}</>
}
