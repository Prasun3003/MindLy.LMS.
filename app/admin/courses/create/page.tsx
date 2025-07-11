"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeftIcon, SparkleIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createCourseSchema, CreateCourseSchema } from "@/lib/zodSchemas"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import slugify from "slugify"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { RichTextEditor } from "@/components/rich-text-editor/Editor"
  
import { category } from "@/lib/zodSchemas"
import { courseLevel } from "@/lib/zodSchemas"
import { courseStatus } from "@/lib/zodSchemas"
import { Uploader } from "@/components/file-uploader/Uploader"

export default function CreateCoursePage() {
    const form = useForm<CreateCourseSchema>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            title: "",
            description: "",
            slug: "",
            fileKey: "",
            price: 0,
            duration: 0,
            level: "BEGINNER",
            smallDescription: "",
            category: "Business",
            status: "DRAFT",
        }
    })
    function onSubmit(data: CreateCourseSchema) {
        console.log(data)
    }
    return (
        <>
            <div className="flex items-center justify-between m-x-4">
                <Link href="/admin/courses" className={buttonVariants({ variant: "outline", size: "sm" })}> <ArrowLeftIcon className="mr-2 h-4 w-4" />Back to Courses</Link>
                <h1 className="text-2xl font-bold">Create Course</h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Fill in the basic information of the course</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. React.js" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4 items-end">
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. reactjs" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="button" onClick={() =>{
                                const title = form.getValues("title")
                                const slug = slugify(title)
                                form.setValue("slug", slug)
                            } }>Generate Slug <SparkleIcon className="ml-2 h-4 w-4" /></Button>

                            </div>

                            <FormField
                                control={form.control}
                                name="smallDescription"
                                render={({ field }) => (
                                    <FormItem className="w-full min-h-[120px]">
                                        <FormLabel>Small Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="write a small description" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="w-full min-h-[200px]">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <RichTextEditor field={field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fileKey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thumbnail Image</FormLabel>
                                        <FormControl>
                                            <Uploader />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="e.g. 100" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="e.g. 100" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="level"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Level</FormLabel>
                                            <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                   <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a level" />
                                                    </SelectTrigger>
                                                   </FormControl>
                                                   <SelectContent>
                                                    {courseLevel.map((level) => (
                                                        <SelectItem key={level} value={level}>
                                                            {level}
                                                        </SelectItem>
                                                    ))}
                                                   </SelectContent>
                                                </Select>   
                                            <FormMessage/>
                                        </FormItem> 
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                   <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                   </FormControl>
                                                   <SelectContent>
                                                    {category.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                   </SelectContent>
                                                </Select>   
                                            
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                   <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a status" />
                                                    </SelectTrigger>
                                                   </FormControl>
                                                   <SelectContent>
                                                    {courseStatus.map((status) => (
                                                        <SelectItem key={status} value={status}>
                                                            {status}
                                                        </SelectItem>
                                                    ))}
                                                   </SelectContent>
                                                </Select>   
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" >Create Course</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}