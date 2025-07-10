// import Link from "next/link";
// import Image from "next/image";

// const navLinks = [
//     {
//         label : "Home",
//         href : "/"
//     },
//     {
//         label : "Courses",
//         href : "/courses"
//     },
//     {
//         label : "Dashboard",
//         href : "/dashboard"
//     },
// ]

// export function Navbar(){
//     return (
//         <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//             <div className="container flex items-center justify-between py-4">
//                 <Link href="/" className="flex items-center gap-2">
//                 <Image src="/undraw_command-line.svg" alt="Logo" width={24} height={24} className="w-6 h-6 bg-indigo-500 p-1 rounded-full mx-2" />
//                   <span className="text-xl font-bold">MindLy.LMS.</span>
//                 </Link>
//                 <nav className="flex items-center gap-4">
//                     <div className="flex items-center gap-4">
//                         {navLinks.map((link) => (
//                             <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
//                                 {link.label}
//                             </Link>
//                         ))}
//                     </div>
//                 </nav>
//             </div>
//         </header>
//     )
// }

'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserDropdown from "./Userdropdown";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const {data : session , isPending} = authClient.useSession();
 

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/undraw_command-line.svg"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full p-1 bg-indigo-500"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            MindLy<span className="text-primary">.LMS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === link.href
                        ? "text-primary underline underline-offset-4"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />
          {isPending ? null : session ?(
            <UserDropdown name={session.user.name} image={session.user.image || ""} email={session.user.email || ""}    />
          ) : (
            <>  
            <Link href="/login" className={buttonVariants({ variant: "outline" , size : "icon"})}>
              Login
            </Link>
            <Link href="/register" className={buttonVariants({ variant: "default" , size : "icon"})}>
              Register
            </Link>
            </>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-none">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary underline" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
