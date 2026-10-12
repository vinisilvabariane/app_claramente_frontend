import { createTheme } from '@mui/material/styles'

// Paleta viva, no espírito de um "jogo educativo": cada cor tem um papel de
// jogo, não só de marca. "sky" é a cor de identidade; "sprout" é a cor de
// ação/conquista (o verde "siga em frente"); "sun" marca destaque/energia;
// "berry" dá variedade aos módulos; "ink" é reservado para texto.
export const brand = {
  ink: '#0B3B57',
  inkDeep: '#062A40',
  sky: '#2FB6D9',
  skyDeep: '#1B8FAE',
  skyMist: '#E4F6FA',
  sun: '#FF9224',
  sunDeep: '#DB6E00',
  sunMist: '#FFEEDD',
  sprout: '#46C26E',
  sproutDeep: '#2E9E52',
  sproutMist: '#E4F8EA',
  berry: '#7C5CFF',
  berryDeep: '#5B3FE0',
  berryMist: '#EEEAFF',
  cream: '#FFF9EF',
} as const

// Curva de easing "gentil": aceleração curta, desaceleração longa — a
// sensação de leveza pedida vem mais do tempo/curva do que do efeito em si.
// Cartão "de jogo": borda grossa colorida + sombra sólida deslocada, em vez
// de sombra difusa. É o mesmo princípio visual do botão 3D, aplicado a
// superfícies — reforça a identidade lúdica sem depender de gradientes.
export function chunkyCard(color: string, deep: string) {
  return { border: `3px solid ${color}`, boxShadow: `0 6px 0 ${deep}` }
}

export const motion = {
  gentle: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  fast: 240,
  medium: 480,
  slow: 720,
} as const

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    success: true
    info: true
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    success: true
    info: true
  }
}
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    success: true
    info: true
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: brand.sky, dark: brand.skyDeep, light: brand.skyMist },
    secondary: { main: brand.sun, dark: brand.sunDeep, light: brand.sunMist },
    success: { main: brand.sprout, dark: brand.sproutDeep, light: brand.sproutMist },
    info: { main: brand.berry, dark: brand.berryDeep, light: brand.berryMist },
    background: { default: brand.cream, paper: '#FFFFFF' },
    text: { primary: brand.ink, secondary: '#5B7182' },
  },
  shape: { borderRadius: 18 },
  typography: {
    fontFamily: '"Nunito Sans", Roboto, Arial, sans-serif',
    h1: { fontFamily: 'Fredoka, Roboto, sans-serif', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04 },
    h2: { fontFamily: 'Fredoka, Roboto, sans-serif', fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontFamily: 'Fredoka, Roboto, sans-serif', fontWeight: 700 },
    h4: { fontFamily: 'Fredoka, Roboto, sans-serif', fontWeight: 700 },
    button: { fontWeight: 800, textTransform: 'none' },
    overline: { fontWeight: 800, letterSpacing: '.09em' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const base = {
            fontWeight: 800,
            transition: `transform ${motion.fast}ms ${motion.gentle}, box-shadow ${motion.fast}ms ${motion.gentle}, background-color ${motion.fast}ms ${motion.gentle}`,
          }
          if (ownerState.variant !== 'contained') {
            return { ...base, borderRadius: 999, paddingInline: 22, minHeight: 44, borderWidth: 2, '&:hover': { borderWidth: 2 }, '&:active': { transform: 'scale(.97)' } }
          }
          const key = ownerState.color && ownerState.color !== 'inherit' ? ownerState.color : 'primary'
          const swatch = theme.palette[key as 'primary']
          return {
            ...base,
            borderRadius: 16,
            paddingInline: 26,
            minHeight: 50,
            boxShadow: `0 4px 0 ${swatch.dark}`,
            '&:hover': { boxShadow: `0 5px 0 ${swatch.dark}`, transform: 'translateY(-1px)' },
            '&:active': { boxShadow: `0 1px 0 ${swatch.dark}`, transform: 'translateY(3px)' },
            '&.Mui-disabled': { boxShadow: 'none' },
          }
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            transition: `box-shadow ${motion.fast}ms ${motion.gentle}, border-color ${motion.fast}ms ${motion.gentle}`,
          },
        },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 800 } } },
  },
})
