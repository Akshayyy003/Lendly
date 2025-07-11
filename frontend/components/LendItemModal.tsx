"use client"

import type React from "react"

import { useState } from "react"
import { Upload, DollarSign, Shield, Phone, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LendItemModalProps {
  isOpen: boolean
  onClose: () => void
  requestTitle: string
}

export default function LendItemModal({ isOpen, onClose, requestTitle }: LendItemModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Lend Item for: "{requestTitle}"</DialogTitle>
        </DialogHeader>

        <form className="space-y-6">
          {/* Item Details */}
          <div className="space-y-2">
            <Label htmlFor="item-name">What item are you lending?</Label>
            <Input id="item-name" placeholder="e.g., Canon EOS R5 DSLR Camera" className="rounded-xl" />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Item Photo</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Item preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <Button type="button" variant="outline" onClick={() => setImagePreview(null)}>
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourly-rate" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Hourly Rate ($)</span>
              </Label>
              <Input id="hourly-rate" type="number" placeholder="25.00" className="rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Security Deposit ($ - Optional)</span>
              </Label>
              <Input id="deposit" type="number" placeholder="100.00" className="rounded-xl" />
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Confirm Availability</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="date" className="rounded-xl" />
              <Input type="time" className="rounded-xl" />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Contact Information</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number</span>
                </Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                <Input id="email" type="email" placeholder="your.email@example.com" className="rounded-xl" />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="lender-notes">Additional Notes (Optional)</Label>
            <Textarea
              id="lender-notes"
              placeholder="Any special instructions, pickup location details, or terms..."
              className="rounded-xl min-h-[80px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 rounded-xl">
              Submit Offer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
