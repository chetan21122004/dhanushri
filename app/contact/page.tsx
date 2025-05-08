"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Twitter, Youtube, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"

export default function Contact() {
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header animations
    gsap.fromTo(".contact-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })

    gsap.fromTo(
      ".contact-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 },
    )

    // Form animations
    gsap.fromTo(
      ".form-container",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
        },
      },
    )

    // Info animations
    gsap.fromTo(
      ".info-container",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 70%",
        },
      },
    )

    gsap.fromTo(
      ".social-icon",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
        },
      },
    )
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen py-20">
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="contact-title section-title">Get in Touch</h1>
        <p className="contact-subtitle text-lg text-gray-700 max-w-2xl mx-auto">
          Have a question or want to collaborate? Feel free to reach out and I'll get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div ref={formRef} className="form-container bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Send a Message</h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Send className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all"
                      placeholder="Collaboration Opportunity"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none transition-all resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div ref={infoRef} className="info-container">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl shadow-md p-6 md:p-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p>hello@dhanshri.com</p>
                    <p className="text-purple-200 text-sm mt-1">For business inquiries and collaborations</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p>Mumbai, India</p>
                    <p className="text-purple-200 text-sm mt-1">Available for travel worldwide</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p>+91 98765 43210</p>
                    <p className="text-purple-200 text-sm mt-1">Monday to Friday, 10am to 6pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Connect on Social Media</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            <div className="mt-12">
              <div className="relative h-64 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Contact Dhanshri"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold">Let's Create Together</h3>
                    <p className="text-purple-200">Looking forward to our collaboration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-2xl font-bold mb-8 gradient-text text-center">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What types of collaborations do you do?</h3>
            <p className="text-gray-700">
              I work with brands across various industries including fashion, beauty, lifestyle, travel, and technology.
              My collaborations include sponsored content, brand ambassadorships, product reviews, event appearances,
              and more.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How can brands work with you?</h3>
            <p className="text-gray-700">
              Brands can reach out through the contact form or email for collaboration inquiries. I typically request a
              brief about the brand, product/service, campaign goals, timeline, and budget to ensure alignment.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you offer content creation services?</h3>
            <p className="text-gray-700">
              Yes, I offer content creation services including photography, videography, and creative direction. These
              can be tailored to your brand's specific needs and can be used across your marketing channels.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What are your rates?</h3>
            <p className="text-gray-700">
              Rates vary depending on the scope of work, usage rights, exclusivity, and other factors. Please reach out
              with your project details for a customized quote that aligns with your budget and goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
