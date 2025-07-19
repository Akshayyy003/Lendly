"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { State, City } from "country-state-city";



export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
    state: "",
  })

  useEffect(() => {
    const stateList = State.getStatesOfCountry("IN");
    setStates(stateList);
  }, []);


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setSelectedState(data.region_code);
        console.log("Detected state:", data.region_code);
        setFormData((prev) => ({ ...prev, state: data.region }));
      } catch (err) {
        console.error("Failed to auto-detect state", err);
      }
    };
    fetchLocation();
  }, []);


  useEffect(() => {
    if (selectedState) {
      const cityList = City.getCitiesOfState("IN", selectedState);
      setCities(cityList);
    }
  }, [selectedState]);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms of Service");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName ,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          number: formData.phone,
          city: formData.city,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Signup successful!");
        window.location.href = "/auth/login";
      } else {
        alert(`❌ ${data.error || "Signup failed"}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("❌ Server error");
    } finally {
      setIsLoading(false);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, city: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Lendly</span>
          </Link>
        </div>

        <Card className="rounded-2xl shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">L</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Join Lendly</CardTitle>
            <p className="text-gray-600">Create your account to start lending and borrowing</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <br />
              {/* State Dropdown */}
              <Label className="text-sm font-medium text-gray-700">State</Label>
              <Select
                value={selectedState}
                onValueChange={(val) => {
                  setSelectedState(val);
                  setFormData((prev) => ({ ...prev, state: states.find(s => s.isoCode === val)?.name || "" }));
                }}
              >
                <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <br />
              {/* City Dropdown */}
              <Label className="text-sm font-medium text-gray-700 mt-4">City</Label>
              <Select
                value={selectedCity}
                onValueChange={(val) => {
                  setSelectedCity(val);
                  setFormData((prev) => ({ ...prev, city: val }));
                }}
              >
                <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.length > 0 ? (
                    cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>


              {/* Password Fields */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Terms and Marketing */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-5">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToMarketing"
                    name="agreeToMarketing"
                    checked={formData.agreeToMarketing}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToMarketing: checked as boolean }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="agreeToMarketing" className="text-sm text-gray-600 leading-5">
                    I'd like to receive updates and promotional emails from Lendly
                  </Label>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={isLoading || !formData.agreeToTerms}
                className="w-full rounded-xl h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

           

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
