import React, {Component} from 'react'

import {Radio} from 'semantic-ui-react'

export default class Status extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: this.props.task.status
        }
    }

    componentWillUnmount(){
        this.props.setStatus(this.state.value);
    }

    render(){
        return (
            <div>
                <p>Set if your project to public only if is ready for people to work on it.</p>
                <Radio
                label='Private'
                name='radioGroup'
                checked={!this.state.value}
                onChange={()=>this.setState({...this.state, value: false})}
                /><br />
                <Radio
                label='Public'
                name='radioGroup'
                checked={this.state.value}
                onChange={()=>this.setState({...this.state, value: true})}
                />
            </div>
        )
    }
}
