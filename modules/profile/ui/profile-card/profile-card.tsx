import Image from 'next/image'
import { User } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'
import {
	formatBotStatus,
	formatProfileDate
} from '../../model/formatters'
import type { UserProfile } from '../../model/types'
import { ProfileField } from '../profile-field'

interface ProfileCardProps {
	profile: UserProfile
}

export function ProfileCard({ profile }: ProfileCardProps) {
	return (
		<Card className='shadow-none'>
			<CardContent className='space-y-5'>
				<div className='flex items-center gap-4'>
					<div className='grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] ring-2 ring-[var(--card-border)] ring-offset-2 ring-offset-[var(--card)]'>
						{profile.photoUrl ? (
							<Image
								alt={`@${profile.username}`}
								className='h-full w-full object-cover'
								height={64}
								src={profile.photoUrl}
								unoptimized
								width={64}
							/>
						) : (
							<User aria-hidden className='size-8' />
						)}
					</div>
					<div className='min-w-0'>
						<div className='text-sm font-medium text-[var(--muted)]'>
							Профиль
						</div>
						<h1 className='mt-1 truncate text-2xl font-semibold tracking-normal sm:text-3xl'>
							@{profile.username}
						</h1>
					</div>
				</div>

				<div className='grid gap-3 sm:grid-cols-2'>
					<ProfileField
						label='Статус бота'
						value={formatBotStatus(profile.botStatus)}
					/>
					<ProfileField
						label='Последний вход'
						value={formatProfileDate(profile.lastLogin)}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
