import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { LanguageProvider } from "./context/LanguageProvider"
import { BaseUrlProvider } from "./context/BaseUrlProvider"
import { ThemeProvider } from "./providers/ThemeProvider"
import "./index.css"

const CMS_URL = import.meta.env.VITE_CMS_URL ?? "http://localhost:3000"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider themeName="saihan-theme" mode="light">
      <LanguageProvider>
        <BaseUrlProvider value={CMS_URL}>
          <RouterProvider router={router} />
        </BaseUrlProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
