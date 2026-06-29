export enum BottomNavigationRoute {
	Apartments = '/',
	Profile = '/profile'
}

export enum BottomNavigationIcon {
	Apartments = 'apartments',
	Profile = 'profile'
}

export const BOTTOM_NAVIGATION_ITEMS = [
	{
		href: BottomNavigationRoute.Apartments,
		icon: BottomNavigationIcon.Apartments,
		label: 'Квартиры'
	},
	{
		href: BottomNavigationRoute.Profile,
		icon: BottomNavigationIcon.Profile,
		label: 'Профиль'
	}
]
