import { createContext } from 'react'

interface EditorContextProps {
  openTabs: boolean[]
  setOpenTabs: (arg0: boolean[]) => void
  openMobileTab: string
  setOpenMobileTab: (arg0: string) => void
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
)
