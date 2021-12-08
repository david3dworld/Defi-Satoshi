import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@satoshicrypto/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Monda', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  html, body, #root{
    width: 100%;
    height: 100%;
  }
  #root>div:first-child, #root>div:first-child>div, #root>div:first-child>div>div{
    height: 100%;
  }
  .iframe::-webkit-scrollbar{
    display: none;
  }
  .iframe {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`

export default GlobalStyle
