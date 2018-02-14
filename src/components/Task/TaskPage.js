import React, {Component} from 'react'

import axios from 'axios'
import {Container, Header, Segment, Grid, Image} from 'semantic-ui-react'

import RunsDisplayer from './RunsDisplayer'

export default class TaskPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            task: null,
            runs: null,
            creator: null,
            taskFetched: false,
            error: false
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        axios.get(`/tasks/${this.props.match.params.id}`)
        .then( res => {
            this.setState({
                ...this.state,
                task: res.data,
                taskFetched: true,
                error: false,
            });
            axios.get(`/users/${res.data.id_creator}`)
            .then(res => {
                this.setState({
                    ...this.state,
                    creator: res.data.name
                })
            })
            .catch(err => {
                console.log(err);
            });
            axios.get(`/tasks/runs?filter=id_task&parameter=${res.data.id}`)
            .then(res => {
                this.setState({
                    ...this.state,
                    runs: res.data
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
                            <Header size='tiny' textAlign='center'>Task created by {this.state.creator}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header size='medium'>Available Runs</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <RunsDisplayer runs={this.state.runs} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        )
    }
}
