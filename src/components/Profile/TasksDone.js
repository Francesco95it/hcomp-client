import React, {Component} from 'react'

import {Header, Segment, List} from 'semantic-ui-react'

import TaskLi from './TaskLi'

export default class TasksDone extends Component {

    render(){
        if(this.props.assignmentError) return <Header content='Error fetching your tasks data. Please try again later.' size='small' color='red' />
        if(!this.props.assignmentsFetched) return <Segment loading basic style={{minHeight: '200px', marginTop: 0}} />
        if(this.props.assignments.filter(assignment => {return assignment.is_completed}).length === 0) return <Header color='teal' size='small' content='No task completed for now!'  />

        return (
            <List>
                {this.props.assignments.filter(assignment => {return assignment.is_completed}).map(assignment => {
                    console.log(assignment);
                    return (<TaskLi key={assignment.id} taskID={assignment.id_task} runID={assignment.id_run} assignment={assignment} isCompleted={true} />)
                })}
            </List>
        )
    }
}
