'use client'

import { AssetAnalytics } from '@/components/asset/asset-analytics'
import { AssetForm } from '@/components/asset/asset-form'
import { AssetList } from '@/components/asset/asset-list'
import { Decor } from '@/components/ui/decor/decor'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import useWebSocket from '@/hooks/useWebSocket'
import {
	getAssetsFromLocalStorage,
	saveAssetsToLocalStorage,
} from '@/lib/localStorageAsset'
import { Asset } from '@/types'
import { Bitcoin } from 'lucide-react'
import { useEffect, useState } from 'react'

const Home = () => {
	const [assets, setAssets] = useState<Asset[]>([])
	const assetSymbols = assets.map((asset) => asset.symbol)
	const prices = useWebSocket(assetSymbols) // Получаем данные из WebSocket

	useEffect(() => {
		const storedAssets = getAssetsFromLocalStorage()
		if (storedAssets) {
			setAssets(storedAssets)
		}
	}, [])

	useEffect(() => {
		saveAssetsToLocalStorage(assets)
	}, [assets])

	const handleAddAsset = (newAsset: Asset) => {
		setAssets((prev) => [...prev, newAsset])
	}

	const handleDeleteAsset = (assetId: string) => {
		setAssets((prev) => prev.filter((asset) => asset.id !== assetId))
	}

	// Общая стоимость портфеля
	const totalPortfolioValue = assets.reduce((sum, asset) => {
		const price = prices[asset.symbol]?.currentPrice || 0
		return sum + asset.quantity * price
	}, 0)

	return (
		<div className='w-full h-screen p-20 flex flex-col items-center gap-7 relative'>
			<h1 className='text-2xl font-bold'>Ваши Активы</h1>
			<Popover>
				<PopoverTrigger className='flex gap-2 cursor-pointer border border-accent rounded-md px-4 py-1 text-center'>
					Добавить
					<Bitcoin />
				</PopoverTrigger>
				<PopoverContent>
					<AssetForm onAddAsset={handleAddAsset} />
				</PopoverContent>
			</Popover>

			<AssetAnalytics assets={assets} totalValue={totalPortfolioValue} />

			<AssetList
				assets={assets}
				prices={prices}
				totalValue={totalPortfolioValue}
				onDeleteAsset={handleDeleteAsset}
			/>
			<Decor />
		</div>
	)
}

export default Home
