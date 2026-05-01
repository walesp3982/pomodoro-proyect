import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

export default function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme") as Theme | null
        return (saved as Theme) ?? "system"
    })

    const applyTheme = (t: Theme) => {
        switch (t) {
            case "light":
                document.documentElement.classList.remove("dark")
                localStorage.setItem("theme", "light")
                break;
            case "dark":
                document.documentElement.classList.add("dark")
                localStorage.setItem("theme", "dark")
                break
            case "system":
                {
                    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                    document.documentElement.classList.toggle("dark", systemDark)
                    localStorage.removeItem("theme")
                }
        }
    }

    useEffect(() => {
        applyTheme(theme)
    }, [theme])
    
    const toggleTheme = (t: Theme) => {
        setTheme(t)
    }

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)")

        const listener = (e: MediaQueryListEvent) => {
            if (theme === "system") {
                document.documentElement.classList.toggle("dark", e.matches)
            }
        }

        media.addEventListener("change", listener)

        return () => media.removeEventListener("change", listener)
    }, [theme])
    
    return { theme, toggleTheme }
}