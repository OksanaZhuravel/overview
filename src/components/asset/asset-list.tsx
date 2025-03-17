import { AssetItem } from '@/components/asset/asset-item'
import { AssetListProps } from '@/types'

export const AssetList = ({ assets, onDeleteAsset }: AssetListProps) => {
	return (
		<div className='asset-list'>
			{assets.length === 0 ? (
				<div className=''>
					<p>У вас нет активов</p>
					<p>Добавить актив в портфель</p>
				</div>
			) : (
				assets.map((asset) => (
					<AssetItem key={asset.id} asset={asset} onDelete={onDeleteAsset} />
				))
			)}
		</div>
	)
}

export default AssetList

// import { AssetListProps } from '@/types'
// import React from 'react'
// import { AutoSizer, List } from 'react-virtualized'

// export const AssetList: React.FC<AssetListProps> = ({
// 	assets,
// 	prices,
// 	totalValue,
// 	onDeleteAsset,
// }) => {
// 	const rowRenderer = ({ index, key, style }: any) => {
// 		const asset = assets[index]
// 		const price = prices[asset.symbol]?.currentPrice || 0
// 		const changePercentage = prices[asset.symbol]?.changePercentage || 0
// 		const totalAssetValue = asset.quantity * price
// 		const portfolioShare = totalValue
// 			? parseFloat(((totalAssetValue / totalValue) * 100).toFixed(2))
// 			: 0

// 		return (
// 			<div key={key} style={style}>
// 				<AssetItem
// 					asset={{
// 						...asset,
// 						currentPrice: price,
// 						totalValue: totalAssetValue,
// 						changePercentage,
// 						portfolioShare,
// 					}}
// 					onDelete={onDeleteAsset}
// 				/>
// 			</div>
// 		)
// 	}

// 	return (
// 		<AutoSizer>
// 			{({ height, width }) => (
// 				<List
// 					width={width}
// 					height={height}
// 					rowCount={assets.length}
// 					rowHeight={50}
// 					rowRenderer={rowRenderer}
// 				/>
// 			)}
// 		</AutoSizer>
// 	)
// }
