import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {Image, Card} from 'semantic-ui-react'

export default class TaskSearchItem extends Component {

    render(){
        return (
            <Card link as={Link} to={`/task/${this.props.task.id}`}>
                <Card.Content>
                    <div style={{minWidth: 'fit-content', textAlign: 'center'}}>
                    <Image centered size='small' style={{objectFit: 'cover'}} src={this.props.task.avatar_image} />
                    </div>
                    <Card.Header style={{marginTop: '10px'}}>
                        {this.props.task.name}
                    </Card.Header>
                    <Card.Description>{this.props.task.description}</Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
