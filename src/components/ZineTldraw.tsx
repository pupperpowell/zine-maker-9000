'use client'

import { setUserPreferences, Tldraw } from "tldraw"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import 'tldraw/tldraw.css'

export default function ZineTldraw() {
    const { theme } = useTheme()

    useEffect(() => {
        setUserPreferences({
            colorScheme: theme as 'light' | 'dark',
            id: "default", // https://tldraw.dev/reference/editor/TLUserPreferences
        })
    }, [theme])

    return (
        <div className="w-full h-full">
            <Tldraw persistenceKey="example" />
        </div>
    )
}