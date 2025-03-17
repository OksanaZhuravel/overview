import { useEffect, useRef, useState } from 'react'

const useWebSocket = (symbols: string[]) => {
	const [priceData, setPriceData] = useState<Record<string, any>>({})
	const socketRef = useRef<WebSocket | null>(null)

	useEffect(() => {
		if (!symbols.length) return
		if (symbols.length === 0) {
			console.error('Ошибка: список символов пуст!')
			return
		}
		const streams = symbols.map((s) => `${s.toLowerCase()}@ticker`).join(',')
		const url = `wss://stream.binance.com:9443/stream?streams=${streams}`
		console.log('Connecting to:', url)

		socketRef.current = new WebSocket(url)

		socketRef.current.onopen = () => console.log('WebSocket открыт')
		socketRef.current.onmessage = (event) => {
			const message = JSON.parse(event.data)
			if (message.data && message.data.s) {
				setPriceData((prev) => ({
					...prev,
					[message.data.s]: {
						currentPrice: parseFloat(message.data.c),
						changePercentage: parseFloat(message.data.P),
					},
				}))
			}
		}
		socketRef.current.onclose = () => console.log('WebSocket закрыт')

		return () => socketRef.current?.close()
	}, [symbols])

	return priceData
}

export default useWebSocket
