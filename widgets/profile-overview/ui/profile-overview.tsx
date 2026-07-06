'use client'

import { ProfileCard, useProfile } from '@/modules/profile'
import { Card, CardContent } from '@/shared/ui/card'
import { Loader } from '@/shared/ui/loader'

export function ProfileOverview() {
	const profileQuery = useProfile()

	return (
		<section>
			{profileQuery.isPending ? (
				<div className='grid min-h-[320px] place-items-center'>
					<Loader label='Загружаем профиль' />
				</div>
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
		</section>
	)
}
