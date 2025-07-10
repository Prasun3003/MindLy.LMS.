"use client"

import {useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Menubar from "./Menubar"
import TextAlign from "@tiptap/extension-text-align"
import { EditorContent } from "@tiptap/react"

export function RichTextEditor  ({field}: {field: any}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["paragraph", "heading"],
            })
        ],

        editorProps:{
            attributes:{
                class:"min-h-[300px] p-2 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none"
            }
        },

        immediatelyRender: false,

        onUpdate:({ editor }) => {
            field.onChange(JSON.stringify(editor.getJSON()))
        },

        content: field.value ? JSON.parse(field.value) : <p>Hello World</p>,

    });
    return (
        <div className="w-full p-2 border border-input border-t-0 border-x-0 rounded-lg overflow-hidden
        dark:bg-input/30 
        ">
            <Menubar editor={editor} />
            <EditorContent editor={editor} /> 
        </div>
    )
}
    