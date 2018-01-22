import React, {Component} from 'react'
import {connect} from 'react-redux'

import Header from './MainHeader'

class Homepage extends Component {

    render(){
        return <Header {...this.props}/>
    }
}


function mapStateToProps(state) {
    return {
        session: state.session,
        user: state.user,
    };
}

export default connect(mapStateToProps)(Homepage);
