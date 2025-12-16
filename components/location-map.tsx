import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

export default function LocationMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-square w-full bg-muted rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground px-4">Interactive map view</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Jl. Cikini Raya No.25, Menteng</p>
          <p className="text-sm text-muted-foreground">Jakarta 10330, Indonesia</p>
        </div>
        <Button className="w-full bg-transparent" variant="outline">
          <Navigation className="h-4 w-4 mr-2" />
          Get Directions
        </Button>
      </CardContent>
    </Card>
  )
}
