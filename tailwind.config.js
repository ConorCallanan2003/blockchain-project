/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				wiggle: {
					'0%, 100%': {
						transform: 'scale(1.1, 1.1) skew(1deg, 1deg) translateX(5px) translateY(5px)'
					},
					'50%': {
						transform: 'scale(1,1) skew(10deg, 10deg) translateX(0px) translateY(0px)'
					}
				}
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				wiggle: {
					'0%, 100%': {
						transform: 'scale(1.1, 1.1) skew(1deg, 1deg) translateX(0px) translateY(5px)'
					},
					'50%': {
						transform: 'scale(1,1) skew(-1deg, -1deg) translateX(0px) translateY(0px)'
					}
				},
				text: {
					'0%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
						transform: 'scale(1, 1) skew(-2deg, -2deg) translateX(0px) translateY(0px)'
					},
					'25%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
						transform: 'scale(1.05, 1.05) skew(0deg, 0deg) translateX(0px) translateY(10px)'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
						transform: 'scale(1, 1) skew(2deg, 2deg) translateX(0px) translateY(0px)'
					},
					'75%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
						transform: 'scale(1, 1) skew(0deg, 0deg) translateX(0px) translateY(0px)'
					},
					'100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
						transform: 'scale(1, 1) skew(-2deg, -2deg) translateX(0px) translateY(0px)'
					}
				},
				loading_button: {
					'0%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
						transform: 'scale(1, 1)  '
					},
					'25%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
						transform: 'scale(1.02, 1.02)  '
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
						transform: 'scale(1, 1) '
					},
					'75%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
						transform: 'scale(1.02, 1.02) '
					},
					'100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
						transform: 'scale(1, 1) '
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'home-text': 'text 5s infinite',
				'loading-button': 'loading_button 1s infinite'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
};
