import { createGlobalStyle } from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  body {
        background-color: #FAFAFA;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased !important;
    }
`;
