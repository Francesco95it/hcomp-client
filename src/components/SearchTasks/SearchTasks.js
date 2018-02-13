import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Segment, List, Header, Grid} from 'semantic-ui-react'
import axios from 'axios'

import TaskItem from './TaskItem'

class SearchTasks extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            fetched: false,
        }
    }

    componentWillMount(){
        axios.get(`/tasks`)
        .then(res => {
            console.log(res);
            this.setState({
                ...this.state,
                tasks: res.data,
                fetched: true
            })
        })
        .catch(err => console.log(err));
    }

    render(){
        if(!this.state.fetched) return <Segment loading style={{minHeight: '200px'}} />
        return (
            <Segment style={{marginTop: '0'}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Header size='huge'>Available tasks</Header>
                            <List size='huge' relaxed='very' selection verticalAlign='middle'>
                                {this.state.tasks.map(task => {
                                return <TaskItem key={task.id} task={task} />
                                })}
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Segment>
                                <Header size='small'>Filters</Header>
                                <p>Qualcosa....</p>
                                <p>Qualcos altro....</p>
                                <p>Qualcos altro ancora....</p>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(SearchTasks);
