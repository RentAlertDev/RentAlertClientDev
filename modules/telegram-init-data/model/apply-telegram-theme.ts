import type { TelegramThemeParams } from './types'

const themeVariableMap: Record<keyof TelegramThemeParams, string> = {
	bg_color: '--tg-theme-bg-color',
	text_color: '--tg-theme-text-color',
	hint_color: '--tg-theme-hint-color',
	link_color: '--tg-theme-link-color',
	button_color: '--tg-theme-button-color',
	button_text_color: '--tg-theme-button-text-color',
	secondary_bg_color: '--tg-theme-secondary-bg-color',
	header_bg_color: '--tg-theme-header-bg-color',
	bottom_bar_bg_color: '--tg-theme-bottom-bar-bg-color',
	accent_text_color: '--tg-theme-accent-text-color',
	section_bg_color: '--tg-theme-section-bg-color',
	section_header_text_color: '--tg-theme-section-header-text-color',
	subtitle_text_color: '--tg-theme-subtitle-text-color',
	destructive_text_color: '--tg-theme-destructive-text-color'
}

export function applyTelegramTheme(themeParams: TelegramThemeParams) {
	const root = document.documentElement

	Object.entries(themeVariableMap).forEach(([themeKey, variableName]) => {
		const value = themeParams[themeKey as keyof TelegramThemeParams]

		if (value) {
			root.style.setProperty(variableName, value)
		}
	})

	root.style.setProperty(
		'--background',
		themeParams.bg_color ?? 'var(--tg-theme-bg-color, #ffffff)'
	)
	root.style.setProperty(
		'--foreground',
		themeParams.text_color ?? 'var(--tg-theme-text-color, #171717)'
	)
}
