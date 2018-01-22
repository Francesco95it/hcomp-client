import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Segment, Image, Button} from 'semantic-ui-react'

class Login extends Component {
    componentWillMount(){
        //TODO: fetch user data
        console.log(this.props.match.params.id);
    }

    render(){
        let user = this.props.session.user;
        return (
            <Segment textAlign='left'>
                <Image src={user.picture.data.url} floated='right' width='100px' style={{marginTop: '15px'}}/>
                <h1>{user.name}</h1>
                <h4>Email: {user.email} <Button compact size='mini' style={{marginLeft: '10px'}}>Change</Button></h4>
                <h4>Member since: 11/11/2017</h4>
                <h4>Completed tasks: 13</h4>
            </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {
        session: state.session,
        user: state.user,
    };
}

export default connect(mapStateToProps)(Login);
