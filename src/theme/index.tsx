import { transparentize } from 'polished'
import React, { useMemo } from 'react'
import { Text, TextProps } from 'rebass'
import styled, {
    DefaultTheme,
    ThemeProvider as StyledComponentsThemeProvider,
    createGlobalStyle,
    css,
    keyframes
} from 'styled-components'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
    upToExtra2Small: 320,
    upToExtraSmall: 500,
    upToSmall: 720,
    upToMedium: 960,
    upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
    (accumulator, size) => {
        ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
            @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
                ${css(a, b, c)}
            }
        `
        return accumulator
    },
    {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
    return {
        // base
        white,
        black,

        // text
        text1: darkMode ? '#04bbfb' : '#000000',
        text2: darkMode ? '#04bbfb' : '#565A69',
        text3: darkMode ? '#04bbfb' : '#888D9B',
        text4: darkMode ? '#04bbfb' : '#C3C5CB',
        text5: darkMode ? '#04bbfb' : '#EDEEF2',

        // backgrounds / greys
        bg1: darkMode ? 'red' : '#FFFFFF',
        bg2: darkMode ? '#E9EAEB' : '#F7F8FA',
        bg3: darkMode ? '#E9EAEB' : '#EDEEF2',
        bg4: darkMode ? '#3a506f' : '#CED0D9',
        bg5: darkMode ? '#6C7284' : '#888D9B',

        //specialty colors
        modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
        advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

        //primary colors
        primary1: darkMode ? '#05195a' : '#0e0e23',
        primary2: darkMode ? '#05195a' : '#FF8CC3',
        primary3: darkMode ? '#04bbfb' : '#FF99C9',
        primary4: darkMode ? '#04bbfb' : '#F6DDE8',
        primary5: darkMode ? '#04bbfb' : '#ebebeb',

        // color text
        primaryText1: darkMode ? '#05195a' : '#0e0e23',

        // secondary colors
        secondary1: darkMode ? '#0094ec' : '#ff007a',
        secondary2: darkMode ? '#17000b26' : '#F6DDE8',
        secondary3: darkMode ? '#17000b26' : '#ebebeb',

        // other
        red1: '#FD4040',
        red2: '#F82D3A',
        red3: '#D60000',
        green1: '#27AE60',
        yellow1: '#FFE270',
        yellow2: '#F3841E',
        blue1: '#0094ec',

        borderRadius: '25px'

        // dont wanna forget these blue yet
        // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
        // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
    }
}

export function theme(darkMode: boolean): DefaultTheme {
    return {
        ...colors(darkMode),

        grids: {
            sm: 8,
            md: 12,
            lg: 24
        },

        //shadows
        shadow1: darkMode ? '#000' : '#2F80ED',

        // media queries
        mediaWidth: mediaWidthTemplates,

        // css snippets
        flexColumnNoWrap: css`
            display: flex;
            flex-flow: column nowrap;
        `,
        flexRowNoWrap: css`
            display: flex;
            flex-flow: row nowrap;
        `
    }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    //const darkMode = useIsDarkMode()
    const darkMode = true

    const themeObject = useMemo(() => theme(darkMode), [darkMode])

    return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
    color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
    main(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'text2'} {...props} />
    },
    link(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
    },
    black(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'text1'} {...props} />
    },
    white(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'white'} {...props} />
    },
    body(props: TextProps) {
        return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
    },
    largeHeader(props: TextProps) {
        return <TextWrapper fontWeight={600} fontSize={24} {...props} />
    },
    mediumHeader(props: TextProps) {
        return <TextWrapper fontWeight={500} fontSize={20} {...props} />
    },
    subHeader(props: TextProps) {
        return <TextWrapper fontWeight={400} fontSize={14} {...props} />
    },
    small(props: TextProps) {
        return <TextWrapper fontWeight={500} fontSize={11} {...props} />
    },
    blue(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
    },
    yellow(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
    },
    darkGray(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'text3'} {...props} />
    },
    gray(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
    },
    italic(props: TextProps) {
        return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
    },
    error({ error, ...props }: { error: boolean } & TextProps) {
        return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
    }
}

export const FixedGlobalStyle = createGlobalStyle`
// html, input, textarea, button {
//   font-family: "DM Sans", sans-serif;
//   font-display: fallback;
// }
// input, textarea {
//   font-family: "DM Sans", sans-serif;
//   font-display: fallback;
// }
// @supports (font-variation-settings: normal) {
//   html, button {
//     font-family: "DM Sans", sans-serif;
//   }
//   input, textarea {
//     // font-family: "DM Sans", sans-serif;
//   }
// }

.fromBalance {
    display: flex;
    border: 1px solid red;
}

reach-portal div[data-popper-reference-hidden="false"][data-popper-escaped="false"] {
    background: #fff !important
}

.swap-box, .liquidity-box, .bodyBox {
    // border: 1px solid red !important;
    display: block !important;
    position: relative !important;
    border: 1px solid white !important;
    border-radius: 25px !important;
    background-color: #fff !important;
    width: 70% !important;
    max-width: 420px !important;
    padding: 20px !important;
    color: #05195a !important;
    overflow: visible;
    box-shadow: 0.75px 0.75px 20px 0.1px #04bbfb !important;
    box-sizing: content-box !important;
    // padding-bottom: 10px !important;
}

.liquidity-box {
    padding: 30px !important;
}

@media (max-width: 650px) {
    .swap-box, .bodyBox {
        width: 18rem !important;
    }
}


.list-token-manage-button {
    display: none;
}

.modal_text.token_name {
    color: #05195a;
    font-weight: bold;
}

@media (max-width: 600px) {
    .liquidity_header {
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important; 
    }

    .pool_button, #join-pool-button div {
        height: 30px ;
        font-size: 12px !important;
        display: flex;
        align-items: center;
        text-align: center;
    }


}

.wallet_type_options {
    cursor: pointer;
}

.wallet_type_card:hover {
    background-color: #e9eaeb
}

#join-pool-button {
    border-radius: 20px !important;
}

.token_search_box {
    border-radius: 25px !important;
    background: #fff !important;
    width: 100%;
}

.wallet_modal_header svg {
    width: 16px;
    margin: 0 auto;
}

.wallet_modal_header {
    border: 1px solid red;
    display: flex !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
}


div[aria-modal="true"][role="dialog"][tabindex="-1"][aria-label="dialog"] {
    background-color: transparent !important;
    box-shadow: 0 4px 10px 0 #05195a !important;
    border-radius: 32px !important;

}


#token-search-input {
    color: #05195a;
}

.connect_wallet_modal {
    border: 1px solid blue !important;
}

.token_item:hover {
    background: #ebebeb !important;
}

// .currency_select_token {
//     border: 1px solid red !important;
//     object-fit: contain !important;
//     width: 25px !important;
//     height: 25px !important;
// }

.border_check {
    border: 1px solid red;
}



body {
    background: linear-gradient(250deg, #05195a 33.3%, #040f31);
    min-height: 100vh;

  }


  * {
    font-family: "Poppins", sans-serif;
  }

html,
body {
  margin: 0;
  padding: 0;

}

 a {
   color: ${colors(false).blue1}; 
 }

* {
  box-sizing: border-box;
}

.lightcard_border {
    border: 2px solid #E9EAEB;
    border-radius: 16px;
}

.add_liquidity_wrapper {
    // border-radius: 20px !important;
    // box-shadow: 0.75px 0.75px 20px 0.1px #04bbfb;
    // padding: 25px;
    display: block;
    position: relative;
    border: 1px solid white;
    border-radius: 25px !important;
    background-color: #fff;
    width: 42rem;
    max-width: 420px;
    padding: 20px;
    color: #05195a;
    box-shadow: 0.75px 0.75px 20px 0.1px #04bbfb;
    box-sizing: content-box;
}

@media (max-width: 650px) {
    .add_liquidity_wrapper {
        width: 20rem !important;

}
  }

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
}
`

const breatheAnimation = keyframes`
  0% {filter: hue-rotate(0deg) brightness(1)}
  100% {filter: hue-rotate(90deg) brightness(1.5)}
  100% {filter: hue-rotate(360deg) brightness(1)}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  /*background-color: ${({ theme }) => theme.bg2};*/
  background: transparent;

}

.alert_box {
    border-width: 2px;
    border-style: solid;
    border-color: rgb(233, 234, 235);
    border-image: initial;
    border-radius: 16px;
    padding: 16px;
}


  #root {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    overflow-x: hidden;
    overflow-y: auto;
    background: linear-gradient(250deg, #05195a 20%, #040f31);
    min-height: 100vh;
    height: auto;
    // max-height: 192vh;
    font-family: 'Poppins', sans-serif;
    // background-image: url(https://i.ibb.co/DK7D78c/Soku-Mobile-Lower-Logo.png);
    // background-repeat: no-repeat;
    // background-position: bottom 0 right 10px;
    // background-size: 30% !important;
  }

//   @media (max-width: 650px) and (max-height: 930px) {
//       #root {
//         background-position: bottom 67px right 10px;
//         background-size: 50% !important;
//       }

//   }

//   @media (min-width: 600px) and (max-width: 900px) {
//       #root {
//         background-position: bottom 67px right 10px;
//         background-size: 50% !important;
//       }

//   }

  @media (min-height: 1100px) {
    //   #root {
    //     background-position: bottom right 10px !important;
    //     background-size: 35% !important;
    //   }

  }
`
