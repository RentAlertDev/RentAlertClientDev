import { ApartmentsFeed } from '@/widgets/apartments-feed'
import { TelegramAuthGate } from '@/widgets/telegram-auth-gate'

export default function Home() {
	return (
		<TelegramAuthGate>
			<ApartmentsFeed />
		</TelegramAuthGate>
	)
}
