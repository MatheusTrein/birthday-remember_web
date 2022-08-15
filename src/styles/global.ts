import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  	* {
    	margin: 0;
    	padding: 0;
    	box-sizing: border-box;
    	outline: 0;
  	}

  	body {
    	-webkit-font-smoothing: antialiased;
      background-color: ${(props) => props.theme.colors.theme}
  	}

  	body, input, button {
      font-family: 'Bebas Neue', cursive;
    	font-size: 16px;
    	font-weight: 400;
    	color: ${(props) => props.theme.colors.text}
  	}

  	h1, h2, h3, h4, h5, h6, strong {
    	font-weight: 500;
      color: ${(props) => props.theme.colors.text}
  	}

  	button {
      border: none;
      background-color: inherit;
    	cursor: pointer;
  	}

    a {
      text-decoration: none;
      color: inherit;
      font-weight: normal;
    }

    //Animations

    @keyframes animation {
      to {
        opacity: 1;
        transform: initial;
      }
    }

    .animeLeft {
      opacity: 0;
      transform: translateX(-20px);
      animation: animation 0.2s forwards;
    }
`;
