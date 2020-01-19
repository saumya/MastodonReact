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

    const [auth0client, setAuth0Client] = useState(null);
    const [isAuthenticatedFlag, setIsAuthenticatedFlag] = useState(false);
    const [userObj, setUserObj] = useState(null);
    
    useEffect( ()=>{
        console.log('--- useEffect ---');
        //console.log('auth0client',auth0client);
        //debugger;

        if(userObj !== null ){

            console.log( 'User : valid' );
            console.log( userObj );

            console.log('User: Login : Successful.');
            console.log('TODO: Move on');

        }else{
            console.log( 'User : Not Valid' );

                // check URL
                const query = window.location.search;
                if (query.includes("code=") && query.includes("state=")) {
                    console.log('URL : code & state : IF');
                    console.log(query);
                    // wait for auth0client to be initialised
                    // to initialise the client, the call is made already. So just wait.
                    if(auth0client){
                        console.log('URL : code & state : IF : auth0client : IF');
                        //
                        auth0client.handleRedirectCallback().then(function(result){
                            console.log('URL : code & state : IF : auth0client : IF : handleRedirectCallback : RESULT :');
                            console.log('result',result);

                            auth0client.isAuthenticated().then(function(isAuthenticated_result){
                                console.log('RESULT');
                                console.log('isAuthenticated_result',isAuthenticated_result);
                                
                                // reset the URL
                                window.history.replaceState({}, document.title, "/");
                                // useState
                                setIsAuthenticatedFlag( isAuthenticated_result );

                                //return {'result':isAuthenticated_result}
                            }).catch(function(e){
                                console.log('ERROR');
                                console.log(e);
                            });

                        }).catch(function(error){
                            console.log('URL : code & state : IF : auth0client : IF : handleRedirectCallback : ERROR :');
                            console.log('error',error);
                        });
                        //
                        var objFromURL = urlSearchToObject();
                        console.log( objFromURL ); // objFromURL.code, objFromURL.state
                        //
                        //
                    }else{
                        console.log('URL : code & state : IF : auth0client : ELSE');
                        console.log('Just wait ....');
                        console.log('initAuth0() is called already to initialise the auth0client');
                    }
                }else{
                    console.log('URL : code & state : ELSE');
                    if(auth0client){
                        console.log('URL : code & state : ELSE : auth0client : IF : initAuthentication()');
                        initAuthentication();
                    }else{
                        console.log('URL : code & state : ELSE : auth0client : ELSE : Just wait for auth0client to be initialised');
                    }
                    
                }

                

            

            console.log('--- useEffect / ---');
            // init the auth0Client
            onInitAuth0(); 
            // The above call will result in calling useState and 
            // that will call useEffect()
            // We will be back in this closure but now with auth0Client initialised
        
        }// If userObj

    } ); // useEffect

    const urlSearchToObject = () => {
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
    }// urlSearchToObject
    //
    const initAuthentication = async () => {
        console.log('initAuthentication');
        
        if( isAuthenticatedFlag ){
            // Do Nothing
            console.log('initAuthentication : isAuthenticatedFlag : IF :', isAuthenticatedFlag);
            console.log('initAuthentication : isAuthenticatedFlag : IF : DoingNothing. Just a If-Else Console.log');
            //
            auth0client.getUser().then(function(getUser_result){
                console.log('getUser() : RESULT : START');
                console.log( getUser_result );

                setUserObj( getUser_result );

                console.log('getUser() : RESULT : END');
            }).catch(function(getUser_error){
                console.log('getUser() : ERROR : START');
                console.log( getUser_error );
                console.log('getUser() : ERROR : END');
            });
            //
        }else{
            console.log('initAuthentication : isAuthenticatedFlag : ELSE :', isAuthenticatedFlag);
            //const isAuthenticated = await auth0client.isAuthenticated();
            //console.log('initAuthentication : isAuthenticatedFlag : ELSE : await : ', isAuthenticatedFlag);
            //setIsAuthenticatedFlag(isAuthenticated);
            
            auth0client.loginWithRedirect( { redirect_uri: window.location.origin } ).then(function(result){
                console.log('initAuthentication : isAuthenticatedFlag : ELSE : loginWithRedirect() : result');
                
                // This will hardly cause any difference
                console.log( result );
                // Because, as soon as Login / Register happens
                // It will redirect to the original page
                //
            }).catch(function(error){
                console.log('initAuthentication : isAuthenticatedFlag : ELSE : loginWithRedirect() : error');
                console.log( error );
            });
            
           //auth0client.loginWithPopup( {redirect_uri: window.location.origin} );
        }
    }// initAuthentication()
    //
    const onInitAuth0 = () => {
        console.log('onInitAuth0()');
        //
        const initThisClient = function(){
            console.log('initThisClient() : initialising : wait ...');

            createAuth0Client({
                domain: AppConfig.auth0.domain,
                client_id: AppConfig.auth0.clientId
            }).then(function( createAuth0Client_result ){
                //console.log('RESULT1',test);
                //console.log(result1);
                console.log( 'createAuth0Client : RESULT ' );
                setAuth0Client( createAuth0Client_result );
            }).catch(function( createAuth0Client_error ){
                console.log( 'createAuth0Client : ERROR ' );
                console.log( createAuth0Client_error );
            });
        }// initThisClient

        if(auth0client){
            // Do Nothing
            console.log('auth0client: YES : initialised');
            console.log( 'auth0client=', auth0client );
            console.log('auth0client: YES : initialised : DoingNothing. Just a If-Else Console.log');
        }else{
            console.log('auth0client: NOT : initialised');
            initThisClient();
        }
           
        return false;
    } // onInitAuth0

    return(
    <React.Fragment>
    <div>{props.name}</div>
    <button className="button" onClick={onInitAuth0}>Init Auto0</button>
    </React.Fragment>
);
};
//
export default Auth0Comp;

