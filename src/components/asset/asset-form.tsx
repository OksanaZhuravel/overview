import useBinanceSymbols from '@/hooks/useBinanceSymbols'
import { Asset, AssetFormProps } from '@/types'
import { useState } from 'react'
import { Button } from '../ui/button'

export const AssetForm = ({ onAddAsset }: AssetFormProps) => {
	const symbols = useBinanceSymbols()

	const [symbol, setSymbol] = useState('')
	const [quantity, setQuantity] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const selectedSymbol = symbols.find((s) => s.symbol === symbol)
		if (!selectedSymbol) return

		const newAsset: Asset = {
			id: crypto.randomUUID(),
			name: selectedSymbol.baseAsset,
			symbol: selectedSymbol.symbol,
			quantity: parseFloat(quantity),
			currentPrice: selectedSymbol.currentPrice,
			totalValue: parseFloat(quantity) * selectedSymbol.currentPrice,
			changePercentage: selectedSymbol.change24h,
			portfolioShare: 0,
			previousPrice: 0,
		}
		onAddAsset(newAsset)
		setSymbol('')
		setQuantity('')
	}

	return (
		<form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
			<select
				value={symbol}
				onChange={(e) => setSymbol(e.target.value)}
				required
			>
				<option value='' disabled>
					Найти актив и добавить
				</option>
				{symbols.map((s) => (
					<option key={s.symbol} value={s.symbol}>
						{s.symbol} ({s.baseAsset}) - ${s.currentPrice.toFixed(2)} (
						{s.change24h}%)
					</option>
				))}
			</select>
			<input
				type='number'
				placeholder='Quantity'
				value={quantity}
				onChange={(e) => setQuantity(e.target.value)}
				required
			/>

			<Button type='submit'>добавить</Button>
		</form>
	)
}
