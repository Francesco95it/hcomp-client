import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import axios from 'axios'
import {Container, Header, Segment, Grid, Image} from 'semantic-ui-react'

import RunsDisplayer from './RunsDisplayer'

class TaskPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            task: null,
            error: false,
            runs: null,
            runsError: false,
            taskFetched: false,
        }
    }

    componentDidMount(){
        axios.get(`/tasks/${this.props.match.params.id}`)
        .then( res => {
            this.setState({
                ...this.state,
                task: res.data,
                taskFetched: true,
                error: false,
            });
            axios.get(`/tasks/runs?filter=id_task&parameter=${res.data.id}`)
            .then(res => {
                this.setState({
                    ...this.state,
                    runs: res.data
                })
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    runsError: true
                })
            })
        })
        .catch( err => {
            console.log(err);
            this.setState({
                ...this.state,
                taskFetched: false,
                error: true
            })
        })
    }

    render(){
        if(this.state.error) return <Header color='red'>An error has happened. Please try again later.</Header>
        if(!this.state.taskFetched) return <Segment loading style={{minHeight: '200px'}} />
        if(!this.state.task.is_active) return <Redirect to='/' />
        console.log(this.state.task);
        return(
            <Container>
                <Segment style={{marginTop: '0'}} >
                    <Grid columns={2} padded>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <Header size='huge'>{this.state.task.name}</Header>
                                <Header size='small'>{this.state.task.description}</Header>
                                <p>{this.state.task.introduction}</p>
                            </Grid.Column>
                            <Grid.Column width={4}>
                            <Image size='small' rounded centered bordered src={this.state.task.avatar_image} />
                            <Header size='tiny' textAlign='center'>Task created by {this.state.task.username}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header size='medium'>Available Runs</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <RunsDisplayer authenticated={this.props.session.authenticated} runs={this.state.runs} runsError={this.state.runsError} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        session: state.session
    };
}

export default connect(mapStateToProps)(TaskPage);
