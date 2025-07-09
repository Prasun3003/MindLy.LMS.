'use client'
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default  function Home() {
  const router = useRouter();
  const {
    data : session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();
  async function SignOut() {
    await authClient.signOut({
      fetchOptions : {
        onSuccess : () => {
          toast.success("Signed out successfully")
        },
        onError : (error) => {
          toast.error("Failed to sign out" + error.error.message)
        }
      }
    })
    router.push("/login")
  }
  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Home</h1>
      <ModeToggle />
      {session ? <div>
        <p>{session.user.name}</p>
        <Button variant="destructive" onClick={SignOut} className="mt-4">LogOut</Button>
      </div> : <Button onClick={()=> router.push("/login")}>LogIn</Button>}
    </div>
  );
}
  