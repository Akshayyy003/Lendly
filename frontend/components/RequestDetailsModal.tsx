"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, User, FileText, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    id: string;
    title: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    description: string;
    category: string;
    status: string;
    createdBy?: string; // email or userId of poster
  };
  onLendItem: () => void;
}

export default function RequestDetailsModal({ isOpen, onClose, request, onLendItem }: RequestDetailsModalProps) {
  const [postedBy, setPostedBy] = useState<string>("Loading...");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {request.title}
              </DialogTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {request.status}
                </Badge>
                <Badge variant="outline">
                  <Tag className="h-3 w-3 mr-1" />
                  {request.category}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Date Needed</p>
                  <p className="text-sm text-gray-600">{request.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Time & Duration</p>
                  <p className="text-sm text-gray-600">
                    {request.time} • {request.duration}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-600">{request.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Posted by</p>
                  <p className="text-sm text-gray-600">{request.createdBy}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed">{request.description}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">Additional Information</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Item should be returned in the same condition</li>
              <li>• Pickup location: {request.location}</li>
              <li>• Contact borrower for specific requirements</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl bg-transparent">
              Close
            </Button>
            <Button onClick={onLendItem} className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700">
              🤝 Lend Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
