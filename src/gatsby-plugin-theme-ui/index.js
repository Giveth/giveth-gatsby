// Giveth V2 theme
export default {
  breakpoints: ['700px', '1024px', '1280px'],
  colors: {
    text: '#2C0B3F',
    background: '#fff',
    primary: '#C2449F',
    hover: '#DB5CB8',
    muted: '#DFDAE8',
    secondary: '#303B72',
    accent: '#109CF1',
    attention: '#E01C6B'
  },
  fonts: {
    body: '"Red Hat Text", sans serif',
    heading: '"Red Hat Display", sans serif',
    monospace: '"Inconsolata", monospace'
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
    wide: '3px',
    widest: '5px'
  },
  lineHeights: {
    body: 1.5,
    heading: 1,
    short: 0.5,
    tall: 1.3,
    tallest: 1.5
  },
  grayBox: {
    background: '#E5E5E5'
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
      fontWeight: 'regular'
    },
    overline: {
      fontSize: 2,
      fontFamily: 'heading',
      fontWeight: 'medium',
      letterSpacing: 'widest',
      textTransform: 'uppercase'
    },
    overlineSmall: {
      fontSize: 0,
      fontFamily: 'heading',
      fontWeight: 'medium',
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
      fontWeight: 'bold',
      letterSpacing: 'narrow'
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
      fontSize: 10,
      fontWeight: 'bold',
      letterSpacing: 'tightest'
    },
    h1: {
      fontSize: 11,
      fontWeight: 'medium',
      lineHeight: 'tall',
      letterSpacing: 'tight'
    },
    h2: {
      fontSize: 9,
      fontWeight: 'medium',
      letterSpacing: 'narrowest'
    },
    h3: {
      fontSize: 8,
      fontWeight: 'regular',
      letterSpacing: 'normal'
    },
    h4: {
      fontSize: 7,
      fontWeight: 'medium',
      letterSpacing: 'narrower'
    },
    h5: {
      fontSize: 6,
      fontWeight: 'medium',
      letterSpacing: 'narrow'
    },
    h6: {
      fontSize: 4,
      fontWeight: 'bold',
      letterSpacing: 'narrow'
    }
  },
  forms: {
    input: {
      border: '0',
      padding: '20px'
    }
  },
  buttons: {
    cursor: 'pointer',
    fontSize: 3,
    letterSpacing: 'wide',
    textTransform: 'capitalize',
    borderRadius: '48px',

    default: {
      cursor: 'pointer',
      fontSize: 3,
      letterSpacing: 'wide',
      textTransform: 'capitalize',
      borderRadius: '48px'
    },
    small: {
      cursor: 'pointer',
      fontSize: 2,
      textTransform: 'capitalize',
      borderRadius: '48px'
    },
    tiny: {
      cursor: 'pointer',
      fontSize: 1,
      textTransform: 'capitalize',
      borderRadius: '48px'
    },
    icon: {
      padding: '1.5rem'
    }
  },
  links: {
    nav: {
      fontFamily: 'heading',
      textDecoration: 'none',
      color: 'primary',
      cursor: 'pointer'
    }
  }
}
