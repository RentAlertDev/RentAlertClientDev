import { Heart } from 'lucide-react'

export default function FavoritesPage() {
	return (
		<main className='grid min-h-dvh place-items-center bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<section className='mx-auto flex w-full max-w-md flex-col items-center rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-6 text-center shadow-[0_14px_40px_var(--card-shadow)]'>
				<div className='grid size-14 place-items-center rounded-full bg-[var(--card-muted)] text-[var(--muted)]'>
					<Heart aria-hidden className='size-7' />
				</div>
				<h1 className='mt-4 text-2xl font-semibold tracking-normal'>
					А нет тут ничего:D
				</h1>
				<p className='mt-2 text-sm font-medium text-[var(--muted)]'>
					Это заглушка парень
				</p>
			</section>
		</main>
	)
}
