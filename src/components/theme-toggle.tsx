"use client"

import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer hover:opacity-80 hover:bg-white dark:hover:bg-black select-none"
        >
            &#9728;
        </button>
    )
}
