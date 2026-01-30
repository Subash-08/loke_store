export const ToyTheme = {
    colors: {
        primary: {
            default: 'bg-purple-500',
            hover: 'hover:bg-purple-600',
            text: 'text-purple-600',
            light: 'bg-purple-100',
            border: 'border-purple-200',
        },
        secondary: {
            default: 'bg-yellow-400',
            hover: 'hover:bg-yellow-500',
            text: 'text-yellow-600',
            light: 'bg-yellow-50',
        },
        accent: {
            cyan: 'bg-cyan-400',
            pink: 'bg-pink-400',
            rose: 'bg-rose-400',
            sky: 'bg-sky-400',
        },
        background: {
            page: 'bg-rose-50', // Very soft pinkish/warm white
            card: 'bg-white',
        },
        text: {
            heading: 'text-slate-800',
            body: 'text-slate-600',
        }
    },
    shapes: {
        card: 'rounded-3xl',
        button: 'rounded-full',
        pill: 'rounded-full',
    },
    shadows: {
        soft: 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
        hover: 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
        float: 'shadow-[0_20px_50px_rgb(0,0,0,0.1)]'
    },
    animations: {
        hoverScale: 'transform transition-transform duration-300 hover:scale-[1.03]',
        clickBounce: 'active:scale-95 transition-transform',
    },
    layout: {
        sectionPadding: '',
        container: 'container mx-auto px-4 sm:px-6 lg:px-8',
    }
};

export const gradients = {
    primary: 'bg-gradient-to-r from-purple-400 to-pink-400',
    secondary: 'bg-gradient-to-r from-yellow-300 to-orange-300',
    cool: 'bg-gradient-to-r from-cyan-300 to-blue-400',
};
