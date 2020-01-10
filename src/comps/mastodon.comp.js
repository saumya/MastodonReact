//
import React from 'react';
//

//
const MastodonComp = function(props){

    //const testProp = 'What?!';

    const onGotMastondonPublicUpdates = function(updates){
        console.log( 'onGotMastondonPublicUpdates' );
        console.log( updates );
        updates.map(function(item){
            console.log('Status', item.content);
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
    return(
        <React.Fragment>
            <div className="container">
                <h1 className="title">Mastodon API</h1>
                <h2 className="subTitle">API explorer</h2>
                <div>
                    <button className="button is-primary" onClick={onTestButtonClick}>Test Mastodon</button>
                </div>
            </div>
        </React.Fragment>
    );
}
//
export default MastodonComp;