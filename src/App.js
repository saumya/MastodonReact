//
import React from 'react';
import './App.css';

//
import HomeComp from './comps/home.comp';
import InfoComp from './comps/info.comp';
import ContactComp from './comps/contact.comp';
//

function App() {
  return (
    <div className="App">
      <header>
        <HomeComp name="One" />
        <InfoComp name="One" />
        <ContactComp />
      </header>
    </div>
  );
}

export default App;
