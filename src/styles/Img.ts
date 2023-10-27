import styled from "styled-components";


interface ImgProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
  }
  
  export const Img = styled.img<ImgProps>`
    width: ${(props) => props.width || "15rem"};
    height: ${(props) => props.height || "15rem"};
    
  `;