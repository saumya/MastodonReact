//
import React, { useState, userEffect, useEffect } from 'react';
//
import AppConfig from './app.configs'
//
const MastodonComp = function(props){

    //const testProp = 'What?!';

    //--- Hooks ---
    // Declare a new state variable, which we'll call "authCode"
    const [authCode, setAuthCode] = useState('');
    useEffect(()=>{
        if(authCode===''){
            //Do Nothing
            //document.title = 'Toot API';
        }else{
            document.title = 'Mastodon.Login';
        }
    });
    //--- Hooks / ---

    const mastodon_instance = 'https://mastodon.social';

    const onGotMastondonPublicUpdates = function(updates){
        console.log( 'onGotMastondonPublicUpdates' );
        //console.log( updates );
        updates.map(function(item){
            console.log('Status', item.content);
            return item;
        });
    }
    const onTestButtonClick = function(event){
        console.log('onTestButtonClick');
        //console.log(event);
        //
        const url_Mpublic = 'https://mastodon.social/api/v1/timelines/public?limit=2';
        fetch(url_Mpublic,{
            method: 'GET'
        }).then(function(result){
            console.log('--- RESULT ---');
            //console.log(result);
            if(result.status === 200){
                result.json().then(function(resultJson){
                    console.log('--- resultJson ---');
                    //console.log(resultJson);
                    onGotMastondonPublicUpdates(resultJson);
                    console.log('--- resultJson / ---');
                }).catch(function(errorJson){
                    console.log('.json() error');
                    console.log(errorJson);
                });
            }
            console.log('--- RESULT / ---');
        }).catch(function(error){
            console.log('--- ERROR ---');
            console.log(error);
            console.log('--- ERROR / ---');
        });
        //
        return false;
    }
    //
    // Auth
    const onLoginClick_2 = function(event){
        //
        const uri_auth = mastodon_instance + '/oauth/authorize';
        const url_params = '?client_id='+AppConfig.mastodon.clientKey+'&scope=read+write+follow&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code';
        const uri_auth_q = uri_auth+url_params;
        // Ridirect to the URL 
        // Get the Code
        // Ridirect back here
        //
        //
        //window.location.href = uri_auth_q;
        //window.location.replace(uri_auth); //removes from history, so no back button
        //var strWindowFeatures = "menubar=no,location=no,resizable=no,scrollbars=no,status=yes";
        //var winObj = window.open(uri_auth_q,'loginWin');
        window.open(uri_auth_q,'loginWin');
        //
        return false;
    }
    const onGotAccessCode = function(event){
        event.preventDefault();
        //
        console.log('onGotAccessCode');
        console.log( authCode ); //From the 'state'
        //
        return false;
    }

    const onAuthCodeChange = function(event){
        //console.log('onAuthCodeChange');
        //console.log(event.target.value);
        //console.log('state',state);
        setAuthCode(event.target.value); //From the 'HOOK'
    }
    //
    return(
        <React.Fragment>
            
            <div>
                
                <h1 className="title">Mastodon API</h1>
                <h2 className="subTitle">API explorer</h2>
                <div>
                    <button className="button is-primary" onClick={onTestButtonClick}>Test Mastodon</button>
                </div>
                <div> &nbsp; </div>

                <div className="section">
                    <div className="container">
                        <h1 className="title">Login with Mastodon</h1>
                        <h2 className="subTitle">OAuth Flow</h2>
                        <div className="">
                            <div className="field">
                                <div className="control">
                                    <button className="button is-info is-medium is-fullwidth" onClick={ onLoginClick_2 }>Login</button>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input className="input is-medium" type="text" placeholder="Authorization Code" onChange={onAuthCodeChange}></input>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-text-centered">
                                <button className="button is-info" onClick={ onGotAccessCode }>Let's Go</button>
                                <div>{ authCode }</div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}
//
export default MastodonComp;