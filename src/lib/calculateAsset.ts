import { Asset } from '@/types'

function calculateTotalValue(assets: Asset[]): number {
	return assets.reduce(
		(total, asset) => total + asset.quantity * asset.currentPrice,
		0
	)
}

function calculatePortfolioShare(assets: Asset[], totalValue: number): Asset[] {
	return assets.map((asset) => ({
		...asset,
		portfolioShare: ((asset.quantity * asset.currentPrice) / totalValue) * 100,
	}))
}

export { calculatePortfolioShare, calculateTotalValue }
