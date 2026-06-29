import type { Metadata } from 'next'
import { AppShell } from '@/widgets/app-shell'
import { TelegramAuthGate } from '@/widgets/telegram-auth-gate'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
	title: 'RentAlert',
	description: 'Поиск квартир'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className='min-h-full flex flex-col'>
				<Providers>
					<TelegramAuthGate>
						<AppShell>{children}</AppShell>
					</TelegramAuthGate>
				</Providers>
			</body>
		</html>
	)
}
