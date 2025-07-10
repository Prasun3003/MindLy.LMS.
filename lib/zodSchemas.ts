import { z } from "zod";

export const courseLevel = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const
export const courseStatus = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const

export const category = ["Business", "IT", "Design", "Health", "Lifestyle", "Marketing", "Music", "Photography", "Sports", "Travel"] as const

export const createCourseSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    fileKey: z.string().min(1, "File key must be at least 1 characters long"),
    price: z.coerce.number().min(0, "Price must be at least 0"),
    duration: z.coerce.number().min(0, "Duration must be at least 0").max(500, "Duration must be at most 500"),
    level: z.enum(courseLevel),
    smallDescription: z.string().min(3, "Small description must be at least 3 characters long").max(100, "Small description must be at most 100 characters long"),
    category: z.enum(category),
    status: z.enum(courseStatus),
}); 

export type CreateCourseSchema = z.infer<typeof createCourseSchema>
