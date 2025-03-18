'use client'

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
		setAssets((prevAssets) => {
			const existingAsset = prevAssets.find(
				(asset) => asset.symbol === newAsset.symbol
			)
			if (existingAsset) {
				const updatedAssets = prevAssets.map((asset) =>
					asset.symbol === newAsset.symbol
						? {
								...asset,
								quantity: asset.quantity + newAsset.quantity,
								totalValue:
									(asset.quantity + newAsset.quantity) * newAsset.currentPrice,
						  }
						: asset
				)
				return updatedAssets
			} else {
				return [...prevAssets, newAsset]
			}
		})
	}

	const handleDeleteAsset = (assetId: string) => {
		setAssets((prev) => prev.filter((asset) => asset.id !== assetId))
	}

	// Общая стоимость портфеля
	const allValue = assets.reduce((sum, asset) => {
		const price = prices[asset.symbol]?.currentPrice || asset.currentPrice
		return sum + asset.quantity * price
	}, 0)

	// Обновляем долю в портфеле для каждого актива
	const updatedAssets = assets.map((asset) => {
		const currentPrice =
			prices[asset.symbol]?.currentPrice || asset.currentPrice
		const totalAssetValue = asset.quantity * currentPrice
		const portfolioShare = allValue ? (totalAssetValue / allValue) * 100 : 0
		return {
			...asset,
			currentPrice,
			totalValue: totalAssetValue,
			portfolioShare,
		}
	})

	return (
		<div className='w-full h-screen p-4 flex flex-col items-center gap-2 xl:gap-7 relative'>
			<div className='flex-col md:flex-row flex justify-between w-full items-center pb-2 md:pb-8 bg-grey-400  xl:p-10 '>
				<h1 className='md:text-2xl font-bold'>Ваши Активы</h1>
				<Dialog>
					<DialogTrigger className='flex gap-2 cursor-pointer border border-accent rounded-md px-4 py-1 text-center hover:bg-accent hover:text-white'>
						Добавить
						<Bitcoin />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Добавить актив</DialogTitle>
							<DialogDescription asChild>
								<AssetForm onAddAsset={handleAddAsset} />
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
			<div className='md:px-10 px-0 xl:px-20 w-full h-full flex flex-col justify-between items-center'>
				<AssetList
					assets={updatedAssets}
					prices={prices}
					totalValue={allValue}
					onDeleteAsset={handleDeleteAsset}
					onAddAsset={handleAddAsset}
				/>
				<div className='pb-4 md:pb-15 w-full flex flex-col items-center gap-4'>
					<h2 className='font-bold md:text-3xl'>
						Общая сумма активов:{' '}
						<span className='text-accent font-black'>
							${allValue.toFixed(4)}
						</span>
					</h2>
				</div>
			</div>
			<Decor />
		</div>
	)
}

export default Home
