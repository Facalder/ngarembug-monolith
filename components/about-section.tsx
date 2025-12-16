import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, Utensils, MapPin, Phone, Globe } from "lucide-react"

const details = [
  { icon: Utensils, label: "Cuisines", value: "Middle Eastern, Arabic, Indonesian, Halal" },
  { icon: DollarSign, label: "Price Range", value: "$$-$$$" },
  { icon: MapPin, label: "Location", value: "Jl. Cikini Raya No.25, Menteng, Jakarta 10330" },
  { icon: Phone, label: "Phone", value: "+62 21 3190 3456" },
  { icon: Globe, label: "Website", value: "www.darabicah.com" },
]

const hours = [
  { day: "Monday - Thursday", time: "11:00 AM - 10:00 PM" },
  { day: "Friday - Saturday", time: "11:00 AM - 11:00 PM" },
  { day: "Sunday", time: "11:00 AM - 10:00 PM" },
]

export default function AboutSection() {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">About</h2>
          <p className="text-muted-foreground leading-relaxed">
            D'Arabicah Restaurant brings authentic Middle Eastern and Arabic flavors to the heart of Jakarta. Our menu
            features traditional dishes prepared with the finest ingredients and time-honored recipes passed down
            through generations. Experience the warm hospitality and rich culinary traditions of the Middle East in an
            elegant, modern setting.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Hours
          </h3>
          <div className="space-y-2 pl-7">
            {hours.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-foreground">{item.day}</span>
                <span className="text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {details.map((detail, index) => {
            const Icon = detail.icon
            return (
              <div key={index} className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{detail.label}</p>
                  <p className="text-sm text-muted-foreground break-words">{detail.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold text-foreground mb-3">Features</h3>
          <div className="flex flex-wrap gap-2">
            {["Outdoor Seating", "WiFi", "Parking Available", "Reservations", "Halal"].map((feature) => (
              <Badge key={feature} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
