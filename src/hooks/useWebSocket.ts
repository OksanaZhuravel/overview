import { useEffect, useRef, useState } from 'react'

const useWebSocket = (symbols: string[]) => {
	const [priceData, setPriceData] = useState<Record<string, any>>({})
	const socketRefs = useRef<Record<string, WebSocket>>({})

	useEffect(() => {
		const newSymbols = symbols.filter((symbol) => !socketRefs.current[symbol])
		const removedSymbols = Object.keys(socketRefs.current).filter(
			(symbol) => !symbols.includes(symbol)
		)

		// Открываем новые соединения
		newSymbols.forEach((symbol) => {
			const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`
			console.log('Connecting to:', url)

			const socket = new WebSocket(url)
			socketRefs.current[symbol] = socket

			socket.onopen = () => console.log(`WebSocket открыт для ${symbol}`)
			socket.onmessage = (event) => {
				const message = JSON.parse(event.data)
				if (message.s) {
					setPriceData((prev) => ({
						...prev,
						[message.s]: {
							currentPrice: parseFloat(message.c),
							changePercentage: parseFloat(message.P),
						},
					}))
				}
			}
			socket.onclose = () => console.log(`WebSocket закрыт для ${symbol}`)
		})

		// Закрываем удаленные соединения
		removedSymbols.forEach((symbol) => {
			socketRefs.current[symbol].close()
			delete socketRefs.current[symbol]
		})

		return () => {
			Object.values(socketRefs.current).forEach((socket) => socket.close())
		}
	}, [symbols])

	return priceData
}

export default useWebSocket
