import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import axios from 'axios'

import {Segment, Container, List, Header, Button} from 'semantic-ui-react'
import { set_all } from '../../store/actions/modifyTaskActions'

import TaskLi from './TaskLi'

class ManageTasks extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            fetched: false,
            error: false
        }
        this.deleteTask = this.deleteTask.bind(this)
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

    deleteTask(e, id){
        e.stopPropagation();
        axios.delete(`/tasks/${id}`)
        .then(()=>{
            this.setState({
                ...this.state,
                tasks: this.state.tasks.filter(task => task.id!==id)
            })
        })
        .catch((err)=>console.log(err));
    }

    render(){
        if(this.state.error) return <Segment style={{minHeight: '200px'}}>An error occurred. Please try again later.</Segment>
        if(!this.state.fetched) return <Segment loading style={{minHeight: '200px'}} />
        if(this.state.tasks.length === 0) return (
            <Container>
                <Segment textAlign='center' style={{marginTop: '0'}}>
                    <Header color='red' size='huge' content='No task found!' />
                    <Button content='Create one now!' color='instagram' size='big' as={Link} to='/createTask'/>
                </Segment>
            </Container>
        )
        return (
            <Container>
                <Segment style={{marginTop: '0'}}>
                    <Header>Your tasks:</Header>
                    <List relaxed='very' selection verticalAlign='middle'>
                        {this.state.tasks.map((task) => {
                            return <TaskLi key={task.id} task={task} setAll={this.props.setAll} deleteTask={this.deleteTask}/>
                        })}
                    </List>
                </Segment>
            </Container>
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
        setAll: (task)=> dispatch(set_all(task)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTasks);
