import { Calendar, Clock, MapPin, Eye, Trash2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from "@/components/Sidebar"
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
    status: "open",
    offers: 3,
    category: "Camera",
  },
  {
    id: 2,
    title: "Power Drill Required",
    date: "2024-01-16",
    time: "2:00 PM",
    duration: "2 hours",
    location: "Brooklyn, Williamsburg",
    description: "Need a power drill for some home renovation work.",
    status: "fulfilled",
    offers: 1,
    category: "Tools",
  },
  {
    id: 3,
    title: "Gaming Console for Weekend",
    date: "2024-01-20",
    time: "6:00 PM",
    duration: "48 hours",
    location: "Queens, Astoria",
    description: "Looking to rent a PlayStation 5 for the weekend.",
    status: "open",
    offers: 2,
    category: "Electronics",
  },
]

export default function MyRequestsPage() {
  const activeRequests = mockRequests.filter((req) => req.status === "open")
  const fulfilledRequests = mockRequests.filter((req) => req.status === "fulfilled")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Requests</h1>
              <p className="text-gray-600 mt-2">Manage your borrow requests and view offers</p>
            </div>
            <Button asChild className="rounded-xl">
              <Link href="/post-request">+ New Request</Link>
            </Button>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-96">
              <TabsTrigger value="active">Active ({activeRequests.length})</TabsTrigger>
              <TabsTrigger value="fulfilled">Fulfilled ({fulfilledRequests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              {activeRequests.map((request) => (
                <Card key={request.id} className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{request.title}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {request.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {request.time} • {request.duration}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {request.status}
                        </Badge>
                        <Badge variant="outline">{request.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-700 mb-4">{request.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>
                          {request.offers} offer{request.offers !== 1 ? "s" : ""} received
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          <Link href={`/view-offers/${request.id}`}>View Offers</Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="rounded-xl">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="fulfilled" className="space-y-6">
              {fulfilledRequests.map((request) => (
                <Card key={request.id} className="rounded-2xl shadow-sm opacity-75">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{request.title}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {request.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {request.time} • {request.duration}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">{request.status}</Badge>
                        <Badge variant="outline">{request.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-700 mb-4">{request.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Completed successfully</span>
                      </div>

                      <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
