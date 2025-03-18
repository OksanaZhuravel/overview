'use client'
import useSymbolStore from '@/store/useSymbolStore'
import { AssetSelectProps, SymbolInfo } from '@/types'
import { ChangeEvent, useEffect, useState } from 'react'
import { FormControl, FormItem } from '../ui/form'
import { Input } from '../ui/input'

export const AssetSelect = ({ field, onSelect, value }: AssetSelectProps) => {
	const [search, setSearch] = useState('')
	const [showList, setShowList] = useState(false)

	const symbols = useSymbolStore((state) => state.symbols)

	// Сортируем символы по проценту изменений
	const sortedSymbols = symbols.sort((a, b) => b.change24h - a.change24h)

	// Фильтруем символы по введенному значению
	const filteredSymbols = sortedSymbols.filter((symbol: SymbolInfo) => {
		return symbol.baseAsset.toLowerCase().startsWith(search.toLowerCase())
	})

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
		field.onChange(event)
		setShowList(true)
	}

	const handleClick = () => {
		setShowList(true)
	}

	const handleSymbolClick = (symbol: SymbolInfo) => {
		setSearch(symbol.symbol)
		onSelect(symbol.symbol)
		setShowList(false)
	}
  // Сброс состояния при изменении значения поля
    useEffect(() => {
        if (value === '') {
            setSearch('')
            setShowList(false)
        }
    }, [value])
		
	return (
		<FormItem className='relative px-0'>
			<FormControl>
				<Input
					{...field}
					placeholder='Поиск валюты...'
					onChange={handleInputChange}
					onClick={handleClick}
					value={search}
					className=''
				/>
			</FormControl>
			{showList && (
				<div className=' absolute left-0 top-full z-20 max-h-[25svh] w-full overflow-y-auto bg-white shadow-md rounded-md'>
					{filteredSymbols.map((symbol: SymbolInfo) => (
						<div
							key={symbol.symbol}
							onClick={() => handleSymbolClick(symbol)}
							className='cursor-pointer hover:bg-gray-100 px-4 py-2  flex items-center justify-between w-full rounded-md'
						>
							<p className='flex flex-col gap-1'>
								<span className='text-[9px]'>Валюта</span>
								{''}
								{symbol.baseAsset}
							</p>
							<p className='flex flex-col gap-1'>
								<span className='text-[9px]'>Стоимость $</span>
								{''}
								{symbol.currentPrice.toFixed(2)}
							</p>
							<p className='flex flex-col gap-1'>
								<span className='text-[9px]'>Изм. за 24 ч. </span>
								{''}
								{symbol.change24h}%
							</p>
						</div>
					))}
				</div>
			)}
		</FormItem>
	)
}
