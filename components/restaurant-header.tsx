import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Share2, Bookmark } from "lucide-react"
import Link from "next/link"

export default function RestaurantHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                #12 of 2,845 Restaurants in Jakarta
              </Badge>
              <Badge variant="outline">Middle Eastern</Badge>
              <Badge variant="outline">Indonesian</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              D'Arabicah Restaurant Cikini Menteng
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-semibold text-foreground">4.5</span>
                <span className="text-muted-foreground">(1,234 reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">$$-$$$</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Arabic, Middle Eastern</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Link href="/review">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Write a Review</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
