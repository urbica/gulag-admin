import 'normalize.css/normalize.css';
import { injectGlobal } from 'styled-components';

// Formular
import lightWoff2 from './fonts/formular-lightitalic/formular-lightitalic.woff2';
import lightWoff from './fonts/formular-lightitalic/formular-lightitalic.woff';
import lightTtf from './fonts/formular-lightitalic/formular-lightitalic.ttf';
import regularWoff2 from './fonts/formular-regular/formular-regular.woff2';
import regularWoff from './fonts/formular-regular/formular-regular.woff';
import regularTtf from './fonts/formular-regular/formular-regular.ttf';
import mediumWoff2 from './fonts/formular-medium/formular-medium.woff2';
import mediumWoff from './fonts/formular-medium/formular-medium.woff';
import mediumTtf from './fonts/formular-medium/formular-medium.ttf';
import blackWoff2 from './fonts/formular-black/formular-black.woff2';
import blackWoff from './fonts/formular-black/formular-black.woff';
import blackTtf from './fonts/formular-black/formular-black.ttf';

// eslint-disable-next-line
injectGlobal`
  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: Formular;
    src:
      url(${lightWoff2}) format('woff2'),
      url(${lightWoff}) format('woff'),
      url(${lightTtf}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: Formular;
    src:
      url(${regularWoff2}) format('woff2'),
      url(${regularWoff}) format('woff'),
      url(${regularTtf}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: Formular;
    src:
      url(${mediumWoff2}) format('woff2'),
      url(${mediumWoff}) format('woff'),
      url(${mediumTtf}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: Formular;
    src:
      url(${blackWoff2}) format('woff2'),
      url(${blackWoff}) format('woff'),
      url(${blackTtf}) format('truetype');
    font-weight: 800;
    font-style: normal;
  }

  body {
    font-family: 'Formular', sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .incut {
    outline: 20px solid #1A1A1A;

    color: rgba(225,225,225,0.5);

    background-color: #1A1A1A;
    break-inside: avoid;
    
    h2 {
      font-size: 20px;
      font-weight: 500 !important;

      opacity: 0.7;
    }

    p {
      font-size: 16px;
      font-style: italic;

      opacity: 0.7;
    }
  }
`;
