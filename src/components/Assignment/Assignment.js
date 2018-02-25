import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {Container, Segment, Loader, Header, Button, Image} from 'semantic-ui-react'

import { create_assignment, fetch_run, add_answer, save_assignment, on_continue } from '../../store/actions/assignmentActions'
import happyImage from './happy.svg'
import Answer from './Answer'

class Assignment extends Component {

    constructor(props){
        super(props);
        this.state = {
            imgNumber: 0,
            position: 0,
            redirect: false,
            isCompleted: false,
            willExit: false,
            error:false,
        }
        this.onDone = this.onDone.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        if(params.get('rid') && params.get('tid')){
            this.props.createAssignment({run: params.get('rid'), worker: this.props.user.id, task: params.get('tid')});
            this.props.fetchRun(params.get('rid'))
            .then(res => {
                this.setState({
                    ...this.state,
                    imgNumber: res.value.data.images.length
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: true
                });
            });
        } else {
            this.setState({
                ...this.state,
                error: true
            })
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
        if(exit) {
            this.setState({
                ...this.state,
                willExit: true
            })
            setTimeout(()=>{
                this.setState({
                    ...this.state,
                    redirect: true
                })
            }, 3000);
        }
    }

    render(){
        if (this.props.assignment.error || this.state.error) return (
            <Container>
                <Segment>
                    <Header color='red' content='Oooops! An error has occurred. Your work could not be saved!' />
                    <p>We will look into this to solve the problem.</p>
                </Segment>
            </Container>
        )
        if (this.state.redirect) return <Redirect to='/' />
        if (!this.props.assignment.assignment.id || !this.props.assignment.runData || this.props.assignment.uploading) return <Loader active style={{minHeight: '200px', marginTop: 0}} />
        if (this.props.assignment.uploaded) return (
            <Container>
                <Segment>
                    <Image src={happyImage} size='small' floated='right' />
                    <Header color='green' content='Thank you! Your work has been saved.' />
                    {(this.state.willExit || this.state.isCompleted) ?null:
                        <div>
                            <br />
                            <Header content='Now you can' size='small' />
                            <Button content='Go back to homepage' color='instagram' as={Link} to='/' />
                            <Button content='Continue with this task' color='green' onClick={() => this.props.onContinue()} />
                        </div>
                    }
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
        onContinue: () => dispatch(on_continue())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);
