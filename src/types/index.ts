import { ChangeEvent } from 'react'

export interface Asset {
	id: string
	name: string
	symbol: string
	quantity: number
	currentPrice: number
	totalValue: number
	changePercentage: number
	portfolioShare: number
}

export interface AnalyticsProps {
	totalValue: number
}
export interface AssetListProps {
	assets: Asset[]
	prices: Record<string, any> // Добавляем prices
	onDeleteAsset: (id: string) => void
	totalValue: number
	onAddAsset: (asset: Asset) => void
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

export interface AssetSelectProps {
	field: {
		onChange: (event: ChangeEvent<HTMLInputElement>) => void
		value: string
	}
	onSelect: (value: string) => void
	value?: string
}
