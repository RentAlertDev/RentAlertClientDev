export enum BottomNavigationRoute {
	Apartments = '/',
	Favorites = '/favorites',
	Profile = '/profile'
}

export enum BottomNavigationIcon {
	Apartments = 'apartments',
	Favorites = 'favorites',
	Profile = 'profile'
}

export const BOTTOM_NAVIGATION_ITEMS = [
	{
		href: BottomNavigationRoute.Apartments,
		icon: BottomNavigationIcon.Apartments,
		label: 'Квартиры'
	},
	{
		href: BottomNavigationRoute.Favorites,
		icon: BottomNavigationIcon.Favorites,
		label: 'Избранное'
	},
	{
		href: BottomNavigationRoute.Profile,
		icon: BottomNavigationIcon.Profile,
		label: 'Профиль'
	}
]
