export interface Asset {
	id: string
	name: string
	symbol: string // Добавляем symbol
	quantity: number
	currentPrice: number
	totalValue: number
	changePercentage: number
	portfolioShare: number
	previousPrice: number
}

export interface AllAssets {
	totalValue: number
	assets: Asset[]
	totalChangePercentage: number
}

export interface AnalyticsProps {
	assets: Asset[]
	totalValue: number // Добавляем totalValue
}
export interface AssetListProps {
	assets: Asset[]
	prices: Record<string, any> // Добавляем prices
	onDeleteAsset: (id: string) => void
	totalValue: number
}
export interface AssetItemProps {
	asset: Asset
	onDelete: (id: string) => void
}

export interface AssetFormProps {
	onAddAsset: (asset: Asset) => void
}

export interface SymbolInfo {
	symbol: string
	baseAsset: string
	currentPrice: number
	change24h: number
}
