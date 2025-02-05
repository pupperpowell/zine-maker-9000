"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    // For a lightswitch that toggles between "lights off" and "lights on":

    // const [mounted, setMounted] = useState(false)

    // useEffect(() => {
    //     setMounted(true)
    // }, [])

    // // prevents hydration error
    // if (!mounted) {
    //     return null // or a placeholder
    // }

    return (
        <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer hover:opacity-80"
        >
            TOGGLE LIGHTS
        </div>
    )
}
