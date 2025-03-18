import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { AssetItemProps } from '@/types'
import { Trash2 } from 'lucide-react'
export const AssetItem = ({ asset, onDelete }: AssetItemProps) => {
	return (
		<TableRow>
			<TableCell className='font-medium text-accent'>{asset.name}</TableCell>
			<TableCell>{asset.quantity}</TableCell>
			<TableCell>{asset.currentPrice.toFixed(2)}$</TableCell>
			<TableCell>{asset.totalValue.toFixed(2)}$</TableCell>
			<TableCell
				className={cn(
					asset.changePercentage < 0 ? 'text-red-700' : 'text-green-600'
				)}
			>
				{asset.changePercentage.toFixed(2)}%
			</TableCell>
			<TableCell>{asset.portfolioShare.toFixed(2)}%</TableCell>
			<TableCell className='text-right'>
				<Button
					size={'sm'}
					variant={'outline'}
					onClick={() => onDelete(asset.id)}
				>
					<Trash2 />
				</Button>
			</TableCell>
		</TableRow>
	)
}
