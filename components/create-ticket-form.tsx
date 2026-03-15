"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, AlertCircle } from "lucide-react"

export function CreateTicketForm() {

  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    priority: "medium",
    attachment: null as File | null,
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        attachment: e.target.files![0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    try {

      setLoading(true)

      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          priority: formData.priority,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create ticket")
      }

      const ticket = await response.json()

      console.log("Ticket created:", ticket)

      setSubmitted(true)

      setFormData({
        title: "",
        category: "",
        description: "",
        priority: "medium",
        attachment: null,
      })

      // redirect after short delay
      setTimeout(() => {
        router.push("/my-tickets")
      }, 1500)

    } catch (error) {

      console.error("Ticket creation error:", error)

      alert("Failed to create ticket. Please try again.")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="w-full">

      <div className="mb-16">
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Need some help?
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl">
          We're here to support you. Just let us know what's going on, and our
          team will get back to you shortly.
        </p>
      </div>


      <form onSubmit={handleSubmit} className="space-y-12 max-w-2xl">


        {/* TITLE */}

        <div>
          <label className="text-muted-foreground font-medium">
            What's the issue? *
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full py-4 bg-transparent border-b-2 border-white/20 text-foreground text-lg outline-none focus:border-primary"
          />
        </div>


        {/* CATEGORY + PRIORITY */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div>

            <label className="text-muted-foreground font-medium">
              Category *
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full py-4 bg-transparent border-b-2 border-white/20 text-foreground text-lg outline-none"
            >

              <option value="">Choose one</option>
              <option value="academic">Academic Concerns</option>
              <option value="technical">Technical Issues</option>
              <option value="account">Account Access</option>
              <option value="other">Something Else</option>

            </select>

          </div>


          <div>

            <label className="text-muted-foreground font-medium">
              How urgent?
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full py-4 bg-transparent border-b-2 border-white/20 text-foreground text-lg outline-none"
            >

              <option value="low">Can wait</option>
              <option value="medium">Soon would help</option>
              <option value="high">Pretty urgent</option>
              <option value="urgent">Right now!</option>

            </select>

          </div>

        </div>


        {/* DESCRIPTION */}

        <div>

          <label className="text-muted-foreground font-medium">
            Tell us more *
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            required
            className="w-full py-4 bg-transparent border-b-2 border-white/20 text-foreground text-lg outline-none resize-none"
          />

        </div>


        {/* ATTACHMENT */}

        <div className="animate-slide-in-smooth" style={{ animationDelay: "300ms" }}>
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Attachments (optional)
          </p>

          <div className="relative group">
            <input
              id="attachment"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            />

            <label
              htmlFor="attachment"
              className="block w-full px-6 py-8 rounded-2xl bg-white/5 border border-white/15 text-center cursor-pointer hover:bg-white/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-out"
            >
            <div className="flex flex-col items-center gap-3">

              <div className="p-3 rounded-full bg-primary/10">
                📎
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                {formData.attachment
                  ? formData.attachment.name
                  : "Attach a file if needed"}
                </p>

                <p className="text-xs text-muted-foreground/60 mt-1">
                  PDF, images, or documents
                </p>
              </div>

            </div>
          </label>
          </div>
        </div>

        {/* SUBMIT */}

        <div className="pt-8">

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold flex items-center gap-2"
          >

            {loading ? "Submitting..." : "Submit Request"}

            <ChevronRight className="w-4 h-4" />

          </button>

          <p className="text-sm text-muted-foreground mt-6">
            We typically respond within a few hours.
          </p>

        </div>


        {/* SUCCESS MESSAGE */}

        {submitted && (

          <div className="mt-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/30">

            <div className="flex gap-3 items-start">

              <AlertCircle className="w-5 h-5 text-green-400" />

              <div>

                <p className="font-semibold text-green-200">
                  Ticket created successfully!
                </p>

                <p className="text-sm text-green-200/80">
                  Redirecting to your tickets...
                </p>

              </div>

            </div>

          </div>

        )}

      </form>

    </div>
  )
}