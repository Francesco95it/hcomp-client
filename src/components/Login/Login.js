import React, {Component} from 'react'
import {connect} from 'react-redux'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login';

import { login } from '../../store/actions/sessionActions'

//TODO: style buttons

class Login extends Component {

    responseFacebook(response){
        this.props.dispatch(login({
            data: {...response},
            type: 'google',
            error: response.error
        }))
        console.log(response);
        console.log({
            data: {...response},
            type: 'facebook',
            error: response.error
        });
    }
    
    responseGoogle(response){
        this.props.dispatch(login({
            data: {...response},
            type: 'google',
            error: response.error
        }))
        console.log(response);
    }

    render(){
        return (
            <div>
                <FacebookLogin
                    appId="157962001476723"
                    authLoad={true}
                    fields="name, email, picture"
                    callback={this.responseFacebook}
                />

                <GoogleLogin
                    clientId="20616223735-1259ms2ae4cvg0jjnja9q7s4bcv1b7h5.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        session: state.session,
        user: state.user,
        modal: state.layout,
        pictures: state.pictures
    };
}

export default connect(mapStateToProps)(Login);
