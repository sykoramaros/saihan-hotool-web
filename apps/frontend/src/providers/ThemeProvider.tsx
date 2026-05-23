import { useEffect, type ReactNode } from "react"

import saihanThemeJson from "@/themes/saihan-theme.json"

type ThemeMode = "light" | "dark"

interface ThemeConfig {
  name: string
  cssVars: {
    theme: Record<string, string>
    light: Record<string, string>
    dark: Record<string, string>
  }
  css?: {
    "@layer base"?: Record<string, Record<string, string>>
  }
}

const themeData = {
  "saihan-theme": saihanThemeJson as ThemeConfig,
}

interface ThemeProviderProps {
  children: ReactNode
  themeName?: keyof typeof themeData
  mode?: ThemeMode
}

export const ThemeProvider = ({
  children,
  themeName = "saihan-theme",
  mode = "light",
}: ThemeProviderProps) => {
  useEffect(() => {
    const theme = themeData[themeName] ?? themeData["saihan-theme"]

    Object.entries(theme.cssVars[mode]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value)
    })
    Object.entries(theme.cssVars.theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value)
    })

    const styleId = "theme-base-styles"
    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    const baseStyles = theme.css?.["@layer base"]
    if (baseStyles) {
      const cssString = Object.entries(baseStyles)
        .map(([selector, styles]) => {
          const styleString = Object.entries(styles)
            .map(([prop, val]) => `${prop}: ${val};`)
            .join(" ")
          return `${selector} { ${styleString} }`
        })
        .join("\n")
      styleElement.textContent = `@layer base { ${cssString} }`
    } else {
      styleElement.textContent = ""
    }

    document.documentElement.setAttribute("data-theme", themeName)
    document.documentElement.setAttribute("data-mode", mode)
  }, [themeName, mode])

  return <>{children}</>
}