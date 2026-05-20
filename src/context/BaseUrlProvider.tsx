import { createContext, useContext } from "react"

export const BaseUrlContext = createContext("")

export const BaseUrlProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: string
}) => {
  return <BaseUrlContext.Provider value={value}>{children}</BaseUrlContext.Provider>
}

export const useBaseUrl = () => useContext(BaseUrlContext)
