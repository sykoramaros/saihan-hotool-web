import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import "./styles/custom.scss"
import "./App.css"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { BaseUrlProvider } from "./context/BaseUrlProvider"

import { LanguageProvider } from "./context/LanguageProvider"

import Layout from "./Components/Layout/Layout"
import Home from "./Pages/Home/Home"

const client = new ApolloClient({
  uri: "https://strapi-saihan-hotool.marosh.uk/graphql",
  cache: new InMemoryCache(),
})

const BASE_URL = "https://strapi-saihan-hotool.marosh.uk"

const App = () => {
  return (
    <>
      <HashRouter>
        <LanguageProvider>
          <ApolloProvider client={client}>
            <BaseUrlProvider value={BASE_URL}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                </Route>
              </Routes>
            </BaseUrlProvider>
          </ApolloProvider>
        </LanguageProvider>
      </HashRouter>
    </>
  )
}

export default App
