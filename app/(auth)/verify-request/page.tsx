'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyRequest() {
    const [otp, setOtp] = useState("")
    const [pending, startTransition] = useTransition()
    const params = useSearchParams()
    const email = params.get("email") as string
    const router = useRouter()
    const isOtpValid = otp.length === 6
    function verifyOtp() {
        startTransition(async () => {
            await authClient.signIn.emailOtp({
                email : email,
                otp,
                fetchOptions : {
                    onSuccess : () => {
                        toast.success("Login successful with email. Redirecting to home page...")
                        router.push(`/`)
                    },
                    onError : (error) => {
                        toast.error("Login failed" + error.error.message)
                    }
                }
            })
        })
    }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg border border-muted bg-background">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-center text-sm text-muted-foreground">
            We’ve sent a One-Time Password (OTP) to your email. Enter it below to confirm your identity.
          </p>

          <Separator />

          <div className="space-y-2 flex flex-col gap-2 items-center">
            <Label htmlFor="otp">OTP</Label>
            <InputOTP maxLength={6} className="w-full gap-2" value={otp} onChange={(value) => setOtp(value)}>
                <InputOTPGroup>
                   <InputOTPSlot index={0}/>
                   <InputOTPSlot index={1}/>
                   <InputOTPSlot index={2}/>
                </InputOTPGroup>
                <InputOTPGroup>
                   <InputOTPSlot index={3}/>
                   <InputOTPSlot index={4}/>
                   <InputOTPSlot index={5}/>
                </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            type="submit"
            className="w-full mt-4"
            onClick={verifyOtp}
            disabled={pending || !isOtpValid}
          >
            Verify Email
          </Button>

          <div className="text-center text-xs text-muted-foreground mt-2">
            Didn’t receive the code? <Button variant="link" size="sm">Resend</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
