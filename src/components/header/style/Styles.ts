import styled from "styled-components";


export const HeaderWrapper = styled.div`
   
    display: flex;
    padding: 5rem;
    gap: 40rem;
    background:  url('src/assets/meme-background-u260cqghqox0mz3d (1).jpg')center/cover no-repeat;
    height:100%;
`

export const HeaderSpan = styled.div`
   
   
   display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;


    
    span {
        
        font-size: 1.5rem;
        text-align: start;

        a {
            text-decoration: none;
            color: white;
            &:hover {
                       
            background-image: linear-gradient(to right, white, #00ff00);
             -webkit-background-clip: text; 
            background-clip: text;
            color: transparent;
            }
        }
    }

`