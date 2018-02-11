import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { logout } from '../../store/actions/sessionActions'

import {Menu, Dropdown, Icon} from 'semantic-ui-react'

import './style.css'

class Navbar extends Component {

    navbarStyle= {
        marginBottom: '0'
    }

    logoItemStyle = {
        paddingRight: '0',
        color: 'white'
    }

    constructor(props){
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick(){
        this.props.dispatch(logout());
    }

    render() {
        let loginButton = <Menu.Item as={Link} to='/login' id='whitePls' name='Login' />
        if(this.props.session.authenticated) {
            let createTask = "";
            let manageTasks = "";
            if (this.props.session.user.isWriter) {
                createTask = <Dropdown.Item as={Link} to='/createTask'><Icon name="add circle" /> Create Task</Dropdown.Item>
                manageTasks = <Dropdown.Item as={Link} to='/manageTasks'><Icon name="tasks" /> Manage Tasks</Dropdown.Item>
            }
            loginButton =
                <Dropdown id='whitePls' item text={this.props.session.user.name}>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/${this.props.session.user.id}`} ><Icon name="user circle"/> Profile</Dropdown.Item>
                        {createTask}
                        {manageTasks}
                        <Dropdown.Item onClick={this.onLogoutClick}><Icon name="external" /> Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        }

        return (
        <Menu secondary color='teal' inverted style={this.navbarStyle}>
            <style>{`#whitePls{color: white !important}`}</style>
            <Menu.Item style={this.logoItemStyle}>
                <h3>Social Human Computation</h3>
            </Menu.Item>
            <Menu.Item name='home' id='whitePls' as={Link} to='/' />
            <Menu.Menu position='right'>
                {loginButton}
            </Menu.Menu>
        </Menu>)
    }
}

function mapStateToProps(state) {
    return {
        session: state.session,
        user: state.user,
    };
}

export default connect(mapStateToProps)(Navbar);
