//
// Experiementing with
// 1. JS : https://auth0.com/docs/quickstart/spa/vanillajs#initialize-the-sdk
// 2. React:  
//
import React, { useState,useEffect } from 'react';

import createAuth0Client from '@auth0/auth0-spa-js';
//
import AppConfig from './app.configs';
//
const Auth0Comp = function(props){

    //var test = 'Testing';

    const [auth0client,setAuth0Client] = useState(null);
    //const [isAuthenticated, setIsAuthenticated] = useState();
    
    useEffect( ()=>{
        console.log('--- useEffect ---');
        //console.log('auth0client',auth0client);

        if(auth0client){
            console.log('auth0client : IF');
            console.log( auth0client );

           auth0client.isAuthenticated().then(function(isAuthenticated_result){
               console.log( 'isAuthenticated : RESULT' );
               console.log( isAuthenticated_result );

               //isAuthenticated
               //
               if(isAuthenticated_result){
                   console.log( 'auth0client.isAuthenticated() : isAuthenticated : isAuthenticated_result : IF ' );
                   console.log( isAuthenticated_result );
                   // show the gated content
                   return
               }else{
                    console.log( 'auth0client.isAuthenticated() : isAuthenticated : isAuthenticated_result : ELSE ' );
                   //
                   //
                   searchToObject();
                    // show Login UI
                    auth0client.loginWithRedirect({ redirect_uri: window.location.origin }).then(function(result){
                        console.log('--- RESULT --- loginWithRedirect ---');
                        console.log( result );
                        
                        return false;

                    }).catch(function(error){
                        console.log('ERROR');
                        console.log( error );
                    });
                        
                   // conditions
                   // 1. logged in 
                   // 2. url changed but logged in is not set
                   const query = window.location.search;
                    if (query.includes("code=") && query.includes("state=")) {
                        console.log('URL : code & state : IF');
                        console.log(query);
                        // Login Success

                        // Process the login state
                        auth0client.handleRedirectCallback().then(function(handleRedirectCallback_result){
                            console.log('handleRedirectCallback() : RESULT');
                            console.log( handleRedirectCallback_result );
                            // Use replaceState to redirect the user away and remove the querystring parameters
                            //window.history.replaceState({}, document.title, "/");

                            //const isAuthenticated = await auth0.isAuthenticated();
                            
                            auth0client.isAuthenticated().then(function(isAuthenticated_result){
                                console.log('handleRedirectCallback() : isAuthenticated : RESULT');
                                console.log( isAuthenticated_result );

                            }).catch(function(isAuthenticated_error){
                                console.log( 'handleRedirectCallback() : isAuthenticated : ERROR' );
                                console.log( isAuthenticated_error );
                            });
                            
                           //console.log('-------- state ---------');
                           //console.log( this.state );
                           return false;
                        }).catch(function(handleRedirectCallback_error){
                            console.log( 'handleRedirectCallback() : ERROR' );
                            console.log( handleRedirectCallback_error );
                        });
                    }
               }
           }).catch(function(isAuthenticated_error){
               console.log( 'isAuthenticated : ERROR' );
               console.log( isAuthenticated_error );
           });

        }else{
            console.log('auth0client : ELSE');
        }

       

       console.log('--- useEffect / ---');
    } );

    const searchToObject = () => {
        console.log( 'searchToObject' );

        var pairs = window.location.search.substring(1).split("&"),
          obj = {},
          pair,
          i;
      
        for ( i in pairs ) {
          if ( pairs[i] === "" ) continue;
          //
          pair = pairs[i].split("=");
          obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
        }
        return obj;
    }

    const onInitAuth0 = () => {
        console.log('onInitAuth0()');

        createAuth0Client({
            domain: AppConfig.auth0.domain,
            client_id: AppConfig.auth0.clientId
        }).then(function( createAuth0Client_result ){
            //console.log('RESULT1',test);
            //console.log(result1);
            console.log( 'createAuth0Client:RESULT ' );
            setAuth0Client( createAuth0Client_result );
        }).catch(function( createAuth0Client_error ){
            console.log( 'createAuth0Client:ERROR ' );
            console.log( createAuth0Client_error );
        });
        
    }
    return(
    <React.Fragment>
    <div>{props.name}</div>
    <button className="button" onClick={onInitAuth0}>Init Auto0</button>
    </React.Fragment>
);
};
//
export default Auth0Comp;

