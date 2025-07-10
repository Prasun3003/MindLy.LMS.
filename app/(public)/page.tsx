// 'use client'
// import { ModeToggle } from "@/components/ui/mode-toggle";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
// export default  function Home() {
//   const router = useRouter();
//   async function SignOut() {
//     await authClient.signOut({
//       fetchOptions : {
//         onSuccess : () => {
//           toast.success("Signed out successfully")
//         },
//         onError : (error) => {
//           toast.error("Failed to sign out" + error.error.message)
//         }
//       }
//     })
//     router.push("/login")
//   }
//     return (
//       <>
//         <section className="relative py-20 flex flex-col items-center justify-center">
//           <div className="flex flex-col items-center text-center space-y-8">
//             <Badge variant="outline">
//               The Future of Online Learning Education
//             </Badge>
//           </div>
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-center">
//             Elevate Your Learning Experience
//           </h1>
//           <p className="flex flex-col max-w-[700px] text-muted-foreground md:text-xl text-center justify-center items-center">
//             Discover the power of personalized learning with our AI-powered platform. 
//             Access high quality courses, anytime, anywhere.
//           </p>
//           <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-8">

//             <Link href="/courses" className={buttonVariants({ variant: "outline" , size : "lg"})}>
//               Explore Courses
//             </Link>
//             <Link href="/login" className={buttonVariants({ variant: "default" , size : "lg"})}>
//               Login
//             </Link>
//           </div>

//         </section>

//       </>
//     ) 

// }

// 'use client'

// import { ModeToggle } from "@/components/ui/mode-toggle";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
// import { FlickeringGrid } from "@/components/magicui/flickering-grid";
// import { useWindowSize } from "@/hooks/use-window-size";

// export default function Home() {
//   const router = useRouter();

//   async function SignOut() {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           toast.success("Signed out successfully");
//         },
//         onError: (error) => {
//           toast.error("Failed to sign out: " + error.error.message);
//         },
//       },
//     });
//     router.push("/login");
//   }

//   const {width,height} = useWindowSize()

//   return (
//     <section className="relative py-24 px-6 md:px-12 flex flex-col items-center justify-center text-white text-center min-h-screen overflow-hidden">

//       {/* Flickering Grid Background */}
//       <FlickeringGrid
//         className="fixed inset-0 z-0 w-full h-full bg-black"
//         squareSize={4}
//         gridGap={6}
//         color="#6B7280"
//         maxOpacity={0.4}
//         flickerChance={0.1}
//         height={height}
//         width={width}
//       />

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center">
//         <Badge variant="outline" className="mb-6 border-muted text-muted-foreground bg-muted/10">
//           The Future of Online Learning Education
//         </Badge>

//         <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
//           Elevate Your Learning Experience
//         </h1>

//         <p className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
//           Discover the power of personalized learning with our AI-powered platform. 
//           Access high-quality courses, anytime, anywhere.
//         </p>

//         <div className="flex flex-row flex-wrap justify-center items-center gap-4">
//           <Link
//             href="/courses"
//             className={buttonVariants({
//               variant: "outline",
//               size: "lg",
//               className:
//                 "hover:bg-white hover:text-black transition duration-300 ease-in-out",
//             })}
//           >
//             Explore Courses
//           </Link>

//           <Link
//             href="/login"
//             className={buttonVariants({
//               variant: "default",
//               size: "lg",
//               className:
//                 "bg-primary text-white hover:scale-105 active:scale-95 transition-all",
//             })}
//           >
//             Login
//           </Link>
//         </div>
//       </div>

//       {/* Floating Toggle */}
//       <div className="absolute top-6 right-6 z-10">
//         <ModeToggle />
//       </div>
//     </section>
//   );
// }

'use client'

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { useWindowSize } from "@/hooks/use-mobile/use-window-size";
import Image from "next/image";
import { BookOpenIcon, BookOpenTextIcon, CheckCircleIcon, BrainIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Comprehensive Courses",
    description: "A wide range of courses to choose from curated by our team of experts",
    icon: <BookOpenIcon className="w-6 h-6" />,
  },
  {
    title: "Personalized Learning",
    description: "Tailored content based on your learning style and pace",
    icon: <BookOpenTextIcon className="w-6 h-6" />,
  },
  {
    title: "Progress Tracking",
    description: "Track your progress and see where you stand",
    icon: <CheckCircleIcon className="w-6 h-6" />,
  },
  {
    title: "AI-Powered Learning",
    description: "Smart recommendations powered by advanced AI models",
    icon: <BrainIcon className="w-6 h-6" />,
  },
];

export default function Home() {
  const { width, height } = useWindowSize();
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden py-24 px-6 md:px-12 flex items-center justify-center bg-background text-foreground">
        {/* Flickering Grid Background */}
        <FlickeringGrid
          className="fixed inset-0 z-0 w-full h-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.4}
          flickerChance={0.1}
          height={height}
          width={width}
        />

        {/* Mode Toggle */}

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center md:text-left space-y-6">
            <Badge variant="outline" className="border-muted text-muted-foreground bg-muted/10 border-width-2 border-white">
              The Future of Online Learning Education
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Elevate Your Learning Experience
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Discover the power of personalized learning with our AI-powered platform.
              Access high-quality courses, anytime, anywhere.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
              <Link
                href="/courses"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "hover:bg-primary hover:text-primary-foreground transition-all",
                })}
              >
                Explore Courses
              </Link>

              <Link
                href="/login"
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                  className: "hover:scale-105 active:scale-95 transition-all",
                })}
              >
                Login
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <Image
              src="/undraw_development_s4gv.svg"
              alt="Learning Illustration"
              width={500}
              height={500}
              priority
              className="w-full h-auto max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-20 px-6 md:px-12 text-foreground">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="hover:shadow-xl transition-shadow duration-300 border border-border bg-muted/20"
              >
                <CardHeader className="flex items-center justify-center text-primary">
                  <div className="bg-primary/10 p-3 rounded-full">{feature.icon}</div>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
