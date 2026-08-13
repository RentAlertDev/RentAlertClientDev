'use client'

import { useQuery } from '@tanstack/react-query'
import { getCurrencyRates } from '../api/get-currency-rates'
import { CURRENCY_RATES_STALE_TIME } from '../model/constants'

export function useCurrencyRatesQuery() {
	return useQuery({
		queryFn: getCurrencyRates,
		queryKey: ['currency-rates'],
		staleTime: CURRENCY_RATES_STALE_TIME
	})
}
