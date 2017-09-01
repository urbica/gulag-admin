import 'normalize.css/normalize.css';
import { injectGlobal } from 'styled-components';

import lightWoff2 from '../assets/formular-lightitalic/formular-lightitalic.woff2';
import lightWoff from '../assets/formular-lightitalic/formular-lightitalic.woff';
import lightTtf from '../assets/formular-lightitalic/formular-lightitalic.ttf';
import regularWoff2 from '../assets/formular-regular/formular-regular.woff2';
import regularWoff from '../assets/formular-regular/formular-regular.woff';
import regularTtf from '../assets/formular-regular/formular-regular.ttf';
import mediumWoff2 from '../assets/formular-medium/formular-medium.woff2';
import mediumWoff from '../assets/formular-medium/formular-medium.woff';
import mediumTtf from '../assets/formular-medium/formular-medium.ttf';
import blackWoff2 from '../assets/formular-black/formular-black.woff2';
import blackWoff from '../assets/formular-black/formular-black.woff';
import blackTtf from '../assets/formular-black/formular-black.ttf';

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
    padding: 20px 30px 30px 20px;
    margin: 0 -30px 0 -20px;
    background-color: #fff9d5;
    break-inside: avoid;
    
    h2 {
      opacity: 0.8;
      font-size: 20px;
      font-weight: 900;
      color: #000 !important;
    }

    p {
      opacity: 0.8;
      font-family: Formular;
      font-size: 16px;
      color: #000 !important;
    }
    
    a {
      color: #000 !important;
      border-bottom-color: #000 !important;
      &:hover {
        border-bottom-color: transparent !important;
        transition: 0.4s;
      }
    }
  }
`;
