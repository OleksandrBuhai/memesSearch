import { Link } from "react-router-dom";
import { HeaderSpan, HeaderWrapper } from "./style/Styles";



export const Header: React.FC = () => {

   

    return (
        <HeaderWrapper>
            <HeaderSpan>
                <span>
                    <Link to={'/'}>
                        Meme Portal
                    </Link>
                </span>
                <span>
                    <Link to={'/categories'}>
                        Categories
                    </Link>
                </span>
            </HeaderSpan>
            <div >
                
            </div>
        </HeaderWrapper>
    )
}