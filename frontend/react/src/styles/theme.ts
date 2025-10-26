export const theme = {
    colors: {
        background: '#0a0e27',
        backgroundSecondary: '#131a35',
        cardBackground: '#1a2238',
        primary: '#64b5f6',
        primaryHover: '#42a5f5',
        text: '#e8eaf6',
        textSecondary: '#9fa8da',
        border: '#283593',
        success: '#66bb6a',
        warning: '#ffa726',
        error: '#ef5350'
    },
    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem'
    },
    borderRadius: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem'
    },
    shadows: {
        card: '0 4px 6px rgba(0, 0, 0, 0.3)',
        cardHover: '0 8px 12px rgba(100, 181, 246, 0.2)'
    }
};

export type Theme = typeof theme;

export const getThemeColor = (color: keyof typeof theme.colors): string => {
    return theme.colors[color];
};

export const getThemeSpacing = (spacing: keyof typeof theme.spacing): string => {
    return theme.spacing[spacing];
};

export const getThemeBorderRadius = (radius: keyof typeof theme.borderRadius): string => {
    return theme.borderRadius[radius];
};

export const getThemeShadow = (shadow: keyof typeof theme.shadows): string => {
    return theme.shadows[shadow];
};