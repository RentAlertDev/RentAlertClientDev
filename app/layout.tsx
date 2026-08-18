import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { AppShell } from '@/widgets/app-shell'
import { TelegramAuthGate } from '@/widgets/telegram-auth-gate'
import { Providers } from './providers'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('common.meta')

	return {
		title: t('title'),
		description: t('description')
	}
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className='min-h-full flex flex-col'>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Providers>
						<TelegramAuthGate>
							<AppShell>{children}</AppShell>
						</TelegramAuthGate>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
