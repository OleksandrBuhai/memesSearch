import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar"



export const Header: React.FC = () => {

    const handleSearch = (term: string) => {

    };

    return (
        <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
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
            </div>
            <div style={{ marginLeft: "auto" }}>
                <SearchBar onSearch={handleSearch} />
            </div>
        </div>
    )
}