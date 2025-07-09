'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const originalText = "404";
    
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        const randomIndex = Math.floor(Math.random() * originalText.length);
        const glitched = originalText.split('').map((char, index) => 
          index === randomIndex ? randomChar : char
        ).join('');
        setGlitchText(glitched);
        
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 200);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Main content card */}
      <Card className="bg-gray-800/50 border-amber-400/20 backdrop-blur-sm shadow-2xl max-w-2xl w-full z-10">
        <CardContent className="p-12 text-center space-y-8">
          {/* Status badge */}
          <Badge variant="outline" className="border-amber-400/50 text-amber-300 bg-amber-400/10 text-lg px-4 py-2">
            Error 404
          </Badge>
          
          {/* Glitch 404 display */}
          <div className="relative">
            <span className="text-8xl md:text-9xl font-black text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text drop-shadow-2xl select-none tracking-wider block">
              {glitchText}
            </span>
            <div className="absolute inset-0 text-8xl md:text-9xl font-black text-amber-400/10 blur-sm">
              404
            </div>
          </div>
          
          <Separator className="bg-amber-400/20 my-8" />
          
          {/* Error message */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-xl md:text-2xl text-amber-300/90 font-medium">
              The page you're looking for has wandered off into the digital void
            </p>
            <p className="text-lg text-gray-300/80 max-w-md mx-auto leading-relaxed">
              Don't worry though—even the best explorers sometimes take a wrong turn. 
              Let's get you back to familiar territory.
            </p>
          </div>
          
          <Separator className="bg-amber-400/20 my-8" />
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Link href="/">
                <span className="flex items-center gap-2">
                  🏠 Take me home
                </span>
              </Link>
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="border-amber-400/50 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400 font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                ↩️ Go back
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Floating ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-amber-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-amber-400/5 via-orange-400/5 to-transparent"></div>
    </div>
  );
}