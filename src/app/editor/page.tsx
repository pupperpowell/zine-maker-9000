'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Zine = {
    id: string
    title: string
    pages: Page[]
    createdAt: string
    updatedAt: string
}

type Page = {
    id: string
    elements: Element[]
}

type Element = {
    type: 'text' | 'svg' | 'image'
    x: number
    y: number
    width: number
    height: number
    content: string
}

export default function EditorPage() {
    const params = useParams()
    const [zine, setZine] = useState<Zine | null>(null)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const zineData = localStorage.getItem(`zine-${params.zineId}`)
        if (zineData) {
            setZine(JSON.parse(zineData))
        }
        // In production, you'd fetch from PocketBase instead:
        // fetchZineFromPocketBase(params.zineId)
    }, [params.zineId])

    if (!zine) return <div>Loading...</div>

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{zine.title}</h1>

                <div className="flex gap-4">
                    {/* Page Navigation */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded"
                        >
                            Previous Page
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(zine.pages.length - 1, prev + 1))}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded"
                        >
                            Next Page
                        </button>
                    </div>

                    {/* Add Element Buttons */}
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">
                            Add Text
                        </button>
                        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">
                            Add SVG
                        </button>
                        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">
                            Add Image
                        </button>
                    </div>
                </div>

                {/* Editor Canvas */}
                <div className="mt-4 border border-border rounded-lg min-h-[600px] relative">
                    {zine.pages[currentPage]?.elements.map((element, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                left: element.x,
                                top: element.y,
                                width: element.width,
                                height: element.height
                            }}
                            className="border border-dashed border-muted-foreground"
                        >
                            {/* Render different element types */}
                            {element.type === 'text' && <div>{element.content}</div>}
                            {element.type === 'svg' && <div dangerouslySetInnerHTML={{ __html: element.content }} />}
                            {element.type === 'image' && <img src={element.content} alt="" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
