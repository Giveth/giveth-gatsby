export default {
  breakpoints: ['850px', '1024px', '1280px'],
  colors: {
    text: '#2C0B3F',
    background: '#fff',
    headerbackground: '#ffffffcc',
    primary: '#C2449F',
    hover: '#DB5CB8',
    muted: '#DFDAE8',
    secondary: '#303B72',
    secondaryDark: '#29325E',
    accent: '#109CF1',
    attention: '#E01C6B',
    bodyDark: '#6B7087',
    bodyLight: '#AAAFCA',
    anotherGrey: '#C9D0E8',
    lightestBlue: '#EDF0FA',
    yellow: '#FFEF9D',
    greenishBlue: '#36CDD7',
    red: '#D74036'
  },
  fonts: {
    body: 'Red Hat Text, sans serif',
    heading: 'Red Hat Display, sans serif',
    monospace: 'Inconsolata, monospace'
  },
  fontSizes: [10, 12, 14, 16, 18, 20, 25, 32, 41, 52, 64, 66],
  fontWeights: {
    body: 400,
    heading: 500,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900
  },
  letterSpacings: {
    tightest: '-3px',
    tight: '-2px',
    narrowest: '-1.5px',
    narrower: '-1px',
    narrow: '-0.5px',
    normal: '0px',
    more: '1px',
    wide: '3px',
    widest: '5px'
  },
  lineHeights: {
    body: 1.5,
    heading: 1,
    short: 0.5,
    button: 1.12,
    tall: 1.3,
    taller: 1.4,
    tallest: 1.5
  },
  grayBox: {
    background: '#EDF0FA'
  },
  text: {
    default: {
      color: 'text',
      fontSize: 3,
      fontFamily: 'body',
      lineHeight: 'tallest'
    },
    small: {
      fontSize: 1,
      fontFamily: 'body'
    },
    medium: {
      fontSize: 2,
      fontFamily: 'body',
      fontWeight: 'medium',
      lineHeight: 'tallest'
    },
    paragraph: {
      fontSize: 3,
      fontFamily: 'body'
    },
    larger: {
      fontSize: 4,
      fontFamily: 'body'
    },
    large: {
      fontSize: 5,
      fontFamily: 'body'
    },
    quote: {
      fontSize: 7,
      lineHeight: 'tallest',
      fontFamily: 'heading',
      fontWeight: 'body',
      color: 'bodyDark',
      fontStyle: 'italic'
    },
    overline: {
      fontSize: 2,
      fontFamily: 'heading',
      fontWeight: 'medium',
      letterSpacing: 'more',
      textTransform: 'uppercase',
      color: 'bodyDark'
    },
    overlineSmall: {
      fontSize: 0,
      fontFamily: 'heading',
      fontWeight: 'medium',
      lineHeight: 'tallest',
      textTransform: 'uppercase'
    },
    caption: {
      fontSize: 2,
      fontFamily: 'heading',
      fontWeight: 'regular',
      fontStyle: 'italic'
    },
    microbold: {
      fontSize: 0,
      fontFamily: 'heading',
      fontWeight: 'bold',
      letterSpacing: 'narrow'
    },
    bold: {
      fontSize: 4,
      fontFamily: 'body',
      fontWeight: 'bold',
      letterSpacing: 'narrow',
      lineHeight: '18px'
    },
    styleGuide: {
      fontSize: 6,
      color: '#fff',
      fontFamily: 'monospace',
      fontWeight: 'black',
      textTransform: 'uppercase',
      background: 'lightgray',
      marginBottom: '1rem',
      textAlign: 'center'
    }
  },
  headings: {
    display: {
      fontFamily: 'heading',
      fontSize: 10,
      fontWeight: 'bold',
      letterSpacing: 'tightest'
    },
    h1: {
      fontFamily: 'heading',
      fontSize: 11,
      fontWeight: 'medium',
      lineHeight: 'tall',
      letterSpacing: 'tight',
      overflowWrap: 'normal'
    },
    h2: {
      fontFamily: 'heading',
      fontSize: 9,
      fontWeight: 'medium',
      letterSpacing: 'narrowest'
    },
    h3: {
      fontFamily: 'heading',
      fontSize: 8,
      fontWeight: 'regular',
      letterSpacing: 'normal'
    },
    h4: {
      fontFamily: 'heading',
      fontSize: 7,
      fontWeight: 'medium',
      letterSpacing: 'narrower'
    },
    h5: {
      fontFamily: 'heading',
      fontSize: 6,
      fontWeight: 'medium',
      letterSpacing: 'narrow'
    },
    h6: {
      fontFamily: 'heading',
      fontSize: 4,
      fontWeight: 'bold',
      letterSpacing: 'narrow'
    }
  },
  forms: {
    input: {
      border: '2px solid',
      borderRadius: '56px',
      borderColor: 'bodyLight',
      padding: '20px',
      '&:focus': {
        outline: 'none',
        borderRadius: '56px',
        borderColor: 'primary'
      },
      textarea: {
        border: '2px solid',
        borderRadius: '56px',
        borderColor: 'bodyLight',
        padding: '20px',
        '&:focus': {
          outline: 'none',
          borderRadius: '56px',
          borderColor: 'primary'
        }
      }
    },
    search: {
      background: 'white',
      borderColor: 'transparent',
      boxShadow: '0px 4px 20px rgba(212, 218, 238, 0.4)',
      borderRadius: '12px',
      padding: '1.125rem 0 1.125rem 1rem',
      '::placeholder': {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: '1.188rem',
        color: '#AAAFCA'
      }
    },
    longInput: {
      background: 'white',
      borderColor: 'transparent',
      borderRadius: '12px'
    }
  },
  buttons: {
    default: {
      cursor: 'pointer',
      fontFamily: 'body',
      py: '1rem',
      px: '1.5rem',
      fontSize: 3,
      fontWeight: 'bold',
      lineHeight: 'button',
      textTransform: ['capitalize', 'uppercase'],
      borderRadius: '88px',
      '&:focus': {
        outline: 'none'
      },
      '&:hover': {
        scale: '1.1'
      }
    },
    big: {
      cursor: 'pointer',
      fontFamily: 'body',
      py: '2rem',
      px: '1.5rem',
      fontSize: 4,
      fontWeight: 'bold',
      lineHeight: 'button',
      textTransform: ['capitalize', 'uppercase'],
      borderRadius: '88px',
      '&:focus': {
        outline: 'none'
      },
      '&:hover': {
        scale: '1.1'
      }
    },
    small: {
      cursor: 'pointer',
      fontFamily: 'body',
      fontSize: 2,
      textTransform: 'capitalize',
      borderRadius: '48px'
    },
    nofill: {
      cursor: 'pointer',
      background: 'unset',
      border: ['2px', 'solid', 'colors.anotherGray'],
      fontFamily: 'body',
      fontWeight: 'medium',
      fontSize: 2,
      textTransform: 'capitalize',
      borderRadius: '48px',
      outline: 'none'
    },
    nofillGray: {
      cursor: 'pointer',
      background: 'unset',
      border: ['2px', 'solid', 'colors.bodyLight'],
      fontFamily: 'body',
      fontWeight: 'medium',
      fontSize: 2,
      textTransform: 'capitalize',
      borderRadius: '48px',
      outline: 'none'
    },
    tiny: {
      cursor: 'pointer',
      fontFamily: 'body',
      fontSize: 1,
      textTransform: 'capitalize',
      borderRadius: '48px'
    },
    icon: {
      padding: '1.5rem'
    }
  },
  links: {
    default: {
      fontFamily: 'heading',
      textDecoration: 'none',
      color: 'primary',
      cursor: 'pointer',
      '&:hover': {
        color: 'accent'
      }
    },
    secondary: {
      fontFamily: 'heading',
      textDecoration: 'none',
      color: 'secondary',
      cursor: 'pointer',
      '&:hover': {
        color: 'primary'
      }
    },
    nav: {
      fontFamily: 'heading',
      textDecoration: 'none',
      color: 'primary',
      cursor: 'pointer',
      '&:hover': {
        color: 'accent'
      }
    },
    readmore: {
      fontFamily: 'heading',
      textDecoration: 'none',
      color: 'primary',
      cursor: 'pointer',
      fontWeight: 'bold',
      letterSpacing: 'more',
      textTransform: 'uppercase',
      fontSize: '2',
      lineHeight: '18px',
      '&:hover': {
        color: 'accent'
      }
    },
    light: {
      fontFamily: 'body',
      textDecoration: 'none',
      color: 'bodyLight',
      cursor: 'pointer',
      fontWeight: 'medium',
      '&:hover': {
        color: 'accent'
      }
    },
    grey: {
      fontFamily: 'body',
      textDecoration: 'none',
      color: 'bodyDark',
      cursor: 'pointer',
      '&:hover': {
        color: 'accent'
      }
    }
  },
  images: {
    avatar: {
      width: 30,
      height: 30
    }
  },
  spinner: {
    medium: {
      color: 'primary',
      size: 30
    }
  },
  badges: {
    primary: {
      fontFamily: 'body',
      color: 'background',
      bg: 'primary'
    },
    outline: {
      fontFamily: 'body',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px'
    },
    altOutline: {
      fontFamily: 'body',
      textTransform: 'uppercase',
      borderColor: 'bodyLight',
      borderRadius: '48px',
      padding: '5px 11px',
      color: 'bodyLight',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px'
    },
    green: {
      fontFamily: 'body',
      background: '#F5FFF6',
      border: '1px solid #AED6AD',
      boxSizing: 'border-box',
      borderRadius: '4.09946px',
      fontSize: '12px',
      lineHeight: '150%',
      textAlign: 'center',
      color: '#317B2E'
    },
    blue: {
      fontFamily: 'body',
      background: '#EEF9FF',
      border: '1px solid #9FC9F4',
      boxSizing: 'border-box',
      borderRadius: '4.09946px',
      fontSize: '12px',
      lineHeight: '150%',
      textAlign: 'center',
      color: '#3F91E4'
    },
    blueDot: {
      width: '22px',
      height: '22px',
      fontFamily: 'body',
      bg: 'secondary',
      boxSizing: 'border-box',
      borderRadius: '50%',
      fontSize: '14px',
      textAlign: 'center',
      paddingTop: '1px',
      color: 'white'
    }
  }
}
