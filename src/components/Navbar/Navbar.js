import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {Menu, Input} from 'semantic-ui-react'

class Navbar extends Component {


    logoItemStyle = {
        paddingRight: '0'
    }

    render() {
        let loginButton = <Menu.Item as={Link} to='/login' name='Login' />
        if(this.props.session.authenticated) loginButton = <Menu.Item name='logout' />

        return (
        <Menu secondary>
            <Menu.Item style={this.logoItemStyle}>
                <h3>Social Human Computation</h3>
            </Menu.Item>
            <Menu.Item name='home' as={Link} to='/' />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
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
