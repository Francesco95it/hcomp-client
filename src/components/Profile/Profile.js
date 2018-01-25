import React, {Component} from 'react'
import {connect} from 'react-redux'
import { sessionService } from 'redux-react-session'

import { fetch_user } from '../../store/actions/userActions'

import {Segment, Image, Button} from 'semantic-ui-react'
import moment from 'moment'

class Profile extends Component {

    loadingSegm = {
        minHeight: '200px'
    }

    segmentAdj = {
        paddingTop: '5px',
        paddingBottom: '15px',
        paddingRight: '60px',
        paddingLeft: '60px',
        marginTop: '0'
    }

    constructor(props){
        super(props);
        this.state = {
            personalProfile: true
        }
    }

    componentWillMount(){
        // console.log(this.props.match.params.id);
        sessionService.loadUser().then(()=>{
            if(this.props.match.params.id) {
                this.setState({
                    ...this.state,
                    personalProfile: false
                });
                this.props.dispatch(fetch_user(this.props.match.params.id));
            }
        })
    }

    render(){
        if(this.state.personalProfile){
            let user = this.props.session.user;
            return (
                <Segment textAlign='left' style={this.segmentAdj}>
                <Image src={user.imageURL} floated='right' width='100px' style={{marginTop: '15px'}}/>
                <h1 style={{marginTop: '10px'}}>{user.name}</h1>
                <h4>Email: {user.email} <Button compact size='mini' style={{marginLeft: '10px'}}>Change</Button></h4>
                <h2>Statistics:</h2>
                <p>One day we will return some stats</p>
                </Segment>
            );
        }

        if(this.props.user.error)
        return (
            <Segment textAlign='center'>
                <h1 style={{color: 'red'}}>An error has appened. Please try again or contact us</h1>
            </Segment>
        );
        if(!this.props.user.fetched) return <Segment loading style={this.loadingSegm} />


        //USER PAGE (NOT SELF PROFILE)

        let user = this.props.user.user;
        return (
            <Segment textAlign='left' style={this.segmentAdj}>
            <Image src={user.img} floated='right' width='100px' style={{marginTop: '15px'}}/>
            <h1>{user.name}</h1>
            <h4>Email: {user.email}</h4>
            <h4>Member since: {moment(user.createdAt).format("D/MM/YYYY")}</h4>
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

export default connect(mapStateToProps)(Profile);
