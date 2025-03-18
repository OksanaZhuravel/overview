import { AssetSelect } from '@/components/asset/asset-select'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useSymbolStore from '@/store/useSymbolStore'
import { Asset, AssetFormProps } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const assetSchema = z.object({
	symbol: z.string().nonempty('Выберите актив'),
	quantity: z.union([z.string(), z.number()]).refine(
		(val) => {
			const normalizedVal =
				typeof val === 'string' ? val.replace(',', '.') : val
			return !isNaN(Number(normalizedVal)) && Number(normalizedVal) > 0
		},
		{
			message: 'Количество должно быть положительным числом',
		}
	),
})

export const AssetForm = ({ onAddAsset }: AssetFormProps) => {
	const symbols = useSymbolStore((state) => state.symbols)

	const form = useForm<z.infer<typeof assetSchema>>({
		resolver: zodResolver(assetSchema),
		mode: 'onSubmit',
		defaultValues: {
			symbol: '',
			quantity: '',
		},
	})

	const { handleSubmit, reset } = form

	const onSubmit = (data: { symbol: string; quantity: string | number }) => {
		const selectedSymbol = symbols.find((s) => s.symbol === data.symbol)
		if (!selectedSymbol) return

		const normalizedQuantity =
			typeof data.quantity === 'string'
				? data.quantity.replace(',', '.')
				: data.quantity

		const newAsset: Asset = {
			id: crypto.randomUUID(),
			name: selectedSymbol.baseAsset,
			symbol: selectedSymbol.symbol,
			quantity: Number(normalizedQuantity),
			currentPrice: selectedSymbol.currentPrice,
			totalValue: Number(normalizedQuantity) * selectedSymbol.currentPrice,
			changePercentage: selectedSymbol.change24h,
			portfolioShare: 0,
		}
		onAddAsset(newAsset)
		reset()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-4'
			>
				<FormField
					control={form.control}
					name='symbol'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Валюта</FormLabel>
							<FormControl>
								<AssetSelect
									field={{ ...field, value: field.value || '' }}
									onSelect={(value) => field.onChange(value)}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='quantity'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Количество</FormLabel>
							<FormControl>
								<Input
									required
									type='text'
									placeholder='Количество'
									{...field}
									onChange={(e) => field.onChange(e.target.value)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex w-full items-center justify-between'>
					<Button type='submit'>Добавить</Button>
					<Button
						variant={'destructive'}
						type='reset'
						onClick={() => {
							reset({
								symbol: '',
								quantity: '',
							})
						}}
					>
						Сбросить
					</Button>
				</div>
			</form>
		</Form>
	)
}
