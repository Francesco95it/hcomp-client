import React, {Component} from 'react'

import {Header, Segment} from 'semantic-ui-react'

export default class TasksDone extends Component {

    render(){
        if(this.props.assignmentError) return <Header content='Error fetching your tasks data. Please try again later.' size='small' color='red' />
        if(!this.props.assignmentsFetched) return <Segment loading basic style={{minHeight: '200px', marginTop: 0}} />
        if(this.props.assignments.filter(assignment => {return assignment.isCompleted}).length === 0) return <Header color='teal' size='small' content='No task completed for now!'  />
        return <h1>TasksInProgress</h1>
    }
}
