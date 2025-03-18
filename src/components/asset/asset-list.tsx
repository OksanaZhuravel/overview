import { AssetForm } from '@/components/asset/asset-form'
import { AssetItem } from '@/components/asset/asset-item'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { AssetListProps } from '@/types'
import { Bitcoin } from 'lucide-react'

export const AssetList = ({
	assets,
	onDeleteAsset,
	onAddAsset,
}: AssetListProps) => {
	return (
		<div className='w-full flex flex-col gap-4 items-center'>
			{assets.length === 0 ? (
				<>
					<p>У вас нет активов</p>
					<Dialog>
						<DialogTrigger className='flex gap-2 cursor-pointer border border-accent rounded-md px-4 py-1 text-center hover:bg-accent hover:text-white'>
							Добавить актив в портфель
							<Bitcoin />
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Выбрать и добавить актив из списка</DialogTitle>
								<DialogDescription asChild>
									<AssetForm onAddAsset={onAddAsset} />
								</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</>
			) : (
				<Table>
					<TableHeader>
						<TableRow className='hover:bg-transparent'>
							<TableHead>Актив</TableHead>
							<TableHead>Количество</TableHead>
							<TableHead>Цена</TableHead>
							<TableHead>Общая стоимость</TableHead>
							<TableHead>Изменение</TableHead>
							<TableHead>Доля в портфеле</TableHead>
							<TableHead>Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{assets.map((asset) => (
							<AssetItem
								key={asset.id}
								asset={asset}
								onDelete={onDeleteAsset}
							/>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	)
}

export default AssetList
