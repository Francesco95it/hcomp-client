import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import { create_assignment } from '../../store/actions/assignmentActions'

class Assignment extends Component {

    componentWillMount(){
        console.log(this.props.match.params.id);
        if(this.props.match.params.id) this.props.createAssignment({run: this.props.match.params.id, worker: this.props.user.id});
    }

    render(){
        if (!this.props.match.params.id) <Redirect to='/' />
        return (
            <div>
                {this.props.assignment.assignment.id ? <h1>Loaded</h1> : <h1>Not loaded</h1>}
            </div>
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
        createAssignment: (id_run) => dispatch(create_assignment(id_run)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);
