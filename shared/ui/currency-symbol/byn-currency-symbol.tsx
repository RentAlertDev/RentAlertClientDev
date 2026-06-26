import type { SVGProps } from 'react'
import { cn } from '@/shared/lib/utils'

interface BynCurrencySymbolProps
	extends Omit<SVGProps<SVGSVGElement>, 'className'> {
	className?: string
}

export function BynCurrencySymbol({
	className,
	...props
}: BynCurrencySymbolProps) {
	return (
		<svg
			aria-label='белорусский рубль'
			className={cn(
				'h-[0.9em] w-[0.9em] shrink-0 translate-y-[0.08em]',
				className
			)}
			role='img'
			viewBox='0 0 500 500'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g transform='translate(0 500) scale(0.1 -0.1)'>
				<path
					d='M1243 4753 c-10 -4 -13 -314 -13 -1504 l0 -1499 -330 0 -330 0 0 -245 0 -245 330 0 330 0 2 -522 3 -523 865 -3 c1030 -3 1133 2 1383 68 428 113 748 403 881 797 58 173 70 255 70 473 1 210 -11 293 -60 445 -128 399 -453 683 -904 793 -220 54 -247 55 -993 59 l-697 4 2 707 3 707 1093 3 1092 2 0 239 c0 209 -2 240 -16 245 -19 7 -2693 7 -2711 -1z m1898 -2408 c253 -33 451 -139 590 -312 142 -179 196 -395 154 -618 -66 -352 -322 -612 -686 -697 -92 -22 -109 -22 -754 -23 l-660 0 -3 282 -2 283 577 2 578 3 0 240 0 240 -577 3 -578 2 0 305 0 305 628 0 c483 0 651 -4 733 -15z'
					fill='currentColor'
				/>
			</g>
		</svg>
	)
}
