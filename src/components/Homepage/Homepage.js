import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Container, List, Header, Grid, Loader} from 'semantic-ui-react'
import axios from 'axios'

import MainHeader from './MainHeader'
import TaskItem from '../TaskItem/TaskItem'

class Homepage extends Component {

    constructor(props){
        super(props);
        this.state = {
            fetchedRecent: false,
            fetchedRecentAssignments: false,
            recentTasks: [],
            recentTasksByAssignments: [],
            error: false
        }
    }

    componentWillMount(){
        axios.get(`/tasks?filter=recentTasks`)
        .then(res => {
            this.setState({
                ...this.state,
                recentTasks: res.data.filter(task => {return task.is_public && task.is_live && task.name}),
                fetchedRecent: true
            })
        })
        .catch(err => console.log(err));
        axios.get(`/tasks?filter=recentTasksByAssignments`)
        .then(res => {
            this.setState({
                ...this.state,
                recentTasksByAssignments: res.data.filter(task => {return task.is_public && task.is_live && task.name}),
                fetchedRecentAssignments: true,
            })
        })
        .catch((err)=>console.log(err));
    }

    render(){
        return (
            <div>
                <MainHeader {...this.props}/>
                <Container>
                    <Grid style={{marginTop: '15px'}}>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header size='large'>Last tasks done by users</Header>
                                <List size='medium' relaxed='very' selection verticalAlign='middle'>
                                    {this.state.fetchedRecentAssignments ?
                                        this.state.recentTasksByAssignments.map(task => {
                                            return <TaskItem key={task.id} task={task} />
                                        }) : <Loader active inline='centered' />
                                    }
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header size='large'>Last created tasks</Header>
                                <List size='medium' relaxed='very' selection verticalAlign='middle'>
                                    {this.state.fetchedRecent ?
                                        this.state.recentTasks.map(task => {
                                            return <TaskItem key={task.id} task={task} />
                                        }) : <Loader active inline='centered' />
                                    }
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        session: state.session,
        user: state.user,
    };
}

export default connect(mapStateToProps)(Homepage);
