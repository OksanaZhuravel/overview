import { SymbolInfo } from '@/types'
import { create } from 'zustand'

interface SymbolStore {
	symbols: SymbolInfo[]
	setSymbols: (symbols: SymbolInfo[]) => void
}

const useSymbolStore = create<SymbolStore>((set) => ({
	symbols: [],
	setSymbols: (symbols) => set({ symbols }),
}))

export default useSymbolStore
