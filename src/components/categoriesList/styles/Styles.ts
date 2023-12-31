import styled from "styled-components";




export const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: white;
 
`;

export const CategoryColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-start;
  font-size: 1.5rem;
  

  div{
    &:hover {       
      background-image: linear-gradient(to right, white, #00ff00);
      -webkit-background-clip: text; 
      background-clip: text;
      color: transparent;
     }
  }
 
`;





export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 2rem;
  color: white;
  
`;


export const CategoryItem = styled.div<{ gifUrl: string }>`
  width: 10rem;
  height: 5rem;
  justify-items: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
  background-image:  url(${props => props.gifUrl});
  font-size: 1.5rem;
  

  &:hover {
    transform: scale(1.1);
    color: black;
  }

`;




