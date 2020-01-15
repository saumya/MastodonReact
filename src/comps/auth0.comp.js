//

import React, { useState,useEffect } from 'react';

import createAuth0Client from '@auth0/auth0-spa-js';
//
import AppConfig from './app.configs';
//
const Auth0Comp = function(props){

    //var test = 'Testing';

    const [auth0client,setAuth0Client] = useState(null);
    
    useEffect( ()=>{
        console.log('--- useEffect / ---');
        console.log('auth0client',auth0client);

        if(auth0client){
            auth0client.isAuthenticated().then(function(result){
                console.log('isAuthenticated:RESULT');
                console.log( 'isAuthenticated=',result );

                const query = window.location.search;
                if (query.includes("code=") && query.includes("state=")) {
                    console.log(' -- LOGIN URL -- ');
                    
                    auth0client.handleRedirectCallback().then(function(success_login_url){
                        console.log( 'error_login_url' );
                        console.log( success_login_url );

                    }).catch(function(error_login_url){
                        console.log( 'error_login_url' );
                        console.log(error_login_url);
                    });
                }
                
                if(result===false){
                    loginWithRedirect();
                }else{
                    console.log('LOGIN : SUCCESS');
                }
                
            }).catch(function(error1){
                console.log('isAuthenticated:ERROR', error1 );
            });
        }

        const loginWithRedirect = function(){
            console.log( 'loginWithRedirect' );
            auth0client.loginWithRedirect({
                redirect_uri: window.location.origin
            });
        }


        /*
        const initAuth0 = async ()=>{
            console.log( 'useEffect:initAuth0:');
            const auth0Client = await createAuth0Client({
                domain: AppConfig.auth0.domain,
                client_id: AppConfig.auth0.clientId
            });

            return auth0Client;
        }

        initAuth0().then(function(result1){
            console.log(result1);
        }).catch(function(err1){
            console.log('CATCH:',err1);
        });
        */
    } );

    const onInitAuth0 = () => {
        console.log('onInitAuth0');

        createAuth0Client({
            domain: AppConfig.auth0.domain,
            client_id: AppConfig.auth0.clientId
        }).then(function(result1){
            //console.log('RESULT1',test);
            //console.log(result1);
            setAuth0Client(result1);
        }).catch(function(error1){
            console.log('ERROR1:',error1);
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

