import { createContext, useContext } from "react"

interface BaseUrlContextType {
  baseUrl: string
}

export const BaseUrlContext = createContext<BaseUrlContextType | null>(null)

export const BaseUrlProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: string
}) => {
  return (
    <BaseUrlContext.Provider value={{ baseUrl: value }}>
      {children}
    </BaseUrlContext.Provider>
  )
}

export const useBaseUrl = () => {
  const context = useContext(BaseUrlContext)
  if (!context) throw new Error("useBaseUrl must be used within a BaseUrlProvider")
  return context
}
