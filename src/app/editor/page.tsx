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
            router.push('/')
            return
        }

        const zineData = localStorage.getItem(`zine-${currentZineId}`)
        if (zineData) {
            setZine(JSON.parse(zineData))
        }
    }, [router])

    function deleteCurrentZine() {
        const currentZineId = localStorage.getItem('currentZineId')
        if (currentZineId) {
            localStorage.removeItem(`zine-${currentZineId}`)
            localStorage.removeItem('currentZineId')
            router.push('/')
        }
    }

    if (!zine) return null
    return (
        <div className="min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl mb-4">{zine.title}</h1>
                <nav className="flex gap-8">
                    {/* Navigation Controls */}
                    <div className="flex gap-4">

                        <span className="text-muted-foreground">
                            Page {currentPage + 1} of {zine.pages.length}
                        </span>

                        <button
                            onClick={deleteCurrentZine}
                            className="px-2 text-destructive"
                        >
                            DELETE ZINE
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
            <main>
                {/* Zine Editor */}
                <div className=''>
                    Tldraw would normally go here.
                </div>
            </main>
        </div>
    )
}