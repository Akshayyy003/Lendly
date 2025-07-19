"use client"

import type React from "react"

import { useState } from "react"
import { Upload, DollarSign, Shield, Phone, Mail, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LendItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestTitle: string;
  requestId: string;
  lenderId: string;
  borrowerId: string;
}

export default function LendItemModal({
  isOpen,
  onClose,
  requestTitle,
  requestId,
  lenderId,
  borrowerId,
}: LendItemModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    itemName: "",
    hourlyRate: "",
    deposit: "",
    phone: "",
    email: "",
    availabilityDate: "",
    availabilityTime: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:5000/api/lend-offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        lenderId,
        borrowerId,
        requestId,
        itemName: formData.itemName,
        hourlyRate: formData.hourlyRate,
        deposit: formData.deposit,
        phone: formData.phone,
        email: formData.email,
        availabilityDate: formData.availabilityDate,
        availabilityTime: formData.availabilityTime,
        notes: formData.notes,
      }),
    });

    if (response.ok) {
      setIsSubmitted(true);
    } else {
      console.error("Failed to send lending offer:", await response.text());
      console.error("Failed to send lending offer");
    }
  } catch (error) {
    console.error("Error submitting offer:", error);
  } finally {
    setIsSubmitting(false);

    // Auto close after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        itemName: "",
        hourlyRate: "",
        deposit: "",
        phone: "",
        email: "",
        availabilityDate: "",
        availabilityTime: "",
        notes: "",
      });
    }, 3000);
  }
};



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md rounded-2xl">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Offer Sent Successfully!</h3>
            <p className="text-gray-600 mb-4">
              Your lending offer has been sent to the borrower. They will contact you if they accept your offer.
            </p>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Next steps:</strong> Wait for the borrower to review your offer. You'll be notified via email or
                phone if they're interested.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Send Lending Offer</DialogTitle>
          <p className="text-gray-600">For request: "{requestTitle}"</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Details */}
          <div className="space-y-2">
            <Label htmlFor="itemName">What item are you lending? *</Label>
            <Input
              id="itemName"
              name="itemName"
              placeholder="e.g., Canon EOS R5 DSLR Camera"
              value={formData.itemName}
              onChange={handleInputChange}
              className="rounded-xl"
              required
            />
          </div>


          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Hourly Rate ($) *</span>
              </Label>
              <Input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                step="0.01"
                placeholder="25.00"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                className="rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Security Deposit ($) *</span>
              </Label>
              <Input
                id="deposit"
                name="deposit"
                type="number"
                step="0.01"
                placeholder="100.00"
                value={formData.deposit}
                onChange={handleInputChange}
                className="rounded-xl"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Contact Information *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="rounded-xl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Confirm Availability *</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="availabilityDate"
                type="date"
                value={formData.availabilityDate}
                onChange={handleInputChange}
                className="rounded-xl"
                required
              />
              <Input
                name="availabilityTime"
                type="time"
                value={formData.availabilityTime}
                onChange={handleInputChange}
                className="rounded-xl"
                required
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any special instructions, pickup location details, or terms..."
              value={formData.notes}
              onChange={handleInputChange}
              className="rounded-xl min-h-[80px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? "Sending Offer..." : "Send Offer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
