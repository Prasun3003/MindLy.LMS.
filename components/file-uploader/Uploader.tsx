"use client"

import {useDropzone} from "react-dropzone"
import { useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { RenderEmptyState } from "./RenderState"
import { RenderErrorState } from "./RenderState"
import { FileRejection } from "react-dropzone"
import { toast } from "sonner"

import { useState } from "react"
import { v4 as uuid } from "uuid"
import { Loader2 } from "lucide-react"

interface FileState {
    id: string | null
    file: File | null
    uploading: boolean
    progress: number
    key: string | null
    isDeleting: boolean
    error: boolean
    objectUrl?: string
    fileType: "image" | "video"
}

export function Uploader() {

    const [fileState, setFileState] = useState<FileState>({
        id: null,
        file: null,
        uploading: false,
        progress: 0,
        key: null,
        isDeleting: false,
        error: false,
        objectUrl: undefined,
        fileType: "image"
    })

    async function uploadFile(file: File) {
        setFileState((prev) =>({
            ...prev,
            uploading: true,
            progress: 0,
        }))

        try{
            const presignedResponse = await fetch("/api/s3/upload", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    fileName : file.name,
                    contentType : file.type,
                    size : file.size,
                    isImage : true
                })
            })

            if(!presignedResponse.ok){
                toast.error("Failed to get presigned URL")
                setFileState((prev) =>({
                    ...prev,
                    uploading: false,
                    progress: 0,
                    error: true
                }))
                return
            }
            const { presignedUrl, key } = await presignedResponse.json()
            await new Promise<void>((resolve, reject) => {
               const xhr = new XMLHttpRequest()
               xhr.upload.onprogress = (event) => {
                   if(event.lengthComputable){
                       const progress = (event.loaded / event.total) * 100
                       setFileState((prev) =>({
                           ...prev,
                           progress: Math.round(progress),
                       }))
                   }
               }
              xhr.onload = () => {
                if(xhr.status === 200 || xhr.status === 204){
                    setFileState((prev) =>({
                        ...prev,
                        uploading: false,
                        progress: 100,
                        key: key
                    }))
                    toast.success("File uploaded successfully")
                    resolve()
                }else{
                    reject(new Error("Failed to upload file"))
                }
              }
              xhr.onerror = () => {
                reject(new Error("Failed to upload file"))
              }
              xhr.open("PUT", presignedUrl)
              xhr.setRequestHeader("Content-Type", file.type)
              xhr.send(file)             
            })
   
        }catch(error){
            toast.error("Failed to upload file")
            setFileState((prev) =>({
                ...prev,
                progress: 0,
                error: true
            }))
        }
    }
    
    const onDrop =useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            setFileState({
                id: uuid(),
                file: file,
                uploading: false,
                progress: 0,
                key: null,
                isDeleting: false,
                error: false,
                objectUrl: URL.createObjectURL(file),
                fileType: "image"
            })
            uploadFile(file)
        }
    }, [])

    function rejectedFiles(fileRejection: FileRejection[]) {
        if(fileRejection.length > 0) {
            const tooManyFiles = fileRejection.find((rejection) => rejection.errors[0].code === "too-many-files")
            if (tooManyFiles) {
                toast.error("Too many files selected Max 1 file")
            }
            const tooLargeFiles = fileRejection.find((rejection) => rejection.errors[0].code === "file-too-large")
            if (tooLargeFiles) {
                toast.error("File too large Max 2MB")
            }
            const invalidFiles = fileRejection.find((rejection) => rejection.errors[0].code === "file-invalid-type")
            if (invalidFiles) {
                toast.error("Invalid file type")
            }
        }
    }

    function renderContent(){
        if(fileState.uploading){
            return (
                <div className="flex items-center justify-center h-full w-full p-4">
                    <Loader2 className="animate-spin" />
                </div>
            )
        }
        if(fileState.error){
            return (
                <RenderErrorState />
            )
        }
        if(fileState.objectUrl){
            return (
               <h1>Uploaded File</h1>
            )   
        }
        return (
           <RenderEmptyState isDragActive={isDragActive} />
        )
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
        },
        maxFiles: 1,
        multiple: false,
        maxSize: 1024 * 1024 * 2,
        onDropRejected: rejectedFiles,
    })
    return (
        <Card {...getRootProps()} className={cn("relative border-2 border-dashed transition-colors duration-200 w-full h-40", isDragActive ? "border-primary bg-primary/10 border-solid" : "border-border hover:border-primary")}>
           <CardContent className="flex items-center justify-center h-full w-full p-4">
           <input {...getInputProps()} />
           {renderContent()} 
           </CardContent>
        </Card>
    )
}