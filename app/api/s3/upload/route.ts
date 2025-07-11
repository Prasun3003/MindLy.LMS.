import z from "zod"
import { env } from "@/lib/env"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { S3 } from "@/lib/S3Client"
import { v4 as uuid } from "uuid"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { NextResponse } from "next/server"
export const fileUploadSchema = z.object({
    fileName : z.string().min(1, {message : "File name is required"}),
    contentType : z.string().min(1, {message : "Content type is required"}),
    size : z.number().min(1, {message : "File size is required"}),
    isImage : z.boolean(),
    
})
    


export async function POST(request : Request){
    try{
        const body  = await request.json()
        const validation = fileUploadSchema.safeParse(body)
        if(!validation.success){
            return NextResponse.json({error : validation.error.errors[0].message}, {status : 400})
        }
        const {fileName, contentType, size, isImage} = validation.data

        const uniqueKey  = `${uuid()}-${fileName}`

        const command  = new PutObjectCommand({
            Bucket : env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
            Key : uniqueKey,
            ContentType : contentType,
            ContentLength : size,
        })

        const presignedUrl = await getSignedUrl(S3, command, {
            expiresIn : 60 * 60
        });

        const response = {
            presignedUrl,
            key : uniqueKey,
        }

        return NextResponse.json(response)

    }catch(e){
        return NextResponse.json({error : "Something went wrong"}, {status : 500})
    }
}