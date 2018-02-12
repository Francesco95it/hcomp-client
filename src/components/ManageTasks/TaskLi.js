import React, {Component} from 'react'

import {Image, List, Button} from 'semantic-ui-react'

export default class TaskLi extends Component {

    render(){
        return  <List.Item>
                    <Image avatar src={this.props.task.avatar_image} />
                    <List.Content>
                        <List.Header>
                            {this.props.task.name}
                        </List.Header>
                        <List.Description>{this.props.task.description}</List.Description>
                    </List.Content>
                    <Button circular color='red' icon='delete' compact size='mini' floated='right' onClick={(e)=>this.props.deleteTask(e, this.props.task.id)}/>
                    <Button circular color='teal' icon='edit' compact size='mini' floated='right' onClick={(e)=>this.props.editTask(e, this.props.task.id)}/>
                </List.Item>
    }
}
