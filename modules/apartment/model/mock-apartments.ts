import { ApartmentCurrency, ApartmentSource, type Apartment } from './types'

export const mockApartments: Apartment[] = [
	{
		id: 10380,
		source: ApartmentSource.Realt,
		sourceUrl: 'https://realt.by/rent-flat-for-long/object/4157758',
		title: 'Уютная двухкомнатная квартира у Каменной горки',
		description:
			'Светлая квартира с отдельной спальней, кухней-гостиной и теплой лоджией. Есть мебель, техника и быстрый выезд к метро.',
		street: 'Неманская ул.',
		metroStation: 'Каменная горка',
		price: 550,
		currency: ApartmentCurrency.Usd,
		rooms: 2,
		studio: false,
		areaTotal: 36,
		floor: 7,
		floorsTotal: 9,
		houseType: 'Панельный дом',
		previewPhoto:
			'https://cdn.realt.by/img/55/cd50d6ac-6b37-11f1-82d1-0242ac120003',
		photos: [
			'https://cdn.realt.by/img/55/cd50d6ac-6b37-11f1-82d1-0242ac120003'
		],
		isFavorite: true
	}
]
