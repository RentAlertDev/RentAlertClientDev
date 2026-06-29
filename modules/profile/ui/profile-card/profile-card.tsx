import { Bot, Clock3, ShieldCheck, User } from 'lucide-react'
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

				<div className='grid grid-cols-3 gap-2 text-center'>
					<div className='rounded-md bg-[var(--card-muted)] p-3'>
						<Bot
							aria-hidden
							className='mx-auto mb-1 size-5 text-[var(--muted)]'
						/>
						<div className='text-xs font-semibold'>
							{profile.botStatus}
						</div>
					</div>
					<div className='rounded-md bg-[var(--card-muted)] p-3'>
						<ShieldCheck
							aria-hidden
							className='mx-auto mb-1 size-5 text-[var(--muted)]'
						/>
						<div className='text-xs font-semibold'>
							{profile.role}
						</div>
					</div>
					<div className='rounded-md bg-[var(--card-muted)] p-3'>
						<Clock3
							aria-hidden
							className='mx-auto mb-1 size-5 text-[var(--muted)]'
						/>
						<div className='text-xs font-semibold'>Аккаунт</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
