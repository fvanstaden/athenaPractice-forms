import {createTheme, PaletteMode, ThemeOptions} from '@mui/material/styles';


const getThemeMode = (): PaletteMode => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'light' || savedMode === 'dark') {
        return savedMode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};


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

declare module '@mui/material/Alert' {
    interface AlertPropsColorOverrides {
        confirm: true;
        correct: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        confirm: true;
        correct: true;
    }
}


// Shared variables
const themeVars = {
    borderRadius: {
        base: 12,
        card: 18,
        input: 8,
        tooltip: 8,
    },
    shadow: {
        light: {
            card: '0 4px 12px rgba(0, 0, 0, 0.08)',
            cardHover: '0 8px 16px rgba(0, 0, 0, 0.12)',
            paper: 'rgba(255, 255, 255, 0.72)',
        },
        dark: {
            card: '0 4px 12px rgba(0, 0, 0, 0.08)',
            cardHover: '0 8px 16px rgba(0, 0, 0, 0.12)',
            paper: 'rgba(28, 28, 30, 0.72)',
        },
    },
    tooltip: {
        lightBg: 'rgba(0,0,0,0.85)',
        darkBg: 'rgba(19,19,19,0.85)',
        lightText: '#ffffff',
        darkText: '#ffffff',
    },
    appBar: {
        lightBg: 'rgba(255, 255, 255, 0.72)',
        darkBg: 'rgba(28, 28, 30, 0.72)',
        lightBorder: '1px solid rgba(0, 0, 0, 0.08)',
        darkBorder: '1px solid rgba(255, 255, 255, 0.08)',
    }
};

const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
    const isLight = mode === 'light';

    return {
        palette: {
            mode,
            primary: {
                main: isLight ? '#007AFF' : '#0A84FF',  // iOS system blue
                light: '#5AC8FA',                      // accent blue variant
                dark: '#004080',
                contrastText: '#ffffff',
            },
            secondary: {
                main: isLight ? '#5856D6' : '#5E5CE6',  // system indigo
                light: '#A284FF',
                dark: '#3D3A9F',
                contrastText: '#ffffff',
            },
            error: {
                main: isLight ? '#FF3B30' : '#FF453A',  // system red
                light: '#FF6B6B',
                dark: '#C60B1E',
                contrastText: '#ffffff',
            },
            warning: {
                main: isLight ? '#FF9500' : '#FF9F0A',  // system orange
                light: '#ff950a',
                dark: '#ff950a',
                contrastText: '#ffffff',
            },
            info: {
                main: isLight ? '#07a4ff' : '#07a4ff',  // system cyan-ish info tone
                light: '#0068ff',
                dark: '#248fff',
                contrastText: '#ffffff',
            },
            success: {
                main: isLight ? '#34C759' : '#30D158',  // system green
                light: '#66E49B',
                dark: '#228C38',
                contrastText: '#ffffff',
            },
            confirm: {
                main: isLight ? '#AF52DE' : '#BF5AF2',  // system purple
                light: '#DA8FFF',
                dark: '#7A3DAF',
                contrastText: '#ffffff',
                // Define the Icon for 'Utility'
            },
            correct: {
                main: isLight ? 'rgba(255,70,225,0.89)' : 'rgba(255,64,225,0.89)',  // system pink
                light: '#ff2ef3',
                dark: '#FF29D9E2',
                contrastText: '#ffffff',
            },
            neutral: {
                main: '#C7C7CC',  // system gray 3
                light: '#D1D1D6',
                dark: '#8E8E93',
                contrastText: '#4e4e53',
            },
            background: {
                default: isLight ? '#F2F2F7' : '#1C1C1E',  // system grouped backgrounds
                paper: isLight ? '#FFFFFF' : '#2C2C2E',   // card/modal paper
            },
            text: {
                primary: isLight ? '#000000' : '#FFFFFF',  // labelPrimary
                secondary: isLight ? 'rgba(248,248,248,0.85)' : '#EBEBF599', // labelSecondary
                disabled: isLight ? '#3C3C434D' : '#EBEBF54D',  // labelDisabled
            },
            divider: isLight ? '#C6C6C8' : '#3A3A3C',  // separator color
            action: {
                disabled: isLight ? '#D1D1D6' : '#48484A',            // system gray 4/5
                disabledBackground: isLight ? '#F2F2F7' : '#2C2C2E',  // fill disabled
            },

        },
        typography: {
            fontFamily: [
                '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
                '"Helvetica Neue"', 'Arial', 'sans-serif',
                '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',
            ].join(','),
            h1: {fontWeight: 600, fontSize: '2.5rem', lineHeight: 1.2},
            h2: {fontWeight: 600, fontSize: '2rem', lineHeight: 1.3},
            h3: {fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.4},
            h4: {fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.5},
            h5: {fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.6},
            h6: {fontWeight: 600, fontSize: '1rem', lineHeight: 1.7},
            subtitle1: {fontWeight: 500, fontSize: '1rem', lineHeight: 1.75},
            subtitle2: {fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.57},
            body1: {fontSize: '1rem', lineHeight: 1.5},
            body2: {fontSize: '0.875rem', lineHeight: 1.43},
            button: {fontWeight: 500, textTransform: 'none', letterSpacing: 'normal'},
            caption: {fontSize: '0.75rem', lineHeight: 1.66},
            overline: {fontSize: '0.75rem', fontWeight: 500, lineHeight: 2.66, textTransform: 'uppercase'},
        },
        shape: {
            borderRadius: themeVars.borderRadius.base,
        },
        components: {
            MuiStack: {
                defaultProps: {
                    gap: 1,
                },
            },
            MuiButtonBase: {
                defaultProps: {disableRipple: true},
            },
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                    disableRipple: true,
                },
                styleOverrides: {
                    root: {
                        borderRadius: themeVars.borderRadius.base,
                        padding: '8px 16px',
                        fontWeight: 500,
                        transition: 'all 0.05s ease',
                        '& .MuiTouchRipple-root': {
                            display: 'none',
                        },
                    },
                    sizeSmall: {
                        padding: '4px 12px',
                        fontSize: '0.875rem',
                    },
                    sizeLarge: {
                        padding: '12px 24px',
                        fontSize: '1rem',
                    },
                    contained: {
                        boxShadow: 'none',
                        '&:hover': {boxShadow: 'none'},
                    },
                },
                variants: [
                    {
                        props: {className: 'action-button'},
                        style: {
                            fontWeight: 500,
                            padding: '8px 16px',
                            borderRadius: 8,
                            textTransform: 'none',
                            boxShadow: 'none',
                            minWidth: '100px',
                        }
                    }
                ]
            },
            MuiIconButton: {
                defaultProps: {disableRipple: true},
            },
            MuiContainer: {
                styleOverrides: {
                    root: {
                        padding: '16px',
                    }
                }
            },

            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: themeVars.borderRadius.card,
                        boxShadow: themeVars.shadow[mode].card,
                        transition: 'transform 0.05s ease, box-shadow 0.05s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: themeVars.shadow[mode].cardHover,
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        borderRadius: themeVars.borderRadius.base,
                        boxShadow: themeVars.shadow[mode].paper,
                    },
                    rounded: {
                        borderRadius: themeVars.borderRadius.card,
                    },
                },
            },
            MuiTextField: {
                defaultProps: {variant: 'outlined'},
                styleOverrides: {
                    root: {borderRadius: themeVars.borderRadius.input},
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {borderRadius: themeVars.borderRadius.input},
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        '&:focus': {
                            boxShadow: themeVars.shadow[mode].paper,
                        }
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: themeVars.appBar[`${mode}Bg`],
                        backdropFilter: 'blur(20px)',
                        boxShadow: 'none',
                        borderBottom: themeVars.appBar[`${mode}Border`],
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        borderRadius: themeVars.borderRadius.tooltip,
                        padding: '8px 12px',
                        fontSize: '0.8125rem',
                        backgroundColor: themeVars.tooltip[`${mode}Bg`],
                        color: themeVars.tooltip[`${mode}Text`],
                    },
                    arrow: {
                        color: themeVars.tooltip[`${mode}Bg`],
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    root: {
                        '& .MuiTabs-indicator': {
                            height: '3px',
                            borderRadius: '3px 3px 0 0',
                        },
                    }
                }
            },



            MuiAutocomplete: {
                styleOverrides: {
                    root: {
                        '& .MuiAutocomplete-inputRoot': {
                            transition: 'none !important',
                        },
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    outlined: {
                        transform: 'translate(14px, 9px) scale(1)',
                        '&.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -6px) scale(0.75)',
                        }
                    }
                }
            },
        },
    };
};

export const createAppTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));

export const initialMode = getThemeMode();

export default createAppTheme(initialMode);