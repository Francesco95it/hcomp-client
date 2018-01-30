import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Segment, Grid} from 'semantic-ui-react'

import { set_general } from '../../store/actions/createTaskActions'
import { set_general_title } from '../../store/actions/createTaskActions'
import { set_runs } from '../../store/actions/createTaskActions'

import VerticalMenu from './VerticalMenu'
import General from './Pages/General'
import Runs from './Pages/Runs'
import Collaborators from './Pages/Collaborators'
import Tutorial from './Pages/Tutorial'
import Status from './Pages/Status'


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

    handleItemClick = (e, { name }) => this.setState({ ...this.state, activeItem: name })

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
            default:
                return null
        }
    }

    unLoad(e){
        // eslint-disable-next-line
        var confirmationMessage = "\o/";

        (e || window.event).returnValue = confirmationMessage;
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
        //CHANGE THIS
        this.removeBlock();
        console.log(this.props.task);
        return (
            <div>
                <h2 style={this.h1Style}>Project [id]: {this.props.task.general.title}</h2>
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
        task: state.createTask.task
    };
}

function mapDispatchToProps(dispatch){
    return {
        setGeneral: (general) => dispatch(set_general(general)),
        setGeneralTitle: (title) => dispatch(set_general_title(title)),
        setRuns: (runs) => dispatch(set_runs(runs)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
