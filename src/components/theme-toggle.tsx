"use client"

import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer hover:opacity-80 select-none"
        >
            &#9728;
        </div>
    )
}
