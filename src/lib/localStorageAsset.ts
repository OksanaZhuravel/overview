import { Asset } from '@/types'

function saveAssetsToLocalStorage(assets: Asset[]): void {
	localStorage.setItem('assets', JSON.stringify(assets))
}

function getAssetsFromLocalStorage(): Asset[] {
	const assets = localStorage.getItem('assets')
	return assets ? JSON.parse(assets) : []
}

function clearAssetsFromLocalStorage(): void {
	localStorage.removeItem('assets')
}

export {
	clearAssetsFromLocalStorage,
	getAssetsFromLocalStorage,
	saveAssetsToLocalStorage,
}
