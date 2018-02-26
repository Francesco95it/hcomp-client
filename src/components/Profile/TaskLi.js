import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import axios from 'axios'
import {List, Image, Button, Loader} from 'semantic-ui-react'
import moment from 'moment'

export default class TaskLi extends Component {

    constructor(props){
        super(props);
        this.state = {
            task: null,
            fetched: false,
            error: false
        }
    }

    componentDidMount(){
        axios.get(`/tasks/${this.props.taskID}`)
        .then(task => {
            axios.get(`/tasks/runs/${this.props.runID}`)
            .then(run => {
                console.log(run);
                this.setState({
                    ...this.state,
                    task: task.data,
                    run: run.data,
                    fetched: true
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: true
                })
            })
        })
        .catch(err => {
            this.setState({
                ...this.state,
                error: true
            })
            console.log(err);
        })
    }

    render(){
        if (this.state.error) return <List.Header color='red'>Error retrieving infos for this task.</List.Header>
        if (!this.state.fetched) return <Loader inline='centered' active />

        // let percent = 100;
        // if(!this.props.isCompleted) percent = (this.props.assignment.answers.length+1)*100/(this.state.run.images.length-1)
        return (
            <List.Item>
                <Image avatar src={this.state.task.avatar_image} />
                <List.Content>
                    <List.Header>{this.state.task.name}, {this.state.run.name}</List.Header>
                    <List.Description>Completed on {moment(this.props.assignment.updatedAt).format("D/MM/YYYY")}</List.Description>
                </List.Content>
                {this.props.isCompleted ? null : (
                    <Button as={Link} to={`/assignment?rid=${this.props.runID}&tid=${this.props.taskID}`} color='teal' content='Resume your work!' icon='arrow right' compact size='tiny' floated='right'/>
                )}
            </List.Item>

        )
    }
}
