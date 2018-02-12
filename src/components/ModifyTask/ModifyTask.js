import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {Segment, Grid} from 'semantic-ui-react'
import axios from 'axios'

import { set_general, set_general_title, set_runs, set_collaborators, fetch_users, set_tutorial, set_status, delete_task, upload_task} from '../../store/actions/modifyTaskActions'

import VerticalMenu from './VerticalMenu'
import General from './Pages/General'
import Runs from './Pages/Runs'
import Collaborators from './Pages/Collaborators'
import Tutorial from './Pages/Tutorial'
import Status from './Pages/Status'
import Savepage from './Pages/Savepage'
import DeleteTask from './Pages/DeleteTask'


class CreateTask extends Component {

    loadingSegm = {
        minHeight: '200px'
    }

    h1Style = {
        marginTop: '20px',
        marginLeft: '20px'
    }

    constructor(props){
        super(props);
        this.state = {
            activeItem: 'General',
            isSaved: true
        }
        this.handleItemClick = this.handleItemClick.bind(this);
        this.pageSelected = this.pageSelected.bind(this);
        this.removeBlock = this.removeBlock.bind(this);
        this.addBlock = this.addBlock.bind(this);
        this.unLoad = this.unLoad.bind(this);
    }

    componentWillMount(){
        if(this.props.task.id){
            axios.get(`/tasks/runs?filter=id_task&parameter=${this.props.task.id}`)
            .then((res)=>{
                this.props.setRuns(res.data.map(run => {
                    return {
                        id: run.id,
                        title: (run.name || "Untitled run"),
                        description: run.description,
                        introduction: run.introduction,
                        images: run.images,
                        type: {
                            question: run.question,
                            type: run.id_runtype
                        },
                        index: run.index,
                    }
                }));
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ ...this.state, activeItem: name });
    }

    pageSelected(){
        switch (this.state.activeItem) {
            case 'General':
                return <General {...this.props} />
            case 'Runs':
                return <Runs {...this.props}/>
            case 'Tutorial':
                return <Tutorial {...this.props}/>
            case 'Status':
                return <Status {...this.props}/>
            case 'Collaborators':
                return <Collaborators {...this.props}/>
            case 'Save':
                return <Savepage {...this.props} removeBlock={this.removeBlock}/>
            case 'Delete':
                return <DeleteTask {...this.props} />
            default:
                return null
        }
    }

    unLoad(e){
        // eslint-disable-next-line
        var confirmationMessage = "\o/";

        (e || window.event).returnValue = confirmationMessage;
        console.log(confirmationMessage);
        return confirmationMessage;
    }


    addBlock(){
        window.addEventListener('beforeunload', this.unLoad);
    }

    removeBlock(){
        window.removeEventListener('beforeunload', this.unLoad);
    }

    componentDidMount(){
        this.addBlock();
    }

    componentWillUnmount(){
        this.removeBlock();
    }

    render() {
        if(!this.props.task.id) return <Redirect to='/ManageTasks' />
        if(!this.props.task.created) return <Segment loading style={{minHeight: '200px'}} />
        if(this.props.task.error) return <Segment style={{minHeight: '200px'}} content='Something went wrong. Please try again later.'/>
        return (
            <div>
                <h2 style={this.h1Style}>Project #{this.props.task.id}: {this.props.task.general.title}</h2>
                <Grid style={{marginTop:'0px'}}>

                    <Grid.Column stretched width={12}>
                        <Segment basic style={{padding: 0, paddingLeft: '20px'}}>
                            {this.pageSelected()}
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={4}>
                    <VerticalMenu handleItemClick={this.handleItemClick} activeItem={this.state.activeItem} />
                    </Grid.Column>

                </Grid>
            </div>);
        }
}

function mapStateToProps(state) {
    return {
        session: state.session,
        user: state.user,
        task: state.modifyTask.task,
        allTask: state.modifyTask,
    };
}

function mapDispatchToProps(dispatch){
    return {
        setGeneral: (general) => dispatch(set_general(general)),
        setGeneralTitle: (title) => dispatch(set_general_title(title)),
        setRuns: (runs) => dispatch(set_runs(runs)),
        setCollaborators: (collaborators) => dispatch(set_collaborators(collaborators)),
        setStatus: (status) => dispatch(set_status(status)),
        setTutorial: (tutorial) => dispatch(set_tutorial(tutorial)),
        fetchUsers: ()=> dispatch(fetch_users()),
        deleteTask: (id)=> dispatch(delete_task(id)),
        uploadTask: (task)=> dispatch(upload_task(task)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
