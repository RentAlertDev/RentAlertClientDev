'use client'

import { useEffect, useState } from 'react'
import { applyTelegramTheme } from '../model/apply-telegram-theme'
import {
	TELEGRAM_INIT_DATA_ERRORS,
	TELEGRAM_SDK_SCRIPT_SELECTOR,
	TELEGRAM_SDK_SCRIPT_SRC,
	TELEGRAM_WEB_APP_DATA_PARAM
} from '../model/constants'
import {
	TelegramScriptStatus,
	type TelegramInitDataState
} from '../model/types'

const initialState: TelegramInitDataState = {
	currentUrl: '',
	hasTelegramGlobal: false,
	hasTelegramWebApp: false,
	hasTgWebAppDataInUrl: false,
	isWebAppAvailable: false,
	initData: '',
	scriptStatus: TelegramScriptStatus.Idle,
	themeParams: {},
	userAgent: ''
}

function loadTelegramScript() {
	return new Promise<void>((resolve, reject) => {
		const existingScript = document.querySelector<HTMLScriptElement>(
			TELEGRAM_SDK_SCRIPT_SELECTOR
		)

		if (existingScript) {
			if (
				window.Telegram?.WebApp ||
				existingScript.dataset.loaded === 'true'
			) {
				resolve()
				return
			}

			existingScript.addEventListener('load', () => resolve(), {
				once: true
			})
			existingScript.addEventListener(
				'error',
				() =>
					reject(new Error(TELEGRAM_INIT_DATA_ERRORS.sdkLoadFailed)),
				{ once: true }
			)
			return
		}

		const script = document.createElement('script')

		script.src = TELEGRAM_SDK_SCRIPT_SRC
		script.async = true
		script.onload = () => {
			script.dataset.loaded = 'true'
			resolve()
		}
		script.onerror = () =>
			reject(new Error(TELEGRAM_INIT_DATA_ERRORS.sdkLoadFailed))

		document.head.append(script)
	})
}

function getBaseState() {
	const currentUrl = window.location.href

	return {
		...initialState,
		currentUrl,
		hasTelegramGlobal: Boolean(window.Telegram),
		hasTelegramWebApp: Boolean(window.Telegram?.WebApp),
		hasTgWebAppDataInUrl: currentUrl.includes(TELEGRAM_WEB_APP_DATA_PARAM),
		userAgent: window.navigator.userAgent
	}
}

export function useTelegramInitData() {
	const [telegram, setTelegram] =
		useState<TelegramInitDataState>(initialState)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let isMounted = true

		async function initTelegram() {
			let scriptStatus = TelegramScriptStatus.Idle

			try {
				try {
					await import('@twa-dev/sdk')
				} catch {
					await loadTelegramScript()
					scriptStatus = TelegramScriptStatus.Loaded
				}

				if (!window.Telegram?.WebApp) {
					await loadTelegramScript()
					scriptStatus = TelegramScriptStatus.Loaded
				}

				if (!window.Telegram?.WebApp) {
					throw new Error(TELEGRAM_INIT_DATA_ERRORS.sdkUnavailable)
				}

				const webApp = window.Telegram.WebApp
				const initData = window.Telegram.WebApp.initData
				const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe
				const themeParams = webApp.themeParams ?? {}

				webApp.ready()
				webApp.expand()
				applyTelegramTheme(themeParams)

				if (!isMounted) {
					return
				}

				setTelegram({
					...getBaseState(),
					isWebAppAvailable: true,
					initData,
					initDataUnsafe,
					user: initDataUnsafe?.user,
					colorScheme: webApp.colorScheme,
					platform: webApp.platform,
					scriptStatus,
					themeParams,
					version: webApp.version
				})
				setError(null)
			} catch (initError: unknown) {
				if (!isMounted) {
					return
				}

				setTelegram({
					...getBaseState(),
					scriptStatus:
						scriptStatus === TelegramScriptStatus.Idle
							? TelegramScriptStatus.Failed
							: scriptStatus
				})
				setError(
					initError instanceof Error
						? initError.message
						: TELEGRAM_INIT_DATA_ERRORS.unknown
				)
			}
		}

		initTelegram()

		return () => {
			isMounted = false
		}
	}, [])

	return {
		error,
		telegram
	}
}
