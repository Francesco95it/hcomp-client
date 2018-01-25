import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { logout } from '../../store/actions/sessionActions'

import {Menu, Dropdown, Icon} from 'semantic-ui-react'

class Navbar extends Component {

    navbarStyle= {
        marginBottom: '0'
    }

    logoItemStyle = {
        paddingRight: '0'
    }

    constructor(props){
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick(){
        this.props.dispatch(logout());
    }

    render() {
        let loginButton = <Menu.Item as={Link} to='/login' name='Login' />
        if(this.props.session.authenticated) {
            let createTask = "";
            let manageTasks = "";
            if (this.props.session.user.isWriter) {
                createTask = <Dropdown.Item as={Link} to='/createTask'><Icon name="add circle" /> Create Task</Dropdown.Item>
                manageTasks = <Dropdown.Item><Icon name="tasks" /> Manage Tasks</Dropdown.Item>
            }
            loginButton =
                <Dropdown item text={this.props.session.user.name}>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/${this.props.session.user.id}`} ><Icon name="user circle"/> Profile</Dropdown.Item>
                        {createTask}
                        {manageTasks}
                        <Dropdown.Item onClick={this.onLogoutClick}><Icon name="external" /> Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
        }

        return (
        <Menu secondary style={this.navbarStyle}>
            <Menu.Item style={this.logoItemStyle}>
                <h3>Social Human Computation</h3>
            </Menu.Item>
            <Menu.Item name='home' as={Link} to='/' />
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
