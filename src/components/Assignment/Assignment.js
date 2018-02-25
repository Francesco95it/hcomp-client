import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {Container, Segment, Loader, Header} from 'semantic-ui-react'

import { create_assignment, fetch_run, add_answer, save_assignment } from '../../store/actions/assignmentActions'
import Answer from './Answer'

class Assignment extends Component {

    constructor(props){
        super(props);
        this.state = {
            imgNumber: 0,
            position: 0,
            redirect: false,
            isCompleted: false,
        }
        this.onDone = this.onDone.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillMount(){
        if(this.props.match.params.id) {
            this.props.createAssignment({run: this.props.match.params.id, worker: this.props.user.id});
            this.props.fetchRun(this.props.match.params.id)
            .then(res => this.setState({
                ...this.state,
                imgNumber: res.value.data.images.length
            }));
        }
    }

    onDone(response){
        this.props.addAnswer(response);
        if(this.state.position+1 !== this.state.imgNumber){
            this.setState({
                ...this.state,
                position: this.state.position+1
            })
        } else {
            this.setState({
                ...this.state,
                isCompleted: true
            })
            setTimeout(()=>{
                this.onSave();
            }, 1000);
        }

    }

    onSave(exit = false){
        this.props.saveAssignment(this.props.assignment.assignment.id, this.props.assignment.assignment.answers, this.state.isCompleted);
        if(exit) setTimeout(()=>{
            this.setState({
                ...this.state,
                redirect: true
            })
        }, 3000);
    }

    render(){
        if (this.props.assignment.error) return (
            <Container>
                <Segment>
                    <Header color='red' content='Oooops! An error has occurred. Your work could not be saved!' />
                    <p>We will look into this to solve the problem.</p>
                </Segment>
            </Container>
        )
        if (!this.props.match.params.id || this.state.redirect) return <Redirect to='/' />
        if (!this.props.assignment.assignment.id || !this.props.assignment.runData || this.props.assignment.uploading) return <Loader active style={{minHeight: '200px', marginTop: 0}} />
        if (this.props.assignment.uploaded) return (
            <Container>
                <Segment>
                    <Header color='green' content='Thank you! Your work has been saved.' />
                </Segment>
            </Container>
        )
        const runData = this.props.assignment.runData;
        const percent = isNaN((this.state.position+1)*100/this.state.imgNumber-1) ? 0 : (this.state.position+1)*100/this.state.imgNumber-1;
        return (
            <Container>
                <Segment>
                    <Answer
                        image={runData.images[this.state.position]}
                        type={runData.id_runtype}
                        question={runData.question}
                        percent={percent}
                        isLast={this.state.position === this.state.imgNumber-1}
                        next={this.onDone}
                        save={this.onSave}
                    />
                </Segment>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.session.user,
        assignment: state.assignment
    };
}

function mapDispatchToProps(dispatch){
    return {
        createAssignment: (id) => dispatch(create_assignment(id)),
        fetchRun: (id_run) => dispatch(fetch_run(id_run)),
        addAnswer: (answer) => dispatch(add_answer(answer)),
        saveAssignment: (id, answers, isCompleted) => dispatch(save_assignment(id, answers, isCompleted)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);
