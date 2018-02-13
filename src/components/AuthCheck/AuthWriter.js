import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {sessionService} from 'redux-react-session'

import {Segment} from 'semantic-ui-react'

class AuthWriter extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ready: false
        }
    }

    componentWillReceiveProps(){
        console.log("NEW PROPS!!");
        console.log(this.props);
        this.forceUpdate();
    }

    componentDidMount(){
        sessionService.loadSession()
        .then(()=>{
            sessionService.loadUser()
            .then(()=>{
                this.setState({ready: true});
            })
        })
    }

    render(){
        const session = this.props.session;
        if(this.state.ready){
            if(session.checked){
                if(session.authenticated){
                    if(session.user.id){
                        if (this.props.location.pathname.match(/[/]profile.*/)) return this.props.children;
                        if (this.props.location.pathname.match(/[/]search.*/)) return this.props.children;
                        if (session.user.isWriter) {
                            console.log(session);
                            return this.props.children;
                        } else {
                            return <Redirect to={this.props.back} />
                        }
                    }
                    return <Segment loading style={{minHeight: '200px'}} />
                }
                return <Redirect to={this.props.back} />
            }
        }
        return <Segment loading style={{minHeight: '200px'}} />
    }
}

function mapStateToProps(state) {
    return {
        session: state.session
    };
}

export default connect(mapStateToProps)(AuthWriter);
