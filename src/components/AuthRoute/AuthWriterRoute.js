import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { sessionService } from 'redux-react-session'

import {Segment} from 'semantic-ui-react'

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
        })
        .catch((err)=>{
            console.log("Error loading user: ",err);
            this.setState({
                sessionLoaded: true
            });
        })
    }

    render(){
        if(this.state.sessionLoaded){
            if (this.props.session.user.isWriter) return this.props.children;
            return <Redirect to={this.props.back} />
        }
        return <Segment loading style={{minHeight: '200px'}} />
    }
}

function mapStateToProps(state) {
    return {
        session: state.session
    };
}

export default connect(mapStateToProps)(AuthRoute);
