import React, {Component} from 'react'

import {List, Header, Segment, Image, Icon} from 'semantic-ui-react'

export default class TasksInProgress extends Component {

    render(){
        if(this.props.assignmentError) return <Header content='Error fetching your tasks data. Please try again later.' size='small' color='red' />
        if(!this.props.assignmentsFetched) return <Segment basic loading style={{minHeight: '200px', marginTop: 0}} />
        if(this.props.assignments.filter(assignment => {return !assignment.isCompleted}).length === 0) return <Header color='teal' size='small' content='All tasks done completed!' />
        return (
            <List>
                {this.props.assignments.filter(assignment => {return !assignment.isCompleted}).map(assignment => {
                    console.log(assignment);
                    return <List.Item key={assignment.id}>
                        <Icon name='search' />
                    </List.Item>
                })}
            </List>
        )
    }
}
