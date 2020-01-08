//
import React from 'react';
import './App.css';

//
import HomeComp from './comps/home.comp';
import InfoComp from './comps/info.comp';
//

function App() {
  return (
    <div className="App">
      <header>
        <HomeComp name="One" />
        <InfoComp name="One" />
      </header>
    </div>
  );
}

export default App;
