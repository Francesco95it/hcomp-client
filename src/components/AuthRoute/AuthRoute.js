import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class AuthRoute extends React.Component {

    render(){
        if (this.props.session.authenticated) return this.props.children;
        return <Redirect to={this.props.back} />
    }
}

function mapStateToProps(state) {
    return {
        session: state.session
    };
}

export default connect(mapStateToProps)(AuthRoute);
