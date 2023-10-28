import { Link } from "react-router-dom";
import { HeaderSpan, HeaderWrapper } from "./style/Styles";
import { baseURL } from "../../router";



export const Header: React.FC = () => {

   

    return (
        <HeaderWrapper>
            <HeaderSpan>
                <span>
                    <Link to={`${baseURL}/`}>
                        Meme Portal
                    </Link>
                </span>
                <span>
                    <Link to={`${baseURL}/categories`}>
                        Categories
                    </Link>
                </span>
            </HeaderSpan>
            <div >
                
            </div>
        </HeaderWrapper>
    )
}