import React, {Component} from 'react'

import {List, Header, Segment} from 'semantic-ui-react'

import TaskLi from './TaskLi'


export default class TasksInProgress extends Component {

    render(){
        if(this.props.assignmentError) return <Header content='Error fetching your tasks data. Please try again later.' size='small' color='red' />
        if(!this.props.assignmentsFetched) return <Segment basic loading style={{minHeight: '200px', marginTop: 0}} />
        if(this.props.assignments.filter(assignment => {return !assignment.is_completed}).length === 0) return <Header color='teal' size='small' content='All tasks you have done are completed!' />
        return (
            <List divided >
                {this.props.assignments.filter(assignment => {return !assignment.is_completed}).map(assignment => {
                    console.log(assignment);
                    return (<TaskLi key={assignment.id} taskID={assignment.id_task} runID={assignment.id_run} assignment={assignment} isCompleted={false}/>)
                })}
            </List>
        )
    }
}
