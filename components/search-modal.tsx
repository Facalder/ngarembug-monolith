// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Search, X, Smartphone, Monitor } from "lucide-react"

// const trendingApps = [
//   { name: "Uber", bg: "bg-black", text: "text-white" },
//   { name: "Monzo", bg: "bg-gradient-to-br from-blue-500 to-purple-600", text: "text-white" },
//   { name: "Yubo", bg: "bg-black", text: "text-white" },
//   { name: "Duolingo", bg: "bg-green-500", text: "text-white" },
//   { name: "Spotify", bg: "bg-green-600", text: "text-white" },
//   { name: "Robinhood", bg: "bg-green-400", text: "text-black" },
//   { name: "Tinder", bg: "bg-pink-500", text: "text-white" },
// ]

// const quickFilters = ["Login", "News", "Signup", "Medium", "Onboarding", "The New York Times"]

// const categories = [
//   { name: "Trending", icon: "📈" },
//   { name: "Categories", icon: "📁" },
//   { name: "Screens", icon: "📱" },
//   { name: "UI Elements", icon: "⚡" },
//   { name: "Flows", icon: "🔄" },
// ]

// const screenPreviews = [
//   { title: "Signup", image: "/placeholder.svg?height=200&width=150" },
//   { title: "Login", image: "/placeholder.svg?height=200&width=150" },
//   { title: "Home", image: "/placeholder.svg?height=200&width=150" },
//   { title: "Checkout", image: "/placeholder.svg?height=200&width=150" },
//   { title: "Dashboard", image: "/placeholder.svg?height=200&width=150" },
//   { title: "Search", image: "/placeholder.svg?height=200&width=150" },
//   { title: "Filter & Sort", image: "/placeholder.svg?height=200&width=150" },
// ]

// const searchResults = [
//   {
//     name: "Kit",
//     description: "Pocket money app & card",
//     icon: "🏦",
//     bg: "bg-white",
//     color: "text-black",
//   },
//   {
//     name: "Kino",
//     description: "Grade log movies with LUTs",
//     icon: "🎬",
//     bg: "bg-red-500",
//     color: "text-white",
//   },
//   {
//     name: "KOHO",
//     description: "Cash back, spending & savings",
//     icon: "💳",
//     bg: "bg-gradient-to-br from-pink-500 to-blue-500",
//     color: "text-white",
//   },
//   {
//     name: "Klima",
//     description: "Offset your carbon footprint",
//     icon: "🌿",
//     bg: "bg-green-500",
//     color: "text-white",
//   },
//   {
//     name: "KAYAK",
//     description: "Plan vacations & book trips",
//     icon: "✈️",
//     bg: "bg-orange-500",
//     color: "text-white",
//   },
// ]

// const otherResults = [
//   {
//     name: "Julienne",
//     description: "A smarter cookbook",
//     icon: "📖",
//     bg: "bg-amber-100",
//     color: "text-black",
//   },
//   {
//     name: "ZIGZAG",
//     description: "Fashion, beauty, and lifestyle",
//     icon: "👗",
//     bg: "bg-pink-500",
//     color: "text-white",
//   },
// ]

// interface SearchModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export function SearchModal({ isOpen, onClose }: SearchModalProps) {
//   const [activeDevice, setActiveDevice] = useState<"mobile" | "desktop">("mobile")
//   const [activeCategory, setActiveCategory] = useState("Screens")
//   const [searchValue, setSearchValue] = useState("")
//   const [isFocused, setIsFocused] = useState(false)
//   const [selectedApp, setSelectedApp] = useState(searchResults[2]) // Default to KOHO

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onClose()
//       }
//     }

//     if (isOpen) {
//       document.addEventListener("keydown", handleKeyDown)
//       document.body.style.overflow = "hidden"
//     }

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown)
//       document.body.style.overflow = "unset"
//     }
//   }, [isOpen, onClose])

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/80 backdrop-blur-sm">
//       <div className="relative w-full max-w-4xl mx-4 bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
//         {/* Search Header */}
//         <div className="p-6 border-b border-zinc-800">
//           <div className="flex items-center gap-3">
//             <Search className="h-5 w-5 text-zinc-500" />
//             <input
//               type="text"
//               placeholder="iOS Apps, Screens, UI Elements, Flows or Keywords..."
//               className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-base"
//               autoFocus
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setTimeout(() => setIsFocused(false), 200)}
//             />
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={activeDevice === "mobile" ? "bg-zinc-800" : ""}
//                 onClick={() => setActiveDevice("mobile")}
//               >
//                 <Smartphone className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={activeDevice === "desktop" ? "bg-zinc-800" : ""}
//                 onClick={() => setActiveDevice("desktop")}
//               >
//                 <Monitor className="h-4 w-4" />
//               </Button>
//             </div>
//             <Button variant="ghost" size="icon" onClick={onClose}>
//               <X className="h-5 w-5" />
//             </Button>
//           </div>

//           {!isFocused && (
//             <div className="flex items-center gap-2 mt-4 flex-wrap">
//               {quickFilters.map((filter) => (
//                 <button
//                   key={filter}
//                   className="px-3 py-1.5 text-sm rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Content Area */}
//         <div className="flex max-h-[60vh]">
//           {isFocused || searchValue ? (
//             <>
//               {/* Search Results */}
//               <div className="flex-1 p-6 overflow-y-auto">
//                 <div className="space-y-2">
//                   {searchResults.map((app) => (
//                     <button
//                       key={app.name}
//                       onClick={() => setSelectedApp(app)}
//                       className={`w-full flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800 transition-colors ${
//                         selectedApp.name === app.name ? "bg-zinc-800" : ""
//                       }`}
//                     >
//                       <div
//                         className={`w-12 h-12 rounded-xl ${app.bg} ${app.color} flex items-center justify-center text-2xl flex-shrink-0`}
//                       >
//                         {app.icon}
//                       </div>
//                       <div className="text-left">
//                         <p className="text-white font-medium">{app.name}</p>
//                         <p className="text-sm text-zinc-400">{app.description}</p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="mt-6">
//                   <h3 className="text-sm text-zinc-500 mb-3">Other</h3>
//                   <div className="space-y-2">
//                     {otherResults.map((app) => (
//                       <button
//                         key={app.name}
//                         onClick={() => setSelectedApp(app)}
//                         className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800 transition-colors"
//                       >
//                         <div
//                           className={`w-12 h-12 rounded-xl ${app.bg} ${app.color} flex items-center justify-center text-2xl flex-shrink-0`}
//                         >
//                           {app.icon}
//                         </div>
//                         <div className="text-left">
//                           <p className="text-white font-medium">{app.name}</p>
//                           <p className="text-sm text-zinc-400">{app.description}</p>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Preview Panel */}
//               <div className="w-80 border-l border-zinc-800 bg-zinc-950 p-6">
//                 <div className="space-y-4">
//                   <div className="aspect-[9/16] bg-zinc-800 rounded-2xl overflow-hidden">
//                     <img
//                       src="/placeholder.svg?height=600&width=300"
//                       alt={selectedApp.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="text-center">
//                     <p className="text-sm text-zinc-400">{selectedApp.description}</p>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Sidebar Navigation */}
//               <div className="w-48 border-r border-zinc-800 p-4 space-y-1 overflow-y-auto">
//                 {categories.map((category) => (
//                   <button
//                     key={category.name}
//                     onClick={() => setActiveCategory(category.name)}
//                     className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
//                       activeCategory === category.name
//                         ? "bg-zinc-800 text-white"
//                         : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
//                     }`}
//                   >
//                     <span>{category.icon}</span>
//                     <span>{category.name}</span>
//                   </button>
//                 ))}
//               </div>

//               {/* Main Content */}
//               <div className="flex-1 p-6 overflow-y-auto">
//                 {/* Trending Apps */}
//                 <div className="mb-8">
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="text-sm text-zinc-400">📈 Trending</span>
//                   </div>
//                   <div className="flex items-center gap-3 flex-wrap">
//                     {trendingApps.map((app) => (
//                       <button
//                         key={app.name}
//                         className={`w-12 h-12 rounded-xl ${app.bg} ${app.text} flex items-center justify-center text-lg font-bold hover:scale-110 transition-transform`}
//                       >
//                         {app.name.charAt(0)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Screens Section */}
//                 <div>
//                   <h3 className="text-sm text-zinc-400 mb-4">Screens</h3>
//                   <div className="grid grid-cols-3 gap-4">
//                     {screenPreviews.slice(0, 6).map((screen) => (
//                       <button
//                         key={screen.title}
//                         className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-800 hover:ring-2 ring-zinc-600 transition-all"
//                       >
//                         <img
//                           src={screen.image || "/placeholder.svg"}
//                           alt={screen.title}
//                           className="w-full h-full object-cover"
//                         />
//                         <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
//                           <p className="text-sm font-medium text-white">{screen.title}</p>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* UI Elements */}
//                 <div className="mt-8">
//                   <h3 className="text-sm text-zinc-400 mb-4">UI Elements</h3>
//                   <div className="grid grid-cols-4 gap-3">
//                     {["Buttons", "Cards", "Forms", "Navigation"].map((element) => (
//                       <button
//                         key={element}
//                         className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm text-white transition-colors"
//                       >
//                         {element}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
