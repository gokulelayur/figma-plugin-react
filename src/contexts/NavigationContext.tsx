import { h, createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'

// Define your app states/pages
export type AppState = 'landing' | 'analysis' | 'settings' | 'results'

interface NavigationContextType {
  currentPage: AppState
  navigate: (page: AppState) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

interface NavigationProviderProps {
  children: h.JSX.Element
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentPage, setCurrentPage] = useState<AppState>('landing')

  const navigate = (page: AppState) => {
    setCurrentPage(page)
  }

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
} 