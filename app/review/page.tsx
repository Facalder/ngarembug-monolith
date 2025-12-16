"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RestaurantCard } from "@/components/restaurant-card"
import { Star, Sparkles, Award } from "lucide-react"
import Link from "next/link"

export default function ReviewPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [visitDate, setVisitDate] = useState("December 2025")
  const [companion, setCompanion] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")

  const companions = ["Business", "Couples", "Family", "Friends", "Solo"]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Static Content */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                Tell us, how was your visit?
              </h1>
            </div>

            {/* Restaurant Card - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <RestaurantCard
                name="Cafe Batavia"
                address="Jl. Pintu Besar Utara 14, Kota Jakarta, Indonesia"
                image="/images/image.png"
              />
            </div>

            {/* Badge Card */}
            <div className="hidden lg:block border border-border rounded-lg p-6 bg-card">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Award className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Become a Restaurant Explorer</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your first restaurant review to start earning a badge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="space-y-6">
            {/* Restaurant Card - Shown on mobile only */}
            <div className="lg:hidden">
              <RestaurantCard
                name="Cafe Batavia"
                address="Jl. Pintu Besar Utara 14, Kota Jakarta, Indonesia"
                image="/images/image.png"
              />
            </div>

            <form className="space-y-6">
              {/* Rating */}
              <div className="space-y-3">
                <Label className="text-lg font-medium text-foreground">How would you rate your experience?</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                    >
                      <Star
                        className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-[#00aa6c] text-[#00aa6c]"
                            : "fill-none text-border stroke-[2]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* When did you go */}
              <div className="space-y-3">
                <Label htmlFor="visit-date" className="text-lg font-medium text-foreground">
                  When did you go?
                </Label>
                <Select value={visitDate} onValueChange={setVisitDate}>
                  <SelectTrigger id="visit-date" className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="December 2025">December 2025</SelectItem>
                    <SelectItem value="November 2025">November 2025</SelectItem>
                    <SelectItem value="October 2025">October 2025</SelectItem>
                    <SelectItem value="September 2025">September 2025</SelectItem>
                    <SelectItem value="August 2025">August 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Who did you go with */}
              <div className="space-y-3">
                <Label className="text-lg font-medium text-foreground">Who did you go with?</Label>
                <div className="flex flex-wrap gap-2">
                  {companions.map((comp) => (
                    <button
                      key={comp}
                      type="button"
                      onClick={() => setCompanion(comp)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        companion === comp
                          ? "border-foreground bg-foreground text-background font-medium"
                          : "border-border bg-card text-foreground hover:border-muted-foreground"
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Write your review */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="review-text" className="text-lg font-medium text-foreground">
                    Write your review
                  </Label>
                  <Link href="#" className="text-sm text-foreground hover:underline flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Review tips
                  </Link>
                </div>
                <div className="border border-border rounded-lg overflow-hidden bg-card">
                  <div className="flex gap-2 p-2 border-b border-border bg-muted/30">
                    <button type="button" className="px-3 py-1.5 text-sm rounded hover:bg-muted transition-colors">
                      Location
                    </button>
                    <button type="button" className="px-3 py-1.5 text-sm rounded hover:bg-muted transition-colors">
                      Atmosphere
                    </button>
                    <button type="button" className="px-3 py-1.5 text-sm rounded hover:bg-muted transition-colors">
                      Food
                    </button>
                    <button type="button" className="px-3 py-1.5 text-sm rounded hover:bg-muted transition-colors">
                      Service
                    </button>
                    <button type="button" className="px-3 py-1.5 text-sm rounded hover:bg-muted transition-colors">
                      Value
                    </button>
                    <button type="button" className="px-3 py-1.5 text-sm rounded hover:bg-muted transition-colors">
                      Wait time
                    </button>
                  </div>
                  <div className="p-3">
                    <button
                      type="button"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Help me write
                    </button>
                    <Textarea
                      id="review-text"
                      placeholder="Share your experience..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="min-h-[200px] border-0 resize-none focus-visible:ring-0 p-0"
                    />
                  </div>
                  <div className="px-3 pb-3 flex justify-end">
                    <span className="text-sm text-muted-foreground">{reviewText.length}/100 min characters</span>
                  </div>
                </div>
              </div>

              {/* Review title */}
              <div className="space-y-3">
                <Label htmlFor="review-title" className="text-lg font-medium text-foreground">
                  Give your review a title
                </Label>
                <Input
                  id="review-title"
                  placeholder="Summarize your experience"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="text-base"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 text-lg font-semibold"
                >
                  Submit review
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
