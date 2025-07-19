"use client";
import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Eye, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/my-requests", {
          credentials: "include",
        });
        console.log("Response status:", res);
        if (res.ok) {
          const data = await res.json();
          setRequests(data.requests || []);
        }
      } catch (error) {
        console.error("Error fetching my requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  const activeRequests = requests.filter((req) => req.status === "open");
  const fulfilledRequests = requests.filter((req) => req.status === "fulfilled");

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

          {loading ? (
            <p className="text-center text-gray-600">Loading your requests...</p>
          ) : (
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:w-96">
                <TabsTrigger value="active">Active ({activeRequests.length})</TabsTrigger>
                <TabsTrigger value="fulfilled">Fulfilled ({fulfilledRequests.length})</TabsTrigger>
              </TabsList>

              {/* Active Requests */}
              <TabsContent value="active" className="space-y-6">
                {activeRequests.length > 0 ? (
                  activeRequests.map((request) => (
                    <Card key={request._id} className="rounded-2xl shadow-sm">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{request.itemDescription}</CardTitle>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {request.dateNeeded}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {request.timeNeeded} • {request.duration}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {request.city}, {request.area}
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
                        <p className="text-gray-700 mb-4">{request.notes || "No description provided."}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>Offers received</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
                              <Eye className="h-4 w-4 mr-2" />
                              <Link href={`/view-offers/${request._id}`}>View Offers</Link>
                            </Button>
                            <Button variant="destructive" size="sm" className="rounded-xl">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-600">No active requests found.</p>
                )}
              </TabsContent>

              {/* Fulfilled Requests */}
              <TabsContent value="fulfilled" className="space-y-6">
                {fulfilledRequests.length > 0 ? (
                  fulfilledRequests.map((request) => (
                    <Card key={request._id} className="rounded-2xl shadow-sm opacity-75">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{request.itemDescription}</CardTitle>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {request.dateNeeded}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {request.timeNeeded} • {request.duration}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {request.city}, {request.area}
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
                        <p className="text-gray-700 mb-4">{request.notes || "No description provided."}</p>
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
                  ))
                ) : (
                  <p className="text-gray-600">No fulfilled requests.</p>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}
