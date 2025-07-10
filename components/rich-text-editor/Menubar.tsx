import { type Editor } from "@tiptap/react"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { Toggle } from "@/components/ui/toggle"
    import {
  Bold,
  Italic,
  Strikethrough,
  Heading,
  Heading1Icon,
  Heading2Icon,
  List,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  Undo,
  Redo,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MenubarProps {
  editor: Editor | null
}

export default function Menubar({ editor }: MenubarProps) {
  if (!editor) return null

  const buttonClass = (isActive: boolean) =>
    cn(
      "border border-muted rounded-md transition-all",
      isActive
        ? "bg-indigo-500 text-white hover:bg-indigo-600"
        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
    )

  return (
    <div className="border border-input rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center ">
    <TooltipProvider>
      
          {/* Bold */}
          <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                aria-label="Toggle Bold"
                className={buttonClass(editor.isActive("bold"))}
              >
                <Bold className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          {/* Italic */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                aria-label="Toggle Italic"
                className={buttonClass(editor.isActive("italic"))}
              >
                <Italic className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          {/* Strikethrough */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                aria-label="Toggle Strikethrough"
                className={buttonClass(editor.isActive("strike"))}
              >
                <Strikethrough className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                aria-label="Toggle Heading"
                className={buttonClass(editor.isActive("heading", { level: 1 }))}
              >
                <Heading1Icon className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                aria-label="Toggle Heading"
                className={buttonClass(editor.isActive("heading", { level: 2 }))}
              >
                <Heading2Icon className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                aria-label="Toggle Bullet List"
                className={buttonClass(editor.isActive("bulletList"))}
              >
                <List className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                aria-label="Toggle Ordered List"
                className={buttonClass(editor.isActive("orderedList"))}
              >
                <List className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
          </div>
       
      <div className="w-px h-6 bg-border mx-2">

      </div>
      <div className="flex flex-wrap gap-1">
      <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("textAlign", { align: "left" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                aria-label="Toggle Left Align"
                className={buttonClass(editor.isActive("textAlign", { align: "left" }))}
              >
                <AlignLeftIcon className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Left Align</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("textAlign", { align: "center" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                aria-label="Toggle Center Align"
                className={buttonClass(editor.isActive("textAlign", { align: "center" }))}
              >
                <AlignCenterIcon className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Center Align</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editor.isActive("textAlign", { align: "right" })}
                onPressedChange={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                aria-label="Toggle Right Align"
                className={buttonClass(editor.isActive("textAlign", { align: "right" }))}
              >
                <AlignRightIcon className="w-4 h-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Right Align</TooltipContent>
          </Tooltip>
      </div>
      <div className="w-px h-6 bg-border mx-2"></div>

      <div className="flex flex-wrap gap-1">
      <Tooltip>
            <TooltipTrigger asChild>
           <Button size="sm" variant="ghost" type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            >
          <Undo className="w-4 h-4" />
           </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
             <Button size="sm" variant="ghost" type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            >
          <Redo className="w-4 h-4" />
           </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
      </div>

      
    </TooltipProvider>
    </div>
  )
}
