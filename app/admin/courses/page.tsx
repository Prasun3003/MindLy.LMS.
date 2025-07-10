import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CoursesPage() {
    return (
        <>
            <div className="flex items-center justify-between m-x-4">
                <h1 className="text-2xl font-bold">Your Courses</h1>
                <Link href="/admin/courses/create" className={buttonVariants({ variant: "default" })}>Add Course</Link>


            </div>
            <div className="m-x-4">
                <h1>Here will be the courses</h1>
            </div>
        </>
    )
}