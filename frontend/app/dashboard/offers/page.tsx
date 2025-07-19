'use client'
import { useEffect, useState } from "react"
import { Calendar, Clock, MapPin, Trash2, DollarSign, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/Sidebar"

interface Offer {
  _id: string
  itemName: string
  hourlyRate: number
  deposit: number
  status: string
  availabilityDate: string
  availabilityTime: string
  notes?: string
  createdAt: string
  location?: string
}

export default function MyOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch all offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/my-offers", {
          credentials: "include",
        })
        if (!response.ok) throw new Error("Failed to fetch offers")
        const data = await response.json()
        setOffers(data)
      } catch (error) {
        console.error("Error fetching offers:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchOffers()
  }, [])

  // Cancel offer with confirmation
  const handleCancel = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this offer?")
    if (!confirmDelete) return

    try {
      const response = await fetch(`http://localhost:5000/api/my/lend-offers/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!response.ok) throw new Error("Failed to delete offer")
      setOffers((prev) => prev.filter((offer) => offer._id !== id))
      alert("Offer deleted successfully.")
    } catch (error) {
      console.error("Error deleting offer:", error)
      alert("Failed to delete offer. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">My Offers</h1>

          {loading ? (
            <p className="text-gray-500">Loading your offers...</p>
          ) : offers.length === 0 ? (
            <p className="text-gray-500">No offers found.</p>
          ) : (
            <div className="space-y-6">
              {offers.map((offer) => (
                <Card key={offer._id} className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{offer.itemName}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" /> {offer.availabilityDate}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" /> {offer.availabilityTime}
                          </span>
                          {offer.location && (
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" /> {offer.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">{offer.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Your Offer</h4>
                        <p className="text-gray-700 mb-3">{offer.notes || "No additional notes"}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-600">
                              <DollarSign className="h-4 w-4 mr-1" /> Hourly Rate:
                            </span>
                            <span className="font-medium">${offer.hourlyRate}/hour</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-600">
                              <Shield className="h-4 w-4 mr-1" /> Deposit:
                            </span>
                            <span className="font-medium">${offer.deposit}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-end space-y-2">
                        <p className="text-xs text-gray-500">
                          Submitted on {new Date(offer.createdAt).toLocaleDateString()}
                        </p>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => handleCancel(offer._id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
