import {
    BookOpenIcon,
    ChevronDownIcon,
    HomeIcon,
   
    
    LayoutDashboardIcon,
   
    
    LogOutIcon,
  } from "lucide-react"

  import Link from "next/link"
  
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

interface iAppProps{
    name : string;
    image : string;
    email : string;
}
  
  export default function UserDropdown({name , email , image} : iAppProps) {

     const router = useRouter();
       async function SignOut() {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                toast.success("Signed out successfully");
              },
              onError: (error) => {
                toast.error("Failed to sign out: " + error.error.message);
              },
            },
          });
          router.push("/login");
        }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <Avatar>
              <AvatarImage src={image} alt="Profile image" />
              <AvatarFallback>{name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <ChevronDownIcon
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-w-64">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {name}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/">
              <HomeIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Home</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/courses">
              <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" /> 
              <span>Courses</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
              <LayoutDashboardIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={SignOut}>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  