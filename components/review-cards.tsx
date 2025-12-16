import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp } from "lucide-react"

const reviews = [
  {
    id: 1,
    author: "Sarah M.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "December 2024",
    title: "Excellent Middle Eastern Cuisine",
    content:
      "The food here is absolutely amazing! The lamb kebabs were perfectly grilled and seasoned. The hummus was creamy and flavorful. The atmosphere is cozy and authentic. Service was attentive and friendly. Highly recommend for anyone looking for authentic Arabic food in Jakarta.",
    helpful: 24,
    location: "Jakarta, Indonesia",
  },
  {
    id: 2,
    author: "Ahmad R.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "November 2024",
    title: "Authentic Arabic Experience",
    content:
      "As someone from the Middle East, I can say this restaurant does justice to Arabic cuisine. The shawarma is spot on, and the mixed grill platter is generous and delicious. Prices are reasonable for the quality. Will definitely come back!",
    helpful: 18,
    location: "Dubai, UAE",
  },
  {
    id: 3,
    author: "Lisa K.",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "November 2024",
    title: "Great Food, Cozy Atmosphere",
    content:
      "Really enjoyed our dinner here. The falafel was crispy on the outside and soft inside. The fattoush salad was fresh and tangy. Only reason for 4 stars is that it got quite busy and service slowed down a bit. But overall, excellent experience.",
    helpful: 12,
    location: "Singapore",
  },
]

export default function ReviewCards() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Reviews</h2>
        <Button variant="outline" size="sm">
          Filter Reviews
        </Button>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-foreground">{review.author}</h3>
                      <span className="text-xs text-muted-foreground">{review.location}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center pt-4">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  )
}
