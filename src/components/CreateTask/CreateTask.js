import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Segment, Grid} from 'semantic-ui-react'

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
            isSaved: true,
            task: {
                title: 'No name task'
            }
        }
        this.handleItemClick = this.handleItemClick.bind(this);
        this.pageSelected = this.pageSelected.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.unLoad = this.unLoad.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ ...this.state, activeItem: name })

    pageSelected(){
        switch (this.state.activeItem) {
            case 'General':
                return <General {...this.props} values={this.props.createTask.task.general} titleChanged={this.titleChanged}/>
            case 'Runs':
                return <Runs {...this.props} values={this.props.createTask.task.runs}/>
            case 'Tutorial':
                return <Tutorial {...this.props} values={this.props.createTask.task.tutorial}/>
            case 'Status':
                return <Status {...this.props} values={this.props.createTask.task.status}/>
            case 'Collaborators':
                return <Collaborators {...this.props} values={this.props.createTask.task.collaborators}/>
            default:
                return null
        }
    }

    titleChanged(e){
        this.setState({
            ...this.state,
            task: {
                title: e.target.value
            }
        })
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
        return (
            <div>
                <h2 style={this.h1Style}>Project [id]: {this.state.task.title}</h2>
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
        createTask: state.createTask
    };
}

export default connect(mapStateToProps)(CreateTask);
