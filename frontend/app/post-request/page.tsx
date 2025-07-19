"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function PostRequestPage() {
  const [itemDescription, setItemDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dateNeeded, setDateNeeded] = useState("");
  const [timeNeeded, setTimeNeeded] = useState("");
  const [duration, setDuration] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      itemDescription,
      category,
      dateNeeded,
      timeNeeded,
      duration,
      city,
      area,
      notes,
    };

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for session
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Request posted successfully!");
        setItemDescription("");
        setCategory("");
        setDateNeeded("");
        setTimeNeeded("");
        setDuration("");
        setCity("");
        setArea("");
        setNotes("");
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Browse</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-blue-600">Lendly</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Post a Borrow Request</CardTitle>
            <p className="text-gray-600 text-center">Tell the community what you need to borrow</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Item Description */}
              <div className="space-y-2">
                <Label htmlFor="item-description" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>What do you need?</span>
                </Label>
                <Input
                  id="item-description"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="e.g., DSLR Camera, Power Drill, Gaming Console"
                  className="rounded-xl"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select onValueChange={(val) => setCategory(val)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camera">Camera & Photography</SelectItem>
                    <SelectItem value="tools">Tools & Equipment</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="sports">Sports & Recreation</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-needed" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Date Needed</span>
                  </Label>
                  <Input
                    id="date-needed"
                    type="date"
                    value={dateNeeded}
                    onChange={(e) => setDateNeeded(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-needed" className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Time Needed</span>
                  </Label>
                  <Input
                    id="time-needed"
                    type="time"
                    value={timeNeeded}
                    onChange={(e) => setTimeNeeded(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select onValueChange={(val) => setDuration(val)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="How long do you need it?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-hour">1 hour</SelectItem>
                    <SelectItem value="2-hours">2 hours</SelectItem>
                    <SelectItem value="4-hours">4 hours</SelectItem>
                    <SelectItem value="8-hours">8 hours (full day)</SelectItem>
                    <SelectItem value="24-hours">24 hours</SelectItem>
                    <SelectItem value="48-hours">48 hours (weekend)</SelectItem>
                    <SelectItem value="week">1 week</SelectItem>
                    <SelectItem value="custom">Custom duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="area" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>City</span>
                  </Label>
                  <Input
                    id="area"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Delhi , Mumbai, Bangalore"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Area/Neighborhood</span>
                  </Label>
                  <Input
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g., Williamsburg, Astoria"
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific requirements, preferred pickup location, or additional details..."
                  className="rounded-xl min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full rounded-xl h-12 text-lg">
                Post Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
