import { z } from 'zod'

const requiredNumericField = z
	.string()
	.trim()
	.min(1, 'Заполните поле')
	.regex(/^\d+$/, 'Можно вводить только числа')

export const userFilterFormSchema = z
	.object({
		areaFrom: requiredNumericField,
		areaTo: requiredNumericField,
		priceFrom: requiredNumericField,
		priceTo: requiredNumericField,
		roomsFrom: requiredNumericField,
		roomsTo: requiredNumericField
	})
	.superRefine((values, context) => {
		const priceFrom = Number(values.priceFrom)
		const priceTo = Number(values.priceTo)
		const roomsFrom = Number(values.roomsFrom)
		const roomsTo = Number(values.roomsTo)
		const areaFrom = Number(values.areaFrom)
		const areaTo = Number(values.areaTo)

		if (priceFrom < 0 || priceFrom > 10000) {
			context.addIssue({
				code: 'custom',
				message: 'Цена должна быть от 0 до 10000',
				path: ['priceFrom']
			})
		}

		if (priceTo < 0 || priceTo > 10000) {
			context.addIssue({
				code: 'custom',
				message: 'Цена должна быть от 0 до 10000',
				path: ['priceTo']
			})
		}

		if (priceFrom > priceTo) {
			context.addIssue({
				code: 'custom',
				message: 'Минимальная цена не может быть больше максимальной',
				path: ['priceFrom']
			})
		}

		if (roomsFrom < 1 || roomsFrom > 10) {
			context.addIssue({
				code: 'custom',
				message: 'Комнат должно быть от 1 до 10',
				path: ['roomsFrom']
			})
		}

		if (roomsTo < 1 || roomsTo > 10) {
			context.addIssue({
				code: 'custom',
				message: 'Комнат должно быть от 1 до 10',
				path: ['roomsTo']
			})
		}

		if (roomsFrom > roomsTo) {
			context.addIssue({
				code: 'custom',
				message: 'Минимум комнат не может быть больше максимума',
				path: ['roomsFrom']
			})
		}

		if (areaFrom > areaTo) {
			context.addIssue({
				code: 'custom',
				message: 'Минимальная площадь не может быть больше максимальной',
				path: ['areaFrom']
			})
		}
	})
