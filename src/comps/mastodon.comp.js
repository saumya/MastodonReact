//
import React from 'react';
//

//
const MastodonComp = function(props){

    //const testProp = 'What?!';

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
    const onLoginButtonClick = function(event){
        event.preventDefault();
        //
        
        return false;
    }
    // Auth /
    const onLoginClick_2 = function(event){
        //
        const uri_auth = mastodon_instance + '/oauth/authorize';
        const uri_auth_q = uri_auth+'?client_id=YOUR_CLINET_ID&scope=read+write+follow&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code';
        // Ridirect to the URL 
        // Get the Code
        // Ridirect back here
        //
        //
        window.location.href = uri_auth_q;
        //window.location.replace(uri_auth); //removes from history, so no back button
        //
        return false;
    }
    //
    return(
        <React.Fragment>
            <div className="container">
                <h1 className="title">Mastodon API</h1>
                <h2 className="subTitle">API explorer</h2>
                <div>
                    <button className="button is-primary" onClick={onTestButtonClick}>Test Mastodon</button>
                </div>
                <div className="box">
                    <button className="button is-info" onClick={ onLoginClick_2 }>Login</button>
                </div>
            </div>
        </React.Fragment>
    );
}
//
export default MastodonComp;