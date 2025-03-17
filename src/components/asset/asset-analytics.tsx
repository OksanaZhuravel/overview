import {
	calculatePercentageChange,
	calculateTotalValue,
} from '@/lib/calculateAsset'
import { AnalyticsProps } from '@/types'

export const AssetAnalytics = ({ assets }: AnalyticsProps) => {
	const totalValue = calculateTotalValue(assets)
	const percentageChanges = assets.map((asset) => ({
		assetName: asset.name,
		percentageChange: calculatePercentageChange(asset),
	}))

	return (
		<div className='portfolio-analytics'>
			<h2>Portfolio Analytics</h2>
			<div className='analytics-metrics'>
				<p>Total Value: ${totalValue.toFixed(2)}</p>
				<h3>Percentage Changes:</h3>
				<ul>
					{percentageChanges.map((change, index) => (
						<li key={index}>
							{change.assetName}: {change.percentageChange.toFixed(2)}%
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
