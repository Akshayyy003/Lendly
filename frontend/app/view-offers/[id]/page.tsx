"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Phone, Mail, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

// ---------------- Types ----------------
interface Lender {
  firstName?: string;
  lastName?: string;
}

interface Offer {
  _id: string;
  itemName: string;
  notes?: string;
  hourlyRate: number;
  deposit: number;
  phone: string;
  email: string;
  lenderId?: Lender;
}
// ---------------------------------------

export default function ViewOffersPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/requests/${id}/offers`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setOffers(data.offers || []);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [id]);

  const handleReject = async () => {
    if (!selectedOfferId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/lend-offers/${selectedOfferId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setOffers((prev) => prev.filter((offer) => offer._id !== selectedOfferId));
        setConfirmOpen(false);
        toast({ title: "Offer Rejected", description: "The offer has been removed." });
      } else {
        toast({ title: "Error", description: "Failed to reject offer", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error rejecting offer:", error);
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }
  };

  const handleAccept = async (offerId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/lend-offers/${offerId}/accept`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setOffers((prev) => prev.filter((offer) => offer._id !== offerId));
        toast({ title: "Offer Accepted", description: "The offer has been accepted and request removed." });
      } else {
        toast({ title: "Error", description: "Failed to accept offer", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error accepting offer:", error);
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------- HEADER ---------- */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Requests</span>
            </Link>
            <h1 className="text-2xl font-bold text-blue-600">Lendly</h1>
          </div>
        </div>
      </header>

      {/* ---------- MAIN ---------- */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Offers Received ({offers.length})</h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {offers.length} Active Offers
          </Badge>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading offers...</p>
        ) : offers.length === 0 ? (
          <p className="text-gray-600">No offers yet.</p>
        ) : (
          <div className="space-y-6">
            {offers.map((offer) => (
              <Card key={offer._id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{offer.itemName}</h3>
                      <p className="text-sm text-gray-600 mt-2">{offer.notes || "No details provided."}</p>
                    </div>

                    {/* Middle Section */}
                    <div className="space-y-4">
                      <h4 className="font-medium">
                        {offer.lenderId?.firstName} {offer.lenderId?.lastName}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 mr-1" /> ${offer.hourlyRate}/hour
                        </div>
                        <div className="flex items-center text-sm">
                          <Shield className="h-4 w-4 mr-1" /> ${offer.deposit} deposit
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 inline" /> {offer.phone}
                        <br />
                        <Mail className="h-4 w-4 mr-2 inline" /> {offer.email}
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col justify-center space-y-3">
                      <Button className="w-full rounded-xl" onClick={() => handleAccept(offer._id)}>
                        Accept Offer
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full rounded-xl"
                        onClick={() => {
                          setSelectedOfferId(offer._id);
                          setConfirmOpen(true);
                        }}
                      >
                        Reject Offer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* ---------- CONFIRM MODAL ---------- */}
      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Rejection</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to reject this offer?</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
