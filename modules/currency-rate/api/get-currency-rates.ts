import { httpClient } from '@/shared/api/http-client'
import { CURRENCY_RATES_API } from '../model/constants'
import type { CurrencyRatesResponse } from '../model/types'

export async function getCurrencyRates() {
	const response = await httpClient.get<CurrencyRatesResponse>(
		CURRENCY_RATES_API
	)

	return response.data
}
