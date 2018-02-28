import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import {Loader, Container, Segment, Header} from 'semantic-ui-react'
import axios from 'axios'

import RunStats from './RunStats'

export default class Statistics extends Component {

    constructor(props){
        super(props);
        this.state = {
            taskID: null,
            runs: [],
            statistics: null,
            loading: true
        }
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        if (params.get('tid')) this.setState({
            ...this.state,
            taskID: params.get('tid')
        })
        axios.get(`/tasks/runs?filter=id_task&parameter=${params.get('tid')}`)
        .then(res => {
            this.setState({
                ...this.state,
                loading: false,
                runs: res.data.filter(run => run.name)
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        if(this.state.loading) return <Loader active />
        if(!this.state.taskID) return <Redirect to='/manageTasks' />
        return (
            <Container>
                <Segment>
                    <Header content='Choose a task' />
                    {this.state.runs.map(run => {
                        return <RunStats key={run.index} tid={this.state.taskID} run={run} />
                    })}
                </Segment>
            </Container>
        )
    }
}
