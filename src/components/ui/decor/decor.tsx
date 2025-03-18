'use client'
import { cn } from '@/lib/utils'
import {
	BadgeCent,
	BadgeDollarSign,
	BadgePercent,
	BadgeSwissFranc,
	Bitcoin,
	CircleDollarSign,
} from 'lucide-react'
import { JSX, useEffect, useState } from 'react'

const icons = [
	Bitcoin,
	BadgeCent,
	BadgeDollarSign,
	BadgePercent,
	BadgeSwissFranc,
	CircleDollarSign,
]

const positions = [
	{ top: 'top-10/12', right: 'right-80' },
	{ top: 'top-1/2', right: 'right-10' },
	{ bottom: 'bottom-0', right: 'left-10' },
	{ bottom: 'bottom-1/3', left: 'left-40' },
]

const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

const RandomIcon = ({ icon, position }: { icon: any; position: any }) => {
	const Icon = icon

	return (
		<Icon
			className={cn(
				'stroke-1 absolute w-20 h-20 text-accent hover:text-foreground hover:scale-105 transition-transform duration-500 ',
				position.top,
				position.left,
				position.right,
				position.bottom
			)}
		/>
	)
}

export const Decor = () => {
	const [iconSet, setIconSet] = useState<JSX.Element[]>([])

	useEffect(() => {
		const generateIcons = () => {
			const shuffledIcons = shuffleArray([...icons])
			const shuffledPositions = shuffleArray([...positions])
			const newIconSet = Array.from({ length: 4 }, (_, index) => (
				<RandomIcon
					key={index}
					icon={shuffledIcons[index]}
					position={shuffledPositions[index]}
				/>
			))
			setIconSet(newIconSet)
		}

		generateIcons()
		const interval = setInterval(generateIcons, 45000) // 45 секунд

		return () => clearInterval(interval)
	}, [])

	return <>{iconSet}</>
}
