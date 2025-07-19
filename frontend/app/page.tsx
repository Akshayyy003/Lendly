"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Calendar,
  UserCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RequestDetailsModal from "@/components/RequestDetailsModal";
import LendItemModal from "@/components/LendItemModal";



export default function ForumPage() {
  const [user, setUser] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLendModalOpen, setIsLendModalOpen] = useState(false);
  const [lendRequest, setLendRequest] = useState<any>(null);

  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Session fetch failed", error);
      }
    };

    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/requests", {
          credentials: "include", // ✅ include cookies for session
        });
        if (res.ok) {
          const data = await res.json();
          setRequests(data.requests || []);
          setCities(data.cities || []);
          setCategories(data.categories || []);
        } else {
          console.error("Failed to fetch requests");
        }
      } catch (error) {
        console.error("Error fetching requests", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
    fetchRequests();
  }, []);

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleLendItem = (request: any) => {
    setLendRequest(request);
    setIsLendModalOpen(true);
  };


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

            {/* Right Side: Auth-aware */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <UserCircle className="w-6 h-6 text-gray-600" />
                  <span>Welcome, {user.firstName}</span>
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={async () => {
                      await fetch("http://localhost:5000/api/logout", {
                        method: "POST",
                        credentials: "include",
                      });
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" asChild className="rounded-xl bg-transparent">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild className="rounded-xl">
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

            {/* Cities Dropdown */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No cities available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {/* Categories Dropdown */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No categories available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            <Input type="date" placeholder="Date needed" />
          </div>
        </div>

        {/* Request Cards */}
        {loading ? (
          <p className="text-center text-gray-600">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-600">No requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <Card key={request._id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.itemDescription} ({request.createdBy})
                    </h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Open
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {request.dateNeeded}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {request.timeNeeded} • {request.duration}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {request.city}, {request.area}
                  </div>

                  {request.notes && (
                    <p className="text-sm text-gray-700 line-clamp-2">{request.notes}</p>
                  )}

                  <Badge variant="outline">{request.category}</Badge>
                </CardContent>

                <CardFooter className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleViewDetails(request)}
                  >
                    💬 View Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleLendItem(request)}
                  >
                    🤝 Lend Item
                  </Button>

                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedRequest && (
        <RequestDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          request={{
            id: selectedRequest._id,
            title: selectedRequest.itemDescription,
            date: selectedRequest.dateNeeded,
            time: selectedRequest.timeNeeded,
            duration: selectedRequest.duration,
            location: `${selectedRequest.city}, ${selectedRequest.area}`,
            description: selectedRequest.notes || "No description provided.",
            category: selectedRequest.category,
            status: "Open",
            createdBy: selectedRequest.createdBy
          }}
          onLendItem={() => handleLendItem(selectedRequest)}
        />
      )}

      {/* ✅ Lend Item Modal */}
      {lendRequest && (
        <LendItemModal
          isOpen={isLendModalOpen}
          onClose={() => setIsLendModalOpen(false)}
          requestTitle={lendRequest?.itemDescription || ""}
          requestId={lendRequest?._id}
          lenderId={user?.id} // Logged-in user
          borrowerId={lendRequest?.createdById} // Request creator
        />
      )}




    </div>
  );
}
