"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import { Button } from "@/components/ui/button"
import { TextStyleKit } from '@tiptap/extension-text-style'

import {
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    LinkIcon,
    Unlink,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TiptapEditorProps {
    content?: string
    onChange?: (html: string) => void
    placeholder?: string
    className?: string
    editable?: boolean
}

export function TiptapEditor({
    content = "",
    onChange,
    placeholder = "Start writing...",
    className,
    editable = true,
}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary underline underline-offset-4",
                },
            }),
        ],
        content,
        editable,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: cn(
                    "prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-3",
                    "prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl",
                    "prose-p:my-2 prose-ul:my-2 prose-ol:my-2",
                    "prose-li:my-1",
                    className,
                ),
            },
        },
        immediatelyRender: false
    })

    if (!editor) {
        return null
    }

    const addLink = () => {
        const url = window.prompt("Enter URL:")
        if (url) {
            editor.chain().focus().setLink({ href: url }).run()
        }
    }

    return (
        <div className="border border-border rounded-lg overflow-hidden bg-background">
            {editable && (
                <div className="border-b border-border bg-muted/50 p-2 flex flex-wrap gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("bold") && "bg-accent")}
                    >
                        <Bold className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("italic") && "bg-accent")}
                    >
                        <Italic className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("underline") && "bg-accent")}
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("strike") && "bg-accent")}
                    >
                        <Strikethrough className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("code") && "bg-accent")}
                    >
                        <Code className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-8 bg-border mx-1" />

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("heading", { level: 1 }) && "bg-accent")}
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("heading", { level: 2 }) && "bg-accent")}
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-8 bg-border mx-1" />

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("bulletList") && "bg-accent")}
                    >
                        <List className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("orderedList") && "bg-accent")}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={cn("h-8 w-8 p-0", editor.isActive("blockquote") && "bg-accent")}
                    >
                        <Quote className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-8 bg-border mx-1" />

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: "left" }) && "bg-accent")}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: "center" }) && "bg-accent")}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: "right" }) && "bg-accent")}
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-8 bg-border mx-1" />

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={addLink}
                        className={cn("h-8 w-8 p-0", editor.isActive("link") && "bg-accent")}
                    >
                        <LinkIcon className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive("link")}
                        className="h-8 w-8 p-0"
                    >
                        <Unlink className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-8 bg-border mx-1" />

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className="h-8 w-8 p-0"
                    >
                        <Undo className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className="h-8 w-8 p-0"
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <EditorContent editor={editor} placeholder={placeholder} />
        </div>
    )
}
