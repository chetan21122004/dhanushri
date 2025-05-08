"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Twitter, Youtube, Linkedin, Mail, MapPin, Phone, Send, ChevronDown } from "lucide-react"

export default function ContactSection() {
  const sectionRef = useRef(null)
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

    const elements = {
      header: sectionRef.current,
      form: formRef.current,
      socials: infoRef.current,
    }

    // Header animations
    if (elements.header) {
      gsap.fromTo(
        elements.header,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elements.header,
            start: "top 80%",
          },
        },
      )
    }

    // Social icons animation
    if (elements.socials) {
      gsap.fromTo(
        elements.socials.querySelectorAll(".social-icon"),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: elements.socials,
            start: "top 85%",
          },
        },
      )
    }

    // Form animations
    if (elements.form) {
      gsap.fromTo(
        elements.form.querySelectorAll("input, textarea"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elements.form,
            start: "top 85%",
          },
        },
      )
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission with animation
    gsap.to(".submit-button", {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    })

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

      // Success animation
      gsap.fromTo(
        ".success-message",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      )

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    e.preventDefault()
    navigator.clipboard.writeText(text)
    // Handle copy feedback
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="contact-title section-title">Get in Touch</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Have a question or want to collaborate? Feel free to reach out and I'll get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div ref={formRef} className="form-container bg-white rounded-xl shadow-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Send a Message</h3>

            {isSubmitted ? (
              <div className="success-message bg-green-50 border border-green-200 rounded-lg p-6 text-center">
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
                  <div className="form-field">
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

                  <div className="form-field">
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

                  <div className="form-field">
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

                  <div className="form-field">
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

                  <div className="form-field">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="submit-button w-full btn-primary flex items-center justify-center"
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
            <h3 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h3>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl shadow-xl p-6 md:p-8 mb-8">
              <div className="space-y-6">
                <div className="contact-info-item flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p>hello@dhanshri.com</p>
                    <p className="text-purple-200 text-sm mt-1">For business inquiries and collaborations</p>
                  </div>
                </div>

                <div className="contact-info-item flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p>Mumbai, India</p>
                    <p className="text-purple-200 text-sm mt-1">Available for travel worldwide</p>
                  </div>
                </div>

                <div className="contact-info-item flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p>+91 98765 43210</p>
                    <p className="text-purple-200 text-sm mt-1">Monday to Friday, 10am to 6pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4">Connect on Social Media</h4>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md transform transition-all duration-300"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md transform transition-all duration-300"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md transform transition-all duration-300"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md transform transition-all duration-300"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            <div className="mt-12">
              <div className="relative h-64 rounded-xl overflow-hidden shadow-xl">
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
        <h3 className="text-2xl font-bold mb-8 gradient-text text-center">Frequently Asked Questions</h3>

        <div className="space-y-4">
          <FaqItem
            question="What types of collaborations do you do?"
            answer="I work with brands across various industries including fashion, beauty, lifestyle, travel, and technology. My collaborations include sponsored content, brand ambassadorships, product reviews, event appearances, and more."
          />

          <FaqItem
            question="How can brands work with you?"
            answer="Brands can reach out through the contact form or email for collaboration inquiries. I typically request a brief about the brand, product/service, campaign goals, timeline, and budget to ensure alignment."
          />

          <FaqItem
            question="Do you offer content creation services?"
            answer="Yes, I offer content creation services including photography, videography, and creative direction. These can be tailored to your brand's specific needs and can be used across your marketing channels."
          />
        </div>
      </div>
    </section>
  )
}

interface FaqItemProps {
  question: string
  answer: string
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left"
      >
        <h4 className="text-lg font-semibold text-gray-800">{question}</h4>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ${
          isOpen ? "pb-6 max-h-40" : "max-h-0"
        }`}
      >
        <p className="text-gray-700">{answer}</p>
      </div>
    </div>
  )
}
