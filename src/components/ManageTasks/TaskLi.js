import React, {Component} from 'react'

import {Redirect} from 'react-router-dom'
import {Image, List, Button} from 'semantic-ui-react'

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
                    <Image avatar src={this.props.task.avatar_image} />
                    <List.Content>
                        <List.Header>
                            {this.props.task.name}
                        </List.Header>
                        <List.Description>{this.props.task.description}</List.Description>
                    </List.Content>
                    <Button circular color='red' icon='delete' compact size='mini' floated='right' onClick={(e)=>this.props.deleteTask(e, this.props.task.id)}/>
                    <Button circular color='teal' icon='edit' compact size='mini' floated='right' onClick={(e)=>this.onEditClick(e)}/>
                </List.Item>
    }
}
