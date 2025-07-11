import { Search, Filter, MapPin, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const mockRequests = [
  {
    id: 1,
    title: "Need DSLR Camera",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "4 hours",
    location: "New York, Manhattan",
    description: "Looking for a professional DSLR camera for a photoshoot event.",
    category: "Camera",
    status: "open",
  },
  {
    id: 2,
    title: "Power Drill Required",
    date: "2024-01-16",
    time: "2:00 PM",
    duration: "2 hours",
    location: "Brooklyn, Williamsburg",
    description: "Need a power drill for some home renovation work.",
    category: "Tools",
    status: "open",
  },
  {
    id: 3,
    title: "Gaming Console for Weekend",
    date: "2024-01-20",
    time: "6:00 PM",
    duration: "48 hours",
    location: "Queens, Astoria",
    description: "Looking to rent a PlayStation 5 for the weekend.",
    category: "Electronics",
    status: "open",
  },
]

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">Lendly</h1>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-900 font-medium">
                  Browse Requests
                </Link>
                <Link href="/post-request" className="text-gray-600 hover:text-gray-900">
                  Post Request
                </Link>
                <Link href="/dashboard/requests" className="text-gray-600 hover:text-gray-900">
                  My Requests
                </Link>
                <Link href="/dashboard/offers" className="text-gray-600 hover:text-gray-900">
                  My Offers
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild className="rounded-xl bg-transparent">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild className="rounded-xl">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Filter Requests</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search requests..." className="pl-10" />
            </div>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="brooklyn">Brooklyn</SelectItem>
                <SelectItem value="queens">Queens</SelectItem>
                <SelectItem value="manhattan">Manhattan</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="camera">Camera</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>

            <Input type="date" placeholder="Date needed" />
          </div>
        </div>

        {/* Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRequests.map((request) => (
            <Card key={request.id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {request.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {request.date}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {request.time} • {request.duration}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {request.location}
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">{request.description}</p>

                <Badge variant="outline">{request.category}</Badge>
              </CardContent>

              <CardFooter className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  💬 View Details
                </Button>
                <Button size="sm" className="flex-1">
                  🤝 Lend Item
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
