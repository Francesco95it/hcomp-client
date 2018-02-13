import React, {Component} from 'react'

import {List, Image} from 'semantic-ui-react'

export default class TaskItem extends Component {

    render(){
        return (
            <List.Item>
                <Image avatar style={{objectFit: 'cover'}} src={this.props.task.avatar_image} />
                <List.Content>
                    <List.Header>
                        {this.props.task.name}
                    </List.Header>
                    <List.Description>{this.props.task.description}</List.Description>
                </List.Content>
            </List.Item>
        )
    }
}
