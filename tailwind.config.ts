import type { Config } from 'tailwindcss';

export default {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                xs: '360px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                heading: 'rgba(46, 38, 61, 0.902)',
                body: 'rgba(46, 38, 61, 0.702)',
                subtitle: 'rgba(46, 38, 61, 0.549)',
                button: 'rgba(46, 38, 61, 0.902)',
                caption: 'rgba(46, 38, 61, 0.40)',
                overline: 'rgba(46, 38, 61, 0.902)',
                basic: {
                    black: '#000000',
                    white: '#FFFFFF',
                },
                opacity: {
                    90: '0.902',
                    70: '0.702',
                    55: '0.549',
                    40: '0.40',
                },
                error: {
                    light: '#FF7074',
                    DEFAULT: '#FF4C51',
                    dark: '#E64449',
                    lighterOpacity: 'rgba(255, 76, 81, 0.08)',
                    lightOpacity: 'rgba(255, 76, 81, 0.16)',
                    mainOpacity: 'rgba(255, 76, 81, 0.24)',
                    darkOpacity: 'rgba(255, 76, 81, 0.32)',
                    darkerOpacity: 'rgba(255, 76, 81, 0.38)',
                },
                warning: {
                    light: '#FFC333',
                    DEFAULT: '#FFB400',
                    dark: '#E6A200',
                    lighterOpacity: 'rgba(255, 180, 0, 0.08)',
                    lightOpacity: 'rgba(255, 180, 0, 0.16)',
                    mainOpacity: 'rgba(255, 180, 0, 0.24)',
                    darkOpacity: 'rgba(255, 180, 0, 0.32)',
                    darkerOpacity: 'rgba(255, 180, 0, 0.38)',
                },
                info: {
                    light: '#A379FF',
                    DEFAULT: '#8C57FF',
                    dark: '#7E4EE6',
                    lighterOpacity: 'rgba(140, 87, 255, 0.08)',
                    lightOpacity: 'rgba(140, 87, 255, 0.16)',
                    mainOpacity: 'rgba(140, 87, 255, 0.24)',
                    darkOpacity: 'rgba(140, 87, 255, 0.32)',
                    darkerOpacity: 'rgba(140, 87, 255, 0.38)',
                },
                success: {
                    light: '#78D533',
                    DEFAULT: '#56CA00',
                    dark: '#4DB600',
                    lighterOpacity: 'rgba(86, 202, 0, 0.08)',
                    lightOpacity: 'rgba(86, 202, 0, 0.16)',
                    mainOpacity: 'rgba(86, 202, 0, 0.24)',
                    darkOpacity: 'rgba(86, 202, 0, 0.32)',
                    darkerOpacity: 'rgba(86, 202, 0, 0.38)',
                },
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
                marquee: {
                    from: {
                        transform: 'translateX(0)',
                    },
                    to: {
                        transform: 'translateX(calc(-10%))',
                    },
                },
                ripple: {
                    '0%, 100%': {
                        transform: 'translate(-50%, -50%) scale(1)',
                    },
                    '50%': {
                        transform: 'translate(-50%, -50%) scale(0.9)',
                    },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                marquee: 'marquee var(--duration) linear infinite',
                ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('tailwindcss-textshadow'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
    ],
    safelist: [
        'prose-a:underline',
        'prose-a:no-underline',
        'px-14',
        'px-16',
        'bg-green-800',
        'gap-x-3',
    ],
} satisfies Config;
