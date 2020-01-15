//
import React, { useState, useEffect } from 'react';
import './App.css';

//
import HomeComp from './comps/home.comp';
import InfoComp from './comps/info.comp';
import ContactComp from './comps/contact.comp';
import MastodonComp from './comps/mastodon.comp';
import Auth0Comp from './comps/auth0.comp';
//

function App() {

  // home, mastodon, auth0
  const [ uiName, setUIName ] = useState('home');
  useEffect(()=>{
    // Nothing Yet!
  });

  //
  const renderUIForState = ()=>{
    let uiCompToRender = null;
    if(uiName === 'home'){
      uiCompToRender = ( <ContactComp /> );
    }else if( uiName === 'mastodon' ){
      uiCompToRender = ( <MastodonComp /> );
    }else if( uiName === 'auth0' ){
      uiCompToRender = ( <Auth0Comp name='App.js:Auth0Comp' /> );
    }
    return uiCompToRender;
  }
  //

  const onHomeClick = () => {
    setUIName('home');
  }
  const onMastodonClick = () => {
    setUIName('mastodon');
  }
  const onAuth0Click = () => {
    setUIName('auth0');
  }

  //console.log('uiToRender:', uiToRender);

  return (
    <section className="section">
      <div className="container">
        
        <header>
          <HomeComp name="One" />
          <InfoComp name="One" />

          <button className="button" onClick={onHomeClick}>Home</button>
          <button className="button" onClick={onMastodonClick}>Mastodon</button>
          <button className="button" onClick={onAuth0Click}>Auth0</button>

          {/* ( ( uiName==='mastodon' ) ? <MastodonComp /> : <ContactComp /> ) */}
          { renderUIForState() }

        </header>
      </div>
    </section>
  );
}

export default App;
