//
// Controlled Component
// Forms : https://reactjs.org/docs/forms.html
//
import React from 'react'
//
/*
function ContactComp (props){
    return(
        <div>
            <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <input type="button" value="submit" />
            </form>
        </div>
    );
}
*/
//
class ContactComp extends React.Component {
    constructor(props){
        super(props);
        this.state = { value:'' };
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
    }
    render(){
        return(
            <div>
                <p>{this.state.value}</p>
                <form onSubmit={this.handleFormSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleNameChange} />
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
//
export default ContactComp;