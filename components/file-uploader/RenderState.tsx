import { CloudUploadIcon, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function RenderEmptyState({isDragActive}: {isDragActive: boolean}) {
    return (
        <div className="text-center">
            <div className="flex items-center justify-center mx-auto size-12 rounded-full">
                <CloudUploadIcon className={cn("size-6 text-muted-foreground", isDragActive && "text-primary")} />

            </div>
            <p className="text-base font-semibold text-foreground">Drag and drop files here or <span className="text-primary cursor-pointer font-bold">click to upload</span></p>
            <Button type="button" className="mt-4">Upload</Button>
        </div>
    )
}

export function RenderErrorState() {
    return (
      <div className="text-destructive text-center">
          <div className="flex items-center justify-center mx-auto size-12 rounded-full bg-destructive/30">
                <ImageIcon className="size-6 text-destructive" />

            </div>
            <p className="text-base font-semibold text-foreground">Something went wrong</p>
      </div>
    )
}
    