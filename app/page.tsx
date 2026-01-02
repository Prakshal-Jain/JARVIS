"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"
import {
  Glasses,
  Watch,
  Circle,
  Disc2,
  Headphones,
  Pause,
  Play,
  Mic,
  Lasso,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isEnterprise, setIsEnterprise] = useState(false)
  const [isDeveloper, setIsDeveloper] = useState(false)
  const [isJustExploring, setIsJustExploring] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showTooltip, setShowTooltip] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const deviceImages = [
    {
      src: "/images/pasted-20graphic.png",
      alt: "AI Smart Glasses",
      caption:
        "In the last meeting, add any actionable items to my calendar and send a summary to my cofounder on Slack",
      isSpecial: true,
      phoneSrc: "/images/phone-slack.png",
    },
    {
      src: "/images/smartwatch.png",
      alt: "Smart Watch",
      caption:
        "I'm stuck in Tahoe ski resort due to blizzard. Reschedule non-urgent meetings, flag anything critical and ask for offline followup, and send message to John about the rescheduled meetings",
      isSpecial: true,
      phoneSrc: "/images/phone-notification.png",
    },
    {
      src: "/images/smart-ring.png",
      alt: "Smart Ring",
      caption:
        "Buy me the tickets to Wicked play in Manhattan Gershwin Theatre for tomorrow evening, and tell me a bit about the background of the play so I know enough context",
      isSpecial: true,
      phoneSrc: "/images/phone-wicked.png",
    },
    {
      src: "/images/earbuds.png",
      alt: "Wireless Earbuds",
      caption:
        "I'm heading home. Let my roommate know my ETA, order my favorite Indian cuisine for dinner on Uber Eats",
      isSpecial: true,
      phoneSrc: "/images/phone-food.png",
    },
    {
      src: "/images/ai-pendant.png",
      alt: "AI Pendant",
      caption: "Leaving the office in 15 minutes, when is the next train to Boston?",
    },
    {
      src: "/images/headphones.png",
      alt: "AI Headphones",
      caption:
        "I'm meeting Alex again tomorrow, remind me what we discussed last time and anything he's expecting from me as followup?",
      isSpecial: true,
      phoneSrc: "/images/phone-calendar.png",
    },
  ]

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % deviceImages.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [deviceImages.length, isPaused])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{
          email: email.toLowerCase().trim(),
          is_enterprise: isEnterprise,
          is_developer: isDeveloper,
          is_just_exploring: isJustExploring,
        }])

      if (supabaseError) {
        // Handle duplicate email (unique constraint violation)
        if (supabaseError.code === '23505') {
          setError('This email is already on the waitlist!')
        } else {
          console.error('Supabase error:', supabaseError)
          setError('Failed to join waitlist. Please try again.')
        }
        setLoading(false)
        return
      }

      setSubmitted(true)
      setEmail("")
      setIsEnterprise(false)
      setIsDeveloper(false)
      setIsJustExploring(false)
    } catch (err) {
      console.error('Waitlist submission error:', err)
      setError('Failed to connect. Please check your internet connection.')
    } finally {
      setLoading(false)
    }
  }

  const wearables = [
    { icon: Glasses, label: "Smart Glass" },
    { icon: Watch, label: "Smart Watch" },
    { icon: Circle, label: "Smart Ring" },
    { icon: Disc2, label: "AI Pin" },
    { icon: Lasso, label: "AI Pendant" },
    { icon: Headphones, label: "Earbuds/Headphones" },
  ]

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist-section")
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth", block: "center" })
      setIsDeveloper(true)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      <div className="absolute top-6 left-6">
        <div className="flex items-center gap-3">
          <img src="/images/jarvis-logo.png" alt="Jarvis Logo" className="w-10 h-10" />
          <span className="font-semibold text-lg">Jarvis</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-16">
        <div className="w-full max-w-3xl mx-auto text-center space-y-16">
          {/* Header */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">The OS for AI Wearables</h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
              Desktop-grade execution and persistent memory for glasses, earbuds, and AI wearables.
            </p>
          </div>

          {/* Wearable Icons Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-6 max-w-3xl mx-auto py-4">
            {wearables.map((wearable, index) => (
              <div key={index} className="flex flex-col items-center gap-3 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted/50 flex items-center justify-center transition-colors group-hover:bg-muted">
                  <wearable.icon className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground hidden md:block text-center">{wearable.label}</span>
              </div>
            ))}
          </div>

          {/* Waitlist Form */}
          <div id="waitlist-section" className="max-w-md mx-auto space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    required
                    className="flex-1 h-12 text-base"
                    disabled={loading}
                  />
                  <Button type="submit" size="lg" className="h-12 px-8 cursor-pointer" disabled={loading}>
                    {loading ? "Joining..." : "Join Waitlist"}
                  </Button>
                </div>
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="enterprise"
                      checked={isEnterprise}
                      onCheckedChange={(checked) => setIsEnterprise(checked === true)}
                    />
                    <label htmlFor="enterprise" className="text-sm text-muted-foreground cursor-pointer">
                      I am an enterprise
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="developer"
                      checked={isDeveloper}
                      onCheckedChange={(checked) => setIsDeveloper(checked === true)}
                    />
                    <label htmlFor="developer" className="text-sm text-muted-foreground cursor-pointer">
                      I am a developer
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="exploring"
                      checked={isJustExploring}
                      onCheckedChange={(checked) => setIsJustExploring(checked === true)}
                    />
                    <label htmlFor="exploring" className="text-sm text-muted-foreground cursor-pointer">
                      Just exploring
                    </label>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4 py-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">You're on the list!</h3>
                <p className="text-muted-foreground">We'll notify you when Jarvis launches</p>
                <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4 cursor-pointer">
                  Join another email
                </Button>
              </div>
            )}
          </div>

          <div className="max-w-2xl mx-auto pt-6">
            <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
              JARVIS remembers your context and executes real tasks end to end. Invisibly.
            </p>
          </div>

          {/* Image Carousel */}
          <div className="max-w-2xl mx-auto pt-12 space-y-8">
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="cursor-pointer h-8 w-8 p-0"
                aria-label={isPaused ? "Play animation" : "Pause animation"}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
            </div>

            <div className="relative w-full h-80 flex items-center justify-center">
              {deviceImages.map((image, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full transition-opacity duration-1000"
                  style={{
                    opacity: currentImageIndex === index ? 1 : 0,
                  }}
                >
                  {image.isSpecial && image.phoneSrc ? (
                    <div className="flex items-center justify-center gap-4 md:gap-8 h-full px-4">
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-1/3 md:w-2/5 h-full object-contain"
                      />
                      <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-primary flex-shrink-0" />
                      <img
                        src={image.phoneSrc || "/placeholder.svg"}
                        alt="Phone with AI notification"
                        className="w-1/3 md:w-2/5 h-full object-contain"
                      />
                    </div>
                  ) : (
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 py-4">
              {deviceImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentImageIndex === index
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Captions */}
            <div className="relative min-h-40 flex flex-col items-center justify-start gap-4 px-4">
              {deviceImages.map((image, index) => (
                <div
                  key={index}
                  className="absolute w-full flex flex-col items-center gap-4 transition-opacity duration-1000"
                  style={{
                    opacity: currentImageIndex === index ? 1 : 0,
                  }}
                >
                  <div className="flex items-start gap-3 max-w-xl">
                    <Mic className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1.5" />
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-left italic">
                      "{image.caption}"
                    </p>
                  </div>

                  {image.isSpecial && image.phoneSrc && (
                    <div className="flex items-start gap-3 max-w-xl pt-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-left">
                        AI does the work for you. You just approve
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* How it works? */}
          <div className="max-w-2xl mx-auto space-y-6 pt-16">
            <h2 className="text-3xl md:text-4xl font-bold">How it works?</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty px-4">
              JARVIS is the interface layer that gives AI wearables access to real computers, apps, and cloud agents;
              enabling{" "}
              <span
                className="underline decoration-2 underline-offset-4 cursor-pointer relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                atomic
                {showTooltip && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-popover text-popover-foreground border rounded-lg p-4 text-sm text-left shadow-lg z-10">
                    <strong>Atomic</strong> tasks are single, isolated actions an AI can perform immediately (e.g.,
                    "take a photo" or "set a timer"), while <strong>complex</strong> tasks are goal-driven workflows
                    that require reasoning, memory, and coordination across multiple tools and steps (e.g., "check my
                    flight, text the ETA, and book a ride home").
                  </span>
                )}
              </span>{" "}
              and{" "}
              <span
                className="underline decoration-2 underline-offset-4 cursor-pointer relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                complex
                {showTooltip && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-popover text-popover-foreground border rounded-lg p-4 text-sm text-left shadow-lg z-10">
                    <strong>Atomic</strong> tasks are single, isolated actions an AI can perform immediately (e.g.,
                    "take a photo" or "set a timer"), while <strong>complex</strong> tasks are goal-driven workflows
                    that require reasoning, memory, and coordination across multiple tools and steps (e.g., "check my
                    flight, text the ETA, and book a ride home").
                  </span>
                )}
              </span>{" "}
              tasks with persistent memory.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty px-4">
              Speech is the most efficient input mechanism for AI wearables. JARVIS treats speech as the primary
              interface while supporting other inputs, <strong>orchestrating computer-use</strong>,{" "}
              <strong>connected apps</strong>, and <strong>persistent memory</strong> to deliver order-of-magnitude
              gains in everyday efficiency.
            </p>
          </div>

          {/* For Developers */}
          <div className="max-w-2xl mx-auto space-y-6 pt-16">
            <h2 className="text-3xl md:text-4xl font-bold">For Developers</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty px-4">
              We are releasing the API docs soon so you can start integrating Jarvis to your projects.{" "}
              <button
                onClick={scrollToWaitlist}
                className="text-primary underline decoration-2 underline-offset-4 hover:text-primary/80 transition-colors cursor-pointer font-medium"
              >
                Sign up on waitlist
              </button>{" "}
              and mark yourself as developer and we will reach out.
            </p>

            <div className="space-y-6 pt-8">
              {/* Android Example */}
              <div className="text-left space-y-3">
                <h3 className="text-xl font-semibold px-4">Android (Kotlin)</h3>
                <div className="bg-muted/50 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm text-muted-foreground font-mono">
                    <code>{`val jarvis = JarvisClient(
    apiKey = BuildConfig.JARVIS_API_KEY
)

jarvis.startSession(
    input = SpeechInput(
        text = "Reschedule non-urgent meetings and notify my cofounder."
    ),
    signals = ClientSignals(
        device = DeviceType.WATCH,
        location = LocationSignal.LIVE   // optional
    ),
    onEvent = { event ->
        when (event) {
            is JarvisEvent.ApprovalRequired -> showApprovalPrompt(event.request)
            is JarvisEvent.Status -> renderStatus(event.message)
            is JarvisEvent.Completed -> showDone(event.summary)
            is JarvisEvent.Error -> showError(event.userMessage)
        }
    }
)`}</code>
                  </pre>
                </div>
              </div>

              {/* Server Example */}
              <div className="text-left space-y-3">
                <h3 className="text-xl font-semibold px-4">Server (Node.js)</h3>
                <div className="bg-muted/50 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm text-muted-foreground font-mono">
                    <code>{`import { JarvisServer } from "@jarvis/os-server";

const jarvis = new JarvisServer({
  apiKey: process.env.JARVIS_API_KEY,
});

// Typically behind your auth (userId from your session/JWT)
app.post("/jarvis/execute", async (req, res) => {
  const { userId, text, signals } = req.body;
  const run = await jarvis.execute({
    userId,
    input: { type: "speech", text },
    signals, // device, location, time, etc.
    // Server enforces what tools are allowed for this user
    policy: {
      requireApprovalFor: ["payments", "sending_messages", "ordering"],
      memoryScope: "personal",
    },
  });
  res.json({ runId: run.id });
});`}</code>
                  </pre>
                </div>
              </div>

              {/* API Disclaimer */}
              <p className="text-sm text-muted-foreground italic px-4 pt-2">
                Note: API is subject to change during development.
              </p>
            </div>
          </div>

          {/* Contact section */}
          <div className="max-w-2xl mx-auto space-y-6 pt-16 pb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Contact</h2>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-3 px-4">
              <p>
                <strong>Email founder:</strong>{" "}
                <a
                  href="mailto:prakshaljain422@gmail.com"
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  prakshaljain422@gmail.com
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href="https://linkedin.com/in/prakshal-jain-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  linkedin.com/in/prakshal-jain-profile
                </a>
              </p>
              <p>
                <strong>X:</strong>{" "}
                <a
                  href="https://x.com/prakshaljain_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  x.com/prakshaljain_
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border/40 py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/jarvis-logo.png" alt="Jarvis Logo" className="w-6 h-6" />
            <span className="text-sm text-muted-foreground">© 2025 Jarvis. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
