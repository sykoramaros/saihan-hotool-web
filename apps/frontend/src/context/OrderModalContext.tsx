import { createContext, useContext } from "react"

const OrderModalContext = createContext<{ open: (room?: string) => void }>({ open: () => {} })

export const useOrderModal = () => useContext(OrderModalContext)

export const OrderModalProvider = ({ children, onOpen }: { children: React.ReactNode; onOpen: (room?: string) => void }) => (
  <OrderModalContext.Provider value={{ open: onOpen }}>
    {children}
  </OrderModalContext.Provider>
)
