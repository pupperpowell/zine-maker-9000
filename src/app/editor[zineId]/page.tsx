'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Zine = {
    id: string
    title: string
    pages: any[]
    createdAt: string
    updatedAt: string
}

export default function EditorPage() {
    const params = useParams()
    const [zine, setZine] = useState<Zine | null>(null)

    useEffect(() => {
        const zineData = localStorage.getItem(`zine-${params.zineId}`)
        if (zineData) {
            setZine(JSON.parse(zineData))
        }
    }, [params.zineId])

    const updateZineTitle = (newTitle: string) => {
        if (zine) {
            const updatedZine = {
                ...zine,
                title: newTitle,
                updatedAt: new Date().toISOString()
            }
            setZine(updatedZine)
            localStorage.setItem(`zine-${zine.id}`, JSON.stringify(updatedZine))
        }
    }

    if (!zine) return <div>Loading...</div>

    return (
        <div className="p-6">
            <input
                type="text"
                value={zine.title}
                onChange={(e) => updateZineTitle(e.target.value)}
                className="text-2xl font-bold mb-4 bg-transparent border-none focus:outline-none"
            />
            {/* Editor components will go here */}
        </div>
    )
}
