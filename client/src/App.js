import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {DataProvider} from './globalState';
import Header from './components/headers/Header';
import MainPages from './components/mainPages/Pages';
import Footer from './components/footer/Footer';


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <MainPages/>
          <Footer/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
