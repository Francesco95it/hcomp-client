import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';

import {Segment, Divider, Icon, Checkbox} from 'semantic-ui-react'

import ModalLogin from './ModalLogin'
import { login } from '../../store/actions/sessionActions'

import './style.css'
//TODO: style buttons

class Login extends Component {

    segmentStyle = {
        marginTop: '0'
    }

    constructor(props){
        super(props);
        this.state = {
            isWriter: false,
            loginError: false,
            loginSuccess: false,
            redirect: ""
        };
        this.setWriter = this.setWriter.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        switch (params.get('redirect')) {
            case 'task':
                this.setState({
                    ...this.state,
                    redirect: `/task/${params.get('id')}`
                })
                break;
            default:
                break;
        }
    }

    setWriter(){
        this.setState({
            ...this.state,
            isWriter: !this.state.isWriter
        })
    }

    responseFacebook(response){
        if(!response.userID) {
            console.log("Error, response: ",response);
            this.setState({
                ...this.state,
                loginError: true
            });
        } else {
            this.setState({
                ...this.state,
                loginError: false,
                loginSuccess: true
            });
            this.props.dispatch(login({
                data: {...response},
                type: 'facebook',
                isWriter: this.state.isWriter
            }))
        }
    }

    responseGoogle(response){
        if(response.error) {
            console.log("Error, response", response);
            this.setState({
                ...this.state,
                loginError: true
            })
        } else {
            this.setState({
                ...this.state,
                loginError: false,
                loginSuccess: true
            });
            this.props.dispatch(login({
                data: {...response},
                type: 'google',
                isWriter: this.state.isWriter
            }));
        }
    }

    render(){
        let loginErr;
        if(this.state.loginError) loginErr=<h4 className="error">Something went wrong. Please login again.</h4>
        if(this.props.session.authenticated) {
            if(this.state.redirect !== "") return <Redirect to={this.state.redirect} />
            return <Redirect to='/' />
        }
        return (
            <Segment textAlign='center' style={this.segmentStyle}>
                <ModalLogin loginSuccess={this.state.loginSuccess} error={this.props.session.user.error}/>
                <h1 className="h1Style">Login with your social account</h1>
                {loginErr}
                <FacebookLogin
                    appId="157962001476723"
                    authLoad={true}
                    fields="name, email, picture"
                    callback={this.responseFacebook}
                    cssClass="social-buttons color-facebook"
                    buttonText=" "
                    icon={<Icon name='facebook f'/>}/>
                <br />
                <Divider horizontal style={{maxWidth: '400px', display: 'inline-table'}}>Or</Divider>
                <br />
                <GoogleLogin
                    clientId="20616223735-1259ms2ae4cvg0jjnja9q7s4bcv1b7h5.apps.googleusercontent.com"
                    className="social-buttons color-google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                ><Icon name='google'/> Login with Google</GoogleLogin>
                <br />
                <br />
                <Checkbox checked={this.state.isWriter} onClick={this.setWriter} label="Sign-in as creator"/>
            </Segment>
        )
    }
}


function mapStateToProps(state) {
    return {
        session: state.session
    };
}

export default connect(mapStateToProps)(Login);
