import { User } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'
import {
	formatBotStatus,
	formatProfileDate,
	formatUserRole
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
				<div className='flex items-start gap-4'>
					<div className='grid size-14 shrink-0 place-items-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]'>
						<User aria-hidden className='size-7' />
					</div>
					<div className='min-w-0'>
						<div className='text-sm font-medium text-[var(--muted)]'>
							Профиль
						</div>
						<h1 className='mt-1 truncate text-3xl font-semibold tracking-normal'>
							@{profile.username}
						</h1>
					</div>
				</div>

				<div className='grid gap-3 sm:grid-cols-2'>
					<ProfileField label='Username' value={profile.username} />
					<ProfileField
						label='Статус бота'
						value={formatBotStatus(profile.botStatus)}
					/>
					<ProfileField
						label='Роль'
						value={formatUserRole(profile.role)}
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
