'use client'

import { Card, CardContent } from '@/shared/ui/card'
import { Loader } from '@/shared/ui/loader'
import { ProfileCard, useProfile } from '@/modules/profile'

export function ProfileOverview() {
	const profileQuery = useProfile()

	return (
		<main className='min-h-dvh bg-[var(--background)] px-4 py-5 text-[var(--foreground)] sm:px-6'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-5'>
				{profileQuery.isPending ? (
					<section className='grid min-h-[520px] place-items-center'>
						<Loader label='Загружаем профиль' />
					</section>
				) : null}

				{profileQuery.isError ? (
					<Card className='border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger-text)] shadow-none'>
						<CardContent>
							<div className='font-semibold'>
								Не получилось загрузить профиль
							</div>
							<p className='mt-1 text-sm'>
								Открой приложение заново и попробуй еще раз.
							</p>
						</CardContent>
					</Card>
				) : null}

				{profileQuery.data ? (
					<ProfileCard profile={profileQuery.data} />
				) : null}
			</div>
		</main>
	)
}
