import { createContext, useContext, useState } from "react"

const OrderModalContext = createContext<{ open: () => void }>({ open: () => {} })

export const useOrderModal = () => useContext(OrderModalContext)

export const OrderModalProvider = ({ children, onOpen }: { children: React.ReactNode; onOpen: () => void }) => (
  <OrderModalContext.Provider value={{ open: onOpen }}>
    {children}
  </OrderModalContext.Provider>
)
