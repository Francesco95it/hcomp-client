import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class DeleteTask extends Component {
    componentWillMount(){
        if(this.props.allTask.uploaded) this.props.deleteTask(this.props.task.id);
    }
    render(){
        return <Redirect to='/' />
    }
}
