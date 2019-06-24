import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class Form extends React.Component {

    // the data that changes
    state = {
        text: ''
    };

    handleChange = (e) => {
        const newText = e.target.value;
        this.setState({
            text: newText
        });
    };

    handleKeyDown = (e) => {
        const key = e.key;
        if(e.key === "Enter"){
            console.log(this.state.text);
            this.props.submit(this.state.text);
            this.setState({text: ''});
        }
    };
    
    render(){
        const {text} = this.state;
        return(
            <TextField
            label="todo..."
            margin="normal"
            value={text}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            fullWidth />
        );
    }
}