import React from 'react';

class AdminAddEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newEvent: '',
            // start: dateClick
        };
    }
        
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.addEvent(this.state.newEvent, new Date);
        this.setState({ newEvent: '' })
    };

    render(){
        return (
            <div className = "AdminAddEvent-container">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        name='newEvent'
                        placeholder='create an event'
                        onChange={this.handleChange}
                        value={this.state.newEvent}
                        />
                        <button type='submit'>
                            Create Event
                        </button>
                </form>
            </div>
        )
    }
};

export default AdminAddEvent; 