'use client';

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ComputerIcon } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';




export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white/50">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col justify-between px-12 py-16 relative overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Mountain"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Overlay to dim the image */}
        <div className="absolute inset-0 bg-white/ z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between h-full">
          {/* Heading */}
            <Link href="/" className={buttonVariants({variant:"outline"}) + "flex items-center gap-2 w-fit"}> <ArrowLeft /> Back to Home</Link>
          <div className="mt-40">
            <h1 className="text-5xl font-extrabold leading-tight text-balance text-black">
              POWERING <br />
              <span className="bg-lime-300 px-1">LEARNING EXPERIENCES</span> <br />
              FOR THE WORLD.
            </h1>
            
          </div>

          {/* Register Link */}
          <div className="mt-6">
            <p className="text-sm text-white mb-1">Don’t have an account?</p>
            <Link
              href="/register"
              className="inline-flex items-center gap-1 text-white font-medium hover:text-lime-600 transition"
            >
              Create account →
            </Link>
          </div>

          {/* About Card */}
          <div className="mt-10 bg-black rounded-2xl p-5 text-white flex justify-between items-center shadow-md">
            <div className="max-w-xs">
              <h3 className="font-semibold text-lg">About us</h3>
              <p className="text-sm mt-1">
               We help you to learn and grow your skills.Track your progress and get feedback from our community.
              </p>
            </div>
            <div className="ml-4">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2242&auto=format&fit=crop&ixlib=rb-4.1.0"
                alt="Mustang"
                width={110}
                height={70}
                className="rounded-md object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <Button variant="default" className="z-50 absolute top-[10%] left-[46.5%] bg-green-700 text-black hover:bg-green-600 hover:text-white">Get Started</Button>

      {/* Right Panel */}
      <div className="w-1/2 border-2 border-black flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://plus.unsplash.com/premium_photo-1661311950994-d263ea9681a1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Right background"
            fill
            className="object-cover rounded-r-3xl"
            priority
          />
        </div>

        {/* Optional overlay for contrast */}
        <div className="absolute inset-0 bg-black/10 -z-5" />

        {/* Login/Signup Form */}
       

          <div className="mb-10 text-2xl font-bold flex flex-row items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
          <Image src="/undraw_command-line.svg" alt="Logo" width={24} height={24} className="w-6 h-6 bg-orange-500 p-1 rounded-full" />
            MindLy.LMS.
          </Link>
          </div>
          {children}
          <Toaster />

          <div className="mt-10 text-sm text-muted-foreground ">
            © {new Date().getFullYear()} MindLy.LMS. All rights reserved.
          </div>
      </div>
    </div>
  );
}
