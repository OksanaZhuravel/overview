import { SymbolInfo } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useBinanceSymbols = () => {
	const [symbols, setSymbols] = useState<SymbolInfo[]>([])

	useEffect(() => {
		const fetchSymbols = async () => {
			try {
				const response = await axios.get(
					'https://api.binance.com/api/v3/exchangeInfo'
				)
				const pairs = response.data.symbols
					.filter((s: any) => s.status === 'TRADING') // Берём только активные
					.map((s: any) => ({
						symbol: s.symbol,
						baseAsset: s.baseAsset,
					}))

				const tickersResponse = await axios.get(
					'https://api.binance.com/api/v3/ticker/24hr'
				)
				const tickers = tickersResponse.data

				const symbolsWithPrices = pairs.map((pair: any) => {
					const ticker = tickers.find((t: any) => t.symbol === pair.symbol)
					return {
						...pair,
						currentPrice: ticker ? parseFloat(ticker.lastPrice) : 0,
						change24h: ticker ? parseFloat(ticker.priceChangePercent) : 0,
					}
				})

				setSymbols(symbolsWithPrices)
			} catch (error) {
				console.error('Ошибка при получении символов Binance:', error)
			}
		}

		fetchSymbols()
	}, [])

	return symbols
}

export default useBinanceSymbols
