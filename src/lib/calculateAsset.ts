import { Asset } from '@/types'

function calculateTotalValue(assets: Asset[]): number {
	return assets.reduce(
		(total, asset) => total + asset.quantity * asset.currentPrice,
		0
	)
}

function calculatePercentageChange(asset: Asset): number {
	return (
		((asset.currentPrice - asset.previousPrice) / asset.previousPrice) * 100
	)
}

function calculatePortfolioShare(assets: Asset[], totalValue: number): Asset[] {
	return assets.map((asset) => ({
		...asset,
		portfolioShare: ((asset.quantity * asset.currentPrice) / totalValue) * 100,
	}))
}

export {
	calculatePercentageChange,
	calculatePortfolioShare,
	calculateTotalValue,
}
