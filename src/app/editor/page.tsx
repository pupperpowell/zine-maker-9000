'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
    const router = useRouter()
    const [zine, setZine] = useState<Zine | null>(null)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const currentZineId = localStorage.getItem('currentZineId')
        if (!currentZineId) {
            router.push('/dashboard')
            return
        }

        const zineData = localStorage.getItem(`zine-${currentZineId}`)
        if (zineData) {
            setZine(JSON.parse(zineData))
        }
    }, [router])

    if (!zine) return null
    return (
        <div className="min-h-screen p-8">
            <header className="mb-8">
                <h1 className="text-2xl mb-4">{zine.title}</h1>
                <nav className="flex gap-8">
                    {/* Navigation Controls */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                            className="px-2"
                        >
                            Previous
                        </button>
                        <span className="text-muted-foreground">
                            Page {currentPage + 1} of {zine.pages.length}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(zine.pages.length - 1, prev + 1))}
                            className="px-2"
                        >
                            Next
                        </button>
                    </div>

                    {/* Element Controls */}
                    <div className="flex gap-4">
                        <button className="px-2">Text →</button>
                        <button className="px-2">SVG →</button>
                        <button className="px-2">Image →</button>
                    </div>
                </nav>
            </header>

            {/* Editor Canvas */}
            <main className="border border-border min-h-[600px] relative">
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
                        {element.type === 'text' && <div>{element.content}</div>}
                        {element.type === 'svg' && <div dangerouslySetInnerHTML={{ __html: element.content }} />}
                        {element.type === 'image' && <img src={element.content} alt="" />}
                    </div>
                ))}
            </main>
        </div>
    )
}