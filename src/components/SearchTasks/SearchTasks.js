import React, {Component} from 'react'
import {connect} from 'react-redux'

import axios from 'axios'

class SearchTasks extends Component {

    constructor(props){
        super(props);
        this.state = {
            fetched: false,
        }
    }

    componentWillMount(){
        axios.get(`/tasks`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render(){
        return <h1>Search</h1>;
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(SearchTasks);
