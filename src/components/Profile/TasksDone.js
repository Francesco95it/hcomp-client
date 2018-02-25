import React, {Component} from 'react'

import {Header, Loader} from 'semantic-ui-react'

export default class TasksDone extends Component {

    render(){
        if(this.props.assignmentError) return <Header content='Error fetching your tasks data. Please try again later.' size='small' color='red' />
        if(!this.props.assignmentFetched) return <Loader active style={{minHeight: '200px', marginTop: 0}} />
        return <h1>TasksInProgress</h1>
    }
}
