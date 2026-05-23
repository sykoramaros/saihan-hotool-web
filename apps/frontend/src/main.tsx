import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { LanguageProvider } from "./context/LanguageProvider"
import {
  BaseUrlProvider,
  ThemeContextProvider,
  type ThemeConfig,
} from "@sykoramaros/marosh-components"
import saihanThemeJson from "@/themes/saihan-theme.json"
import natureJson from "@/themes/nature.json"
import bubblegumJson from "@/themes/bubblegum.json"
import retroArcadeJson from "@/themes/retro-arcade.json"
import tangerineJson from "@/themes/tangerine.json"
import "./index.css"

const CMS_URL = import.meta.env.VITE_CMS_URL ?? "http://localhost:3000"

const themes: Record<string, ThemeConfig> = {
  "saihan-theme": saihanThemeJson as unknown as ThemeConfig,
  nature: natureJson as unknown as ThemeConfig,
  bubblegum: bubblegumJson as unknown as ThemeConfig,
  "retro-arcade": retroArcadeJson as unknown as ThemeConfig,
  tangerine: tangerineJson as unknown as ThemeConfig,
}

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider themes={themes} defaultTheme="saihan-theme" defaultMode="light">
      <LanguageProvider>
        <BaseUrlProvider value={CMS_URL}>
          <RouterProvider router={router} />
        </BaseUrlProvider>
      </LanguageProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
