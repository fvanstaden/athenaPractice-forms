import { createTheme, PaletteMode, ThemeOptions } from '@mui/material/styles';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import InputIcon from '@mui/icons-material/Input';

// Shared theme variables
const themeVars = {
    borderRadius: {
        base: 12,
        card: 18,
        input: 8,
        tooltip: 8,
    },
    shadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.08)',
        cardHover: '0 8px 16px rgba(0, 0, 0, 0.12)',
        paper: (mode: PaletteMode) => mode === 'light'
            ? 'rgba(255, 255, 255, 0.72)'
            : 'rgba(28, 28, 30, 0.72)',
    },
    appBar: {
        bg: (mode: PaletteMode) => mode === 'light'
            ? 'rgba(255, 255, 255, 0.72)'
            : 'rgba(28, 28, 30, 0.72)',
        border: (mode: PaletteMode) => mode === 'light'
            ? '1px solid rgba(0, 0, 0, 0.08)'
            : '1px solid rgba(255, 255, 255, 0.08)',
    }
};

// Type extensions
declare module '@mui/material/styles' {
    interface Palette {
        utility: Palette['primary'];
        neutral: Palette['primary'];
        confirm: Palette['primary'];
        correct: Palette['primary'];
    }

    interface PaletteOptions {
        utility?: PaletteOptions['primary'];
        neutral?: PaletteOptions['primary'];
        confirm?: PaletteOptions['primary'];
        correct?: PaletteOptions['primary'];
    }
}

declare module '@mui/material' {
    interface AlertPropsColorOverrides {
        confirm: true;
        correct: true;
    }

    interface ButtonPropsColorOverrides {
        confirm: true;
        correct: true;
    }
}

// Base theme configuration (shared across light/dark)
export const baseTheme = (mode: PaletteMode): ThemeOptions => ({
    shape: {
        borderRadius: themeVars.borderRadius.base,
    },
    typography: {
        fontFamily: [
            '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
            '"Helvetica Neue"', 'Arial', 'sans-serif',
            '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',
        ].join(','),
        h1: { fontWeight: 600, fontSize: '2.5rem', lineHeight: 1.2 },
        h2: { fontWeight: 600, fontSize: '2rem', lineHeight: 1.3 },
        h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.4 },
        h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.5 },
        h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.6 },
        h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.7 },
        button: { fontWeight: 500, textTransform: 'none', letterSpacing: 'normal' },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: themeVars.borderRadius.base,
                    transition: 'all 0.05s ease',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: themeVars.borderRadius.card,
                    boxShadow: themeVars.shadow.card,
                    transition: 'transform 0.05s ease, box-shadow 0.05s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: themeVars.shadow.cardHover,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: themeVars.appBar.bg(mode),
                    backdropFilter: 'blur(20px)',
                    borderBottom: themeVars.appBar.border(mode),
                },
            },
        },
        MuiAlert: {
            defaultProps: {
                iconMapping: {
                    confirm: <InputIcon fontSize="inherit" />,
                    correct: <AutoFixHighIcon fontSize="inherit" />,
                },
            },
        },
    },
});



export const lightTheme = createTheme({
    ...baseTheme('light'),
    palette: {
        mode: 'light',
        primary: {
            main: '#007AFF',
            light: '#5AC8FA',
            dark: '#004080',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#5856D6',
            light: '#A284FF',
            dark: '#3D3A9F',
            contrastText: '#ffffff',
        },
        background: {
            default: '#F2F2F7',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#000000',
            secondary: 'rgba(248,248,248,0.85)',
        },
    },
});

export const darkTheme = createTheme({
    ...baseTheme('dark'),
    palette: {
        mode: 'dark',
        primary: {
            main: '#0A84FF',
            light: '#5AC8FA',
            dark: '#004080',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#5E5CE6',
            light: '#A284FF',
            dark: '#3D3A9F',
            contrastText: '#ffffff',
        },
        background: {
            default: '#1C1C1E',
            paper: '#2C2C2E',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#EBEBF599',
        },
    },
});