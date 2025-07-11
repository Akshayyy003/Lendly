"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, RefreshCw, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [resendCount, setResendCount] = useState(0)

  const handleResendEmail = async () => {
    setIsResending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setResendCount((prev) => prev + 1)
    setIsResending(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="rounded-2xl shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Verify your email</CardTitle>
            <p className="text-gray-600">We've sent a verification link to your email address</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <CheckCircle className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-800">
                  Check your email and click the verification link to activate your account
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">Didn't receive the email? Check your spam folder or resend it.</p>

                <Button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  variant="outline"
                  className="w-full rounded-xl border-gray-200 bg-transparent"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>

                {resendCount > 0 && (
                  <p className="text-sm text-green-600">✓ Verification email sent! ({resendCount})</p>
                )}
              </div>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Wrong email address?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign up again
                </Link>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Already verified?{" "}
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
