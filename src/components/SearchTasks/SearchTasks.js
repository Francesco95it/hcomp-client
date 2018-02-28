import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Segment, Header, Input, Container, Card, Icon, Dropdown} from 'semantic-ui-react'
import axios from 'axios'

import TaskSearchItem from './TaskSearchItem'
import backgroundImage from './searchBackground.jpeg'


class SearchTasks extends Component {
    segmentStyle = {
        backgroundImage: 'url('+backgroundImage+')',
        backgroundSize: 'cover',
        padding: '0',
    }

    divStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingTop: '6em',
        paddingBottom: '6em',
        paddingLeft: '6em',
        paddingRight: '6em',
        color: 'white'
    }

    optionsOrder = [
        {
            key: 'newest',
            text: 'newest',
            value: 'newest',
            content: 'Newest'
        },
        {
            key: 'last updated',
            text: 'last updated',
            value: 'last updated',
            content: 'Last updated'
        },
        {
            key: 'trending',
            text: 'trending',
            value: 'trending',
            content: 'Trending'
        },
    ]

    optionsFilter = [
        {
            key: 'all',
            text: 'all',
            value: 'all',
            content: 'All'
        }
    ]

    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            fetched: false,
            filteredList: [],
        }
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount(){
        axios.get(`/tasks`)
        .then(res => {
            const filteredRes = res.data.filter(task => {return (task.name!==null && task.is_active)});
            this.setState({
                ...this.state,
                tasks: filteredRes,
                filteredList: filteredRes,
                fetched: true
            })
        })
        .catch(err => console.log(err));
    }

    filterList(e){
        this.setState({
            ...this.state,
            filteredList: this.state.tasks.filter(task => {return task.name.toLowerCase().search(e.target.value.toLowerCase())!==-1})
        })
    }

    render(){
        if(!this.state.fetched) return <Segment loading style={{minHeight: '200px', marginTop:'0px'}} />
        return (
            <div>
                <Segment vertical padded='very' textAlign='left' style={this.segmentStyle}>
                    <div style={this.divStyle}>
                        <Header size='huge' inverted>Projects</Header>
                        <Input
                        inverted fluid transparent
                        size='massive' placeholder='Search...' icon='search' style={{borderBottom: '1px grey solid'}}
                        onChange={(e) => this.filterList(e)}
                        />
                        <div>
                            <Header size='small' floated='right' inverted>
                                <Icon name='filter' size='small' />
                                <Header.Content>
                                    Filter by category: {' '}
                                    <Dropdown inline header='Choose one' options={this.optionsFilter} defaultValue={this.optionsFilter[0].value} />
                                </Header.Content>
                            </Header>
                            <Header size='small' inverted>
                                <Icon name='list' floated='left' size='small'/>
                                <Header.Content>
                                    Order by{' '}
                                    <Dropdown inline header='Choose one' options={this.optionsOrder} defaultValue={this.optionsOrder[0].value} />
                                </Header.Content>
                            </Header>
                        </div>
                    </div>
                </Segment>
                <Container>
                    <Segment style={{marginTop: '0'}}>
                        <Card.Group itemsPerRow='4'>
                            {this.state.filteredList.map(task => {
                                return <TaskSearchItem key={task.id} task={task} />
                            })}
                        </Card.Group>
                    </Segment>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(SearchTasks);
