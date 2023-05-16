import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  @media (max-width: 1080px){
    html{
      font-size: 93.75%;  /* 15px */
    }
  }
  @media (max-width: 720px){
    html{
      font-size: 87.5%; /* 14px */
    }
  }
  #__next{
    font-size: 1rem;
    font-family: sans-serif, 'Times New Roman', Times;
    font-weight: normal;
    color: #0F1111;

    background: #F2F3F8;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  p, ul, ol, h1, h2, h3, h4, h5, h6 {
    margin: 0px;
    padding: 0px;
  }
  li{
    list-style-type: none;
  }

  a,button,input,textarea {
    cursor: pointer;
    text-decoration:none;
    color: inherit;
    outline: none;
  }
  textarea {
    border: solid 1px #B8B8B8;
  }
  button {
    border: none;
    &:disabled {
      background:#efefef4d !important;
      color:#1010104d !important;
      border: 1px solid #7676764d !important;
      opacity: 100% !important;
      cursor: default;
    }
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
