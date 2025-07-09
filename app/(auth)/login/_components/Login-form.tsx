'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GithubIcon, Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useTransition } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
        const [githubPending, startGithubTransition] = useTransition()
        const [emailPending, startEmailTransition] = useTransition()
        const [email ,setEmail] = useState("")
        const router = useRouter()
        async function loginWithGithub() {
            startGithubTransition(async () => {
                await authClient.signIn.social({
                    provider : "github",
                    callbackURL : "/",
                    fetchOptions : {
                        onSuccess : () => {
                            toast.success("Login successful with github. Redirecting to home page...")
                            router.push(`/`)
                        },
                        onError : (error) => {
                            toast.error("Login failed" + error.error.message)
                        }
                    }
                })
            })
        }
        function loginWithEmail() {
            if (!email) {
                toast.error("Please enter your email address.");
                return;
            }
            startEmailTransition(async () => {
                await authClient.emailOtp.sendVerificationOtp({
                    email,
                    type: 'sign-in',
                    fetchOptions: {
                        onSuccess: () => {
                            toast.success("OTP sent to your email. Redirecting to home page...");
                            router.push(`/verify-request?email=${email}`);
                        },
                        onError: (error : any) => {
                            toast.error("Login failed: " + (error?.error?.message || error?.message || "Unknown error"));
                        }
                    }
                });
            });
        }
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>Login to your account</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
               <Button variant="outline" disabled={githubPending} className="w-full" onClick={loginWithGithub}>
                 {githubPending ? <Loader2Icon className="animate-spin" /> : <GithubIcon />}
                 {githubPending ? "Signing in..." : "Login with GitHub"}
                </Button>

               <Separator className="my-4" />
               <div className="grid grid-cols-1 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="xyz@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
               </div>
               <Button className="w-full mt-4" onClick={loginWithEmail} disabled={emailPending}>
                  {emailPending ? <Loader2Icon className="animate-spin" /> : null}
                  {emailPending ? "Sending..." : "Continue with Email"}
                </Button>
               <div className="flex items-center justify-center mt-4 gap-2 ">
                <span className="text-muted-foreground text-sm">Don't have an account?</span>
                <Link href="/register" className="text-primary font-medium hover:underline">Register</Link>
            </div>
            </CardContent>       

        </Card> 
    )
}