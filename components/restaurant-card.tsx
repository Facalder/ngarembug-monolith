import Image from "next/image"
import { Card } from "@/components/ui/card"

interface RestaurantCardProps {
  name: string
  address: string
  image: string
}

export function RestaurantCard({ name, address, image }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] relative">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{address}</p>
      </div>
    </Card>
  )
}
