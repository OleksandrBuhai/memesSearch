import React from 'react';
import { Header } from './components/header/Header';
import { Main } from './components/main/Main';



const App: React.FC = () => {

  
  return (
    <div style={{width:'100%', textAlign: 'center' }}>
      <Header/>
      <Main/>
    </div>
  );
};

export default App;
