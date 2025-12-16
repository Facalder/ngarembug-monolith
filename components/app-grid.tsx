import { Card } from "@/components/ui/card"
import Image from "next/image"

const apps = [
  { id: 1, name: "Banking App", category: "Finance", color: "bg-blue-500" },
  { id: 2, name: "Shopping", category: "E-commerce", color: "bg-purple-500" },
  { id: 3, name: "Fitness Pro", category: "Health", color: "bg-green-500" },
  { id: 4, name: "Social Hub", category: "Social", color: "bg-pink-500" },
  { id: 5, name: "Task Manager", category: "Productivity", color: "bg-orange-500" },
  { id: 6, name: "Food Delivery", category: "Food", color: "bg-red-500" },
  { id: 7, name: "Music Stream", category: "Entertainment", color: "bg-indigo-500" },
  { id: 8, name: "Travel Guide", category: "Travel", color: "bg-teal-500" },
  { id: 9, name: "Crypto Wallet", category: "Finance", color: "bg-yellow-500" },
  { id: 10, name: "Dating App", category: "Social", color: "bg-rose-500" },
  { id: 11, name: "News Reader", category: "News", color: "bg-gray-500" },
  { id: 12, name: "Photo Editor", category: "Creative", color: "bg-violet-500" },
]

export function AppGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {apps.map((app) => (
        <Card
          key={app.id}
          className="group overflow-hidden border-0 bg-muted/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
        >
          <div className="aspect-9/16 relative">
            <div className={`absolute inset-0 ${app.color} opacity-10`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                <Image
                  src={`/placeholder.svg?height=800&width=400&query=${app.name} mobile app screenshot`}
                  alt={app.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white font-medium text-sm">{app.name}</h3>
              <p className="text-white/80 text-xs">{app.category}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
