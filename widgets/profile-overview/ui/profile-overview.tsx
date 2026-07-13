import { ProfileCard, type UserProfile } from '@/modules/profile'

interface ProfileOverviewProps {
	profile: UserProfile
}

export function ProfileOverview({ profile }: ProfileOverviewProps) {
	return (
		<section>
			<ProfileCard profile={profile} />
		</section>
	)
}
