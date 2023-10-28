import styled, { keyframes } from "styled-components";

const waveAnimation = keyframes`
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
`;

export const SearchInput = styled.input`
    width: 90%;
    padding: 1rem;
    font-size: 1.5rem;
    outline: none;

    &:focus {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px inset;
    &::after {
      content: '';
      position: absolute;
      top: -5px;
      right: -5px;
      bottom: -5px;
      left: -5px;
      border: 2px solid;
      border-image: linear-gradient(to right, #ff0000, #00ff00, #0000ff);
      border-image-slice: 1;
      border-radius: 7px;
      pointer-events: none;
    }
}
`


export const AnimatedButton = styled.button`
    display: inline-block;
    height: 100%;
    width: 100%;
    border: none;
    color: white;
    cursor: pointer;
    background: linear-gradient(to right, #ff0000, #00ff00, #0000ff);
    background-size: 200% 200%;
    animation: ${waveAnimation} 5s infinite ease-in-out;
    font-size: 1.5rem;
    &:hover {
        animation: none;
    }
`;