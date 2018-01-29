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
            task: {
                title: 'No name task'
            }
        }
        this.handleItemClick = this.handleItemClick.bind(this);
        this.pageSelected = this.pageSelected.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ ...this.state, activeItem: name })

    pageSelected(){
        switch (this.state.activeItem) {
            case 'General':
                return <General {...this.props} values={this.props.createTask.task.general} titleChanged={this.titleChanged}/>
            case 'Runs':
                return <Runs {...this.props} />
            case 'Tutorial':
                return <Tutorial {...this.props} />
            case 'Status':
                return <Status {...this.props} />
            case 'Collaborators':
                return <Collaborators {...this.props} />
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

    render() {
        //MENU A DESTRA, COLORATO
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
