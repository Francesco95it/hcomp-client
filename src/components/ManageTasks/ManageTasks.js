import React, {Component} from 'react'
import {connect} from 'react-redux'

import axios from 'axios'

import {Segment} from 'semantic-ui-react'

class ManageTasks extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            fetched: false,
            error: false
        }
    }

    componentDidMount(){
        axios.get(`/tasks?filter=id_creator&parameter=${this.props.session.user.id}`)
        .then( (res) => {
            this.setState({
                ...this.state,
                tasks: res.data,
                fetched: true,
                error: false
            });}
        )
        .catch( (err) => {
            console.log("Error fetching: ",err);
            this.setState({
                ...this.state,
                error: true
            })
            }
        );
    }

    render(){
        if(this.state.error) return <Segment style={{minHeight: '200px'}}>An error occurred. Please try again later.</Segment>
        if(!this.state.fetched) return <Segment loading style={{minHeight: '200px'}} />

        return (
            <Segment>
                {this.state.tasks.map((task) => {
                    console.log(task);
                    return <Segment key={task.id}>{task.name ? task.name : task.description}</Segment>
                })}
            </Segment>
        )

    }
}

function mapStateToProps(state) {
    return {
        session: state.session,
        user: state.user
    };
}

function mapDispatchToProps(dispatch){
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTasks);
