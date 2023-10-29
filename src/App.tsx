
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';
import SearchBar from './components/searchBar/SearchBar';



const App: React.FC = () => {


  const handleSearch = (term: string) => {
    console.log(term)
  };
  
  return (
    <div>
      <Header/>
      <SearchBar onSearch={handleSearch} />
      <Main/>
    </div>
  );
};

export default App;
