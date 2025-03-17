// import React from 'react'
// import { AssetItemProps } from '@/types'

// const AssetItem: React.FC<AssetItemProps> = ({ asset, onDelete }) => {
// 	return (
// 		<div className='asset-item'>
// 			<p>{asset.name}</p>
// 			<p>{asset.quantity}</p>
// 			<p>{asset.currentPrice}</p>
// 			<p>{asset.totalValue}</p>
// 			<p>{asset.changePercentage}%</p>
// 			<p>{asset.portfolioShare}%</p>
// 			<button onClick={() => onDelete(asset.id)}>Delete</button>
// 		</div>
// 	)
// }

// export default AssetItem

import { AssetItemProps } from '@/types'

export const AssetItem = ({ asset, onDelete }: AssetItemProps) => {
	return (
		<div className='asset-item'>
			<p>
				{asset.name} ({asset.symbol})
			</p>
			<p>{asset.quantity}</p>
			<p>${asset.currentPrice.toFixed(2)}</p>
			<p>${asset.totalValue.toFixed(2)}</p>
			<p>{asset.changePercentage.toFixed(2)}%</p>
			<p>{asset.portfolioShare}%</p>
			<button onClick={() => onDelete(asset.id)}>Delete</button>
		</div>
	)
}
