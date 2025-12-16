import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

const ratingDistribution = [
  { stars: 5, count: 812, percentage: 66 },
  { stars: 4, count: 287, percentage: 23 },
  { stars: 3, count: 98, percentage: 8 },
  { stars: 2, count: 25, percentage: 2 },
  { stars: 1, count: 12, percentage: 1 },
]

export default function RatingSummary() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Ratings and reviews</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-6xl font-bold text-foreground mb-2">4.5</div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">1,234 reviews</p>
          </div>
          <div className="space-y-3">
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground w-12">{rating.stars} star</span>
                <Progress value={rating.percentage} className="flex-1" />
                <span className="text-sm text-muted-foreground w-12 text-right">{rating.count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
