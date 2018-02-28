import React, {Component} from 'react'

import {Redirect, Link} from 'react-router-dom'
import {Image, List, Button, Popup} from 'semantic-ui-react'

export default class TaskLi extends Component {

    constructor(props){
        super(props);
        this.state = {
            edit: false
        }
    }

    onEditClick(e){
        e.stopPropagation();
        this.props.setAll(this.props.task)
        this.setState({
            ...this.state,
            edit: true,
        })
    }

    render(){
        if(this.state.edit) return <Redirect to='editTask' push />
        return  <List.Item>
                    <Image avatar style={{objectFit: 'cover'}} src={this.props.task.avatar_image} />
                    <List.Content>
                        <List.Header>
                            {this.props.task.name}
                        </List.Header>
                        <List.Description>{this.props.task.description}</List.Description>
                    </List.Content>
                    <Popup
                        trigger={<Button circular color='red' icon='delete' compact size='mini' floated='right' onClick={(e)=>this.props.deleteTask(e, this.props.task.id)}/>}
                        content='Delete task'
                    />
                    <Popup
                        trigger={<Button circular color='teal' icon='edit' compact size='mini' floated='right' onClick={(e)=>this.onEditClick(e)}/>}
                        content='Edit task'
                    />
                    <Popup
                        trigger={<Button circular color='green' icon='flag' compact size='mini' floated='right' as={Link} to={`/statistics?tid=${this.props.task.id}`} />}
                        content='See results'
                    />
                </List.Item>
    }
}
