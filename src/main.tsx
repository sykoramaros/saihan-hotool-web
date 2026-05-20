import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { routeTree } from "./routeTree.gen"
import { LanguageProvider } from "./context/LanguageProvider"
import { BaseUrlProvider } from "./context/BaseUrlProvider"
import "./index.css"

const client = new ApolloClient({
  uri: "https://strapi-saihan-hotool.marosh.uk/graphql",
  cache: new InMemoryCache(),
})

const BASE_URL = "https://strapi-saihan-hotool.marosh.uk"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <ApolloProvider client={client}>
        <BaseUrlProvider value={BASE_URL}>
          <RouterProvider router={router} />
        </BaseUrlProvider>
      </ApolloProvider>
    </LanguageProvider>
  </StrictMode>,
)
