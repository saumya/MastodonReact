//
// Controlled Component
// Forms : https://reactjs.org/docs/forms.html
//
import React from 'react'
//
import { Masto } from 'masto';
//
import AppConfig from './app.configs';

//
class ContactComp extends React.Component {
    constructor(props){
        super(props);
        this.state = { value:'', isTootDone: false, tootUrl:'' };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleNameChange(event){
        this.setState({ value: event.target.value});
    }
    handleFormSubmit(event){
        //event.stopImmediatePropagation();
        event.preventDefault();
        console.log('Submit', this.state.value );
        this.tootMyStatus();
    }
    tootMyStatus(){
        console.log('tootStatus');
        //console.log( AppConfig.mastodon );
        
        var newStatus = this.state.value;
        var that = this;

        const onTootSuccess = function(result){
            console.log('onTootSuccess');
            console.log('that.state',that.state);
            console.log(result);
            //console.log('url', result.url);

            that.setState({value:'', isTootDone:true, tootUrl:result.url});
        }

        const onLoginSuccess = function(masto){
            console.log('onLoginSuccess');
            console.log('masto',masto);

            masto.createStatus({
                status: newStatus,
                visibility: AppConfig.mastodon.statusVisibility,
            }).then(function(result){
                console.log('RESULT');
                //console.log(result);
                onTootSuccess(result);
            }).catch(function(error2){
                console.log('ERROR : 2 : ');
                console.log( error2 );
            });
        }

        Masto.login({
            uri: AppConfig.mastodon.uri,
            accessToken: AppConfig.mastodon.accessToken
        }).then(function(result){
            onLoginSuccess(result);
        }).catch(function(error1){
            console.log('ERROR : 1 : ');
            console.log( error1 );
        });
    }
    render(){
        return(
            <React.Fragment>
                <div className='box has-background-white-ter'>
                    
                        <h3 className='is-size-4'> Toot | What are you doing?</h3>
                        <p className="is-size-5 has-text-primary">{this.state.value}</p>
                        {this.state.isTootDone ? <p className="is-size-5 has-text-success">Toot Successful.</p> : <p> Fail! </p>}
                        <form onSubmit={this.handleFormSubmit}>
                        <label>
                            Status:
                            <input className="input" type="text" value={this.state.value} onChange={this.handleNameChange} />
                        </label>
                        <input className="button is-info" type="submit" value="Toot" />
                        </form>
                        { this.state.isTootDone ? <span> Toot : <a className='is-size-6' href={ this.state.tootUrl }>{this.state.tootUrl}</a> </span> : null }
                    
                </div>
            </React.Fragment>
        );
    }
}
//
export default ContactComp;