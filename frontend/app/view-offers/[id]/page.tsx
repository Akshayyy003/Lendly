import { ArrowLeft, Star, Phone, Mail, MapPin, DollarSign, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const mockOffers = [
  {
    id: 1,
    lenderName: "Sarah Johnson",
    lenderRating: 4.8,
    itemName: "Canon EOS R5 DSLR Camera",
    itemImage: "/placeholder.svg?height=200&width=200",
    hourlyRate: 25,
    deposit: 100,
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    availability: "Jan 15, 2024 at 10:00 AM",
    notes: "Professional camera in excellent condition. Includes 24-70mm lens and extra battery.",
    status: "pending",
  },
  {
    id: 2,
    lenderName: "Mike Chen",
    lenderRating: 4.9,
    itemName: "Nikon D850 DSLR Camera",
    itemImage: "/placeholder.svg?height=200&width=200",
    hourlyRate: 30,
    deposit: 150,
    phone: "(555) 987-6543",
    email: "mike.chen@email.com",
    availability: "Jan 15, 2024 at 9:00 AM",
    notes: "High-end camera perfect for professional shoots. Can include tripod if needed.",
    status: "pending",
  },
  {
    id: 3,
    lenderName: "Emma Davis",
    lenderRating: 4.7,
    itemName: "Sony A7 III Mirrorless Camera",
    itemImage: "/placeholder.svg?height=200&width=200",
    hourlyRate: 20,
    deposit: 80,
    phone: "(555) 456-7890",
    email: "emma.davis@email.com",
    availability: "Jan 15, 2024 at 11:00 AM",
    notes: "Compact and versatile camera. Great for both photos and video.",
    status: "pending",
  },
]

export default function ViewOffersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Requests</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-blue-600">Lendly</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Request Summary */}
        <Card className="rounded-2xl shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Your Request: "Need DSLR Camera"</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Jan 15, 2024 at 10:00 AM • 4 hours
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                New York, Manhattan
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Offers Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Offers Received ({mockOffers.length})</h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {mockOffers.length} Active Offers
          </Badge>
        </div>

        {/* Offers List */}
        <div className="space-y-6">
          {mockOffers.map((offer) => (
            <Card key={offer.id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Item Image and Details */}
                  <div className="space-y-4">
                    <img
                      src={offer.itemImage || "/placeholder.svg"}
                      alt={offer.itemName}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{offer.itemName}</h3>
                      <p className="text-sm text-gray-600 mt-2">{offer.notes}</p>
                    </div>
                  </div>

                  {/* Lender Info and Pricing */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {offer.lenderName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{offer.lenderName}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{offer.lenderRating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Hourly Rate:
                        </span>
                        <span className="font-semibold">${offer.hourlyRate}/hour</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm">
                          <Shield className="h-4 w-4 mr-1" />
                          Deposit:
                        </span>
                        <span className="font-semibold">${offer.deposit}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          Available:
                        </span>
                        <span className="text-sm">{offer.availability}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {offer.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {offer.email}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col justify-center space-y-3">
                    <Button className="w-full rounded-xl">Accept Offer</Button>
                    <Button variant="outline" className="w-full rounded-xl bg-transparent">
                      Message Lender
                    </Button>
                    <Button variant="destructive" className="w-full rounded-xl">
                      Reject Offer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
