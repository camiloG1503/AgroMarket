import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

// Exportar explícitamente el contexto
export const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = useCallback((item) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
    }
  }, [removeFromCart])

  const clearCart = useCallback(() => setItems([]), [])

  const getTotalItems = useCallback(() =>
    items.reduce((sum, item) => sum + item.quantity, 0)
  , [items])

  const getTotalPrice = useMemo(() =>
    items.reduce((total, item) => total + (item.price * item.quantity), 0)
  , [items])

  const value = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  }), [items, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}

// Export agrupado opcional
export { useCart as UseCartHook }