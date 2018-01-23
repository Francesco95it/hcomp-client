import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { sessionService } from 'redux-react-session'

class AuthRoute extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sessionLoaded: false
        }
    }

    componentWillMount(){
        sessionService.loadUser()
        .then(() => {
            this.setState({
                sessionLoaded: true
            });
        });
    }

    render(){
        if(this.state.sessionLoaded){
            if (this.props.session.authenticated) return this.props.children;
            return <Redirect to={this.props.back} />
        }
        return null;
    }
}

function mapStateToProps(state) {
    return {
        session: state.session
    };
}

export default connect(mapStateToProps)(AuthRoute);
