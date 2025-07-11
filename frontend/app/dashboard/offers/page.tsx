import { Calendar, Clock, MapPin, Edit, Trash2, DollarSign, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from "@/components/Sidebar"

const mockOffers = [
  {
    id: 1,
    requestTitle: "Need DSLR Camera",
    requestDate: "2024-01-15",
    requestTime: "10:00 AM",
    requestDuration: "4 hours",
    requestLocation: "New York, Manhattan",
    myItem: "Canon EOS R5 DSLR Camera",
    hourlyRate: 25,
    deposit: 100,
    status: "pending",
    submittedDate: "2024-01-10",
  },
  {
    id: 2,
    requestTitle: "Gaming Console for Weekend",
    requestDate: "2024-01-20",
    requestTime: "6:00 PM",
    requestDuration: "48 hours",
    requestLocation: "Queens, Astoria",
    myItem: "PlayStation 5 Console",
    hourlyRate: 15,
    deposit: 200,
    status: "accepted",
    submittedDate: "2024-01-12",
  },
  {
    id: 3,
    requestTitle: "Power Drill Required",
    requestDate: "2024-01-16",
    requestTime: "2:00 PM",
    requestDuration: "2 hours",
    requestLocation: "Brooklyn, Williamsburg",
    myItem: "DeWalt 20V Power Drill",
    hourlyRate: 10,
    deposit: 50,
    status: "rejected",
    submittedDate: "2024-01-11",
  },
]

export default function MyOffersPage() {
  const pendingOffers = mockOffers.filter((offer) => offer.status === "pending")
  const acceptedOffers = mockOffers.filter((offer) => offer.status === "accepted")
  const rejectedOffers = mockOffers.filter((offer) => offer.status === "rejected")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Offers</h1>
              <p className="text-gray-600 mt-2">Track your lending offers and their status</p>
            </div>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-96">
              <TabsTrigger value="pending">Pending ({pendingOffers.length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({acceptedOffers.length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedOffers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              {pendingOffers.map((offer) => (
                <Card key={offer.id} className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{offer.requestTitle}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {offer.requestDate}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {offer.requestTime} • {offer.requestDuration}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {offer.requestLocation}
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Your Offer</h4>
                        <p className="text-gray-700 mb-3">{offer.myItem}</p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-600">
                              <DollarSign className="h-4 w-4 mr-1" />
                              Hourly Rate:
                            </span>
                            <span className="font-medium">${offer.hourlyRate}/hour</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-600">
                              <Shield className="h-4 w-4 mr-1" />
                              Deposit:
                            </span>
                            <span className="font-medium">${offer.deposit}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end space-y-2">
                        <p className="text-xs text-gray-500">Submitted on {offer.submittedDate}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 rounded-xl bg-transparent">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Offer
                          </Button>
                          <Button variant="destructive" size="sm" className="flex-1 rounded-xl">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-6">
              {acceptedOffers.map((offer) => (
                <Card key={offer.id} className="rounded-2xl shadow-sm border-green-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{offer.requestTitle}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {offer.requestDate}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {offer.requestTime} • {offer.requestDuration}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {offer.requestLocation}
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Your Accepted Offer</h4>
                        <p className="text-gray-700 mb-3">{offer.myItem}</p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-600">
                              <DollarSign className="h-4 w-4 mr-1" />
                              Hourly Rate:
                            </span>
                            <span className="font-medium">${offer.hourlyRate}/hour</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-600">
                              <Shield className="h-4 w-4 mr-1" />
                              Deposit:
                            </span>
                            <span className="font-medium">${offer.deposit}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end space-y-2">
                        <p className="text-xs text-gray-500">Accepted offer</p>
                        <Button className="w-full rounded-xl">Contact Borrower</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-6">
              {rejectedOffers.map((offer) => (
                <Card key={offer.id} className="rounded-2xl shadow-sm opacity-75">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-gray-600">{offer.requestTitle}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {offer.requestDate}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {offer.requestTime} • {offer.requestDuration}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {offer.requestLocation}
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-600 mb-2">Your Rejected Offer</h4>
                        <p className="text-gray-500 mb-3">{offer.myItem}</p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-500">
                              <DollarSign className="h-4 w-4 mr-1" />
                              Hourly Rate:
                            </span>
                            <span className="text-gray-500">${offer.hourlyRate}/hour</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-500">
                              <Shield className="h-4 w-4 mr-1" />
                              Deposit:
                            </span>
                            <span className="text-gray-500">${offer.deposit}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end">
                        <p className="text-xs text-gray-400">Offer was not selected</p>
                      </div>
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
