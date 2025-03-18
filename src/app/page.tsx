'use client'

import { AssetAnalytics } from '@/components/asset/asset-analytics'
import { AssetForm } from '@/components/asset/asset-form'
import { AssetList } from '@/components/asset/asset-list'
import { Decor } from '@/components/ui/decor/decor'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import useBinanceSymbols from '@/hooks/useBinanceSymbols'
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
	useBinanceSymbols()

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
		const price = prices[asset.symbol]?.currentPrice || asset.currentPrice
		return sum + asset.quantity * price
	}, 0)

	// Обновляем долю в портфеле для каждого актива
	const updatedAssets = assets.map((asset) => {
		const currentPrice =
			prices[asset.symbol]?.currentPrice || asset.currentPrice
		const totalAssetValue = asset.quantity * currentPrice
		const portfolioShare = totalPortfolioValue
			? (totalAssetValue / totalPortfolioValue) * 100
			: 0
		return {
			...asset,
			currentPrice,
			totalValue: totalAssetValue,
			portfolioShare,
		}
	})

	return (
		<div className='w-full h-screen  flex flex-col items-center gap-7 relative'>
			<div className=' flex justify-between w-full items-center pb-8 bg-grey-400 p-20 '>
				<h1 className='text-2xl font-bold'>Ваши Активы</h1>

				<Dialog>
					<DialogTrigger className='flex gap-2 cursor-pointer border border-accent rounded-md px-4 py-1 text-center hover:bg-accent hover:text-white'>
						Добавить
						<Bitcoin />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Добавить актив из списка</DialogTitle>
							<DialogDescription asChild>
								<AssetForm onAddAsset={handleAddAsset} />
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
			<div className='px-20 w-full h-full flex flex-col justify-between items-center'>
				<AssetList
					assets={updatedAssets}
					prices={prices}
					totalValue={totalPortfolioValue}
					onDeleteAsset={handleDeleteAsset}
					onAddAsset={handleAddAsset}
				/>
				<AssetAnalytics assets={assets} totalValue={totalPortfolioValue} />
			</div>
			<Decor />
		</div>
	)
}

export default Home
