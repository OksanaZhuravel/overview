import useWebSocket from '@/hooks/useWebSocket'
import { calculateTotalValue } from '@/lib/calculateAsset'
import { AnalyticsProps } from '@/types'
import { useEffect, useState } from 'react'

export const AssetAnalytics = ({ assets }: AnalyticsProps) => {
	const symbols = assets.map((asset) => asset.symbol)
	const priceData = useWebSocket(symbols)
	const [percentageChanges, setPercentageChanges] = useState<
		{ assetName: string; percentageChange: number }[]
	>([])

	useEffect(() => {
		const changes = assets.map((asset) => ({
			assetName: asset.name,
			percentageChange: priceData[asset.symbol]?.changePercentage || 0,
		}))
		setPercentageChanges(changes)
	}, [priceData, assets])

	const totalValue = calculateTotalValue(assets)

	return (
		<div className='pb-15 w-full flex flex-col items-center gap-4'>
			<h2 className='text-2xl text-accent font-semibold'>Данные портфеля</h2>
			{/* <div className=''> */}
			<p className='font-semibold'>
				Общая сумма активов:{' '}
				<span className='text-accent font-black'>${totalValue.toFixed(2)}</span>
			</p>
			<h3 className='text-xl'>Изменения за 24 ч.</h3>
			{percentageChanges.length > 0 ? (
				<ul>
					{percentageChanges.map((change, index) => (
						<li key={index}>
							{change.assetName}: {change.percentageChange.toFixed(2)}%
						</li>
					))}
				</ul>
			) : (
				<p className='text-emerald-600'>Нет данных для отображения.</p>
			)}
		</div>
		// </div>
	)
}
