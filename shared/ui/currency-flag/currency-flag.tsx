interface CurrencyFlagProps {
	currency: string
	className?: string
}

export function CurrencyFlag({ currency, className = 'size-7' }: CurrencyFlagProps) {
	const classes = `${className} shrink-0 rounded-full shadow-[0_0_0_1px_var(--card-border)]`

	if (currency === 'USD') return (
		<svg aria-label='США' className={classes} role='img' viewBox='0 0 32 32'>
			<defs><clipPath id='usd-flag-circle'><circle cx='16' cy='16' r='16' /></clipPath></defs>
			<g clipPath='url(#usd-flag-circle)'>
				<rect width='32' height='32' fill='#fff' />
				{[0, 5, 10, 15, 20, 25, 30].map(y => <rect fill='#d64045' height='2.5' key={y} width='32' y={y} />)}
				<rect width='15' height='14' fill='#2856a3' />
				{[3, 8, 13].flatMap(y => [3, 7.5, 12].map(x => <circle cx={x} cy={y} fill='#fff' key={`${x}-${y}`} r='1' />))}
			</g>
		</svg>
	)

	if (currency === 'EUR') return (
		<svg aria-label='Евросоюз' className={classes} role='img' viewBox='0 0 32 32'>
			<circle cx='16' cy='16' fill='#1652a2' r='16' />
			{Array.from({ length: 12 }).map((_, index) => {
				const angle = (index * Math.PI * 2) / 12
				return <circle cx={16 + Math.sin(angle) * 9} cy={16 - Math.cos(angle) * 9} fill='#ffd43b' key={index} r='1.25' />
			})}
		</svg>
	)

	if (currency === 'BYN' || currency === 'BYR') return (
		<svg aria-label='Беларусь' className={classes} role='img' viewBox='0 0 32 32'>
			<defs><clipPath id='byn-flag-circle'><circle cx='16' cy='16' r='16' /></clipPath></defs>
			<g clipPath='url(#byn-flag-circle)'>
				<rect width='32' height='21' fill='#c8313e' />
				<rect y='21' width='32' height='11' fill='#3b7d44' />
				<rect width='6' height='32' fill='#fff' />
				<path d='M1 0v32M5 0v32M1 4l4 4-4 4 4 4-4 4 4 4-4 4' fill='none' stroke='#c8313e' strokeWidth='1.2' />
			</g>
		</svg>
	)

	return <span aria-label={currency} className={`${className} grid shrink-0 place-items-center rounded-full bg-[var(--surface)] text-xs`} role='img'>¤</span>
}
