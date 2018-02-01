import React, {Component} from 'react'

import {Input, Icon, List, Segment, Header} from 'semantic-ui-react'

export default class Collaborators extends Component {


    inputStyle={
        maxHeight: '30px',
        width: '-webkit-fill-available'
    }

    constructor(props){
        super(props);
        this.state = {
            collaborators: this.props.task.collaborators.list,
            value: ""
        };
        this.addCollaborator = this.addCollaborator.bind(this);
    }

    componentWillMount(){
        if(!this.props.task.collaborators.fetched) this.props.fetchUsers();
    }

    componentWillUnmount(){
        this.props.setCollaborators(this.state.collaborators);
    }

    addCollaborator(){
        //TODO: change to add ID only
        this.setState({collaborators: [...this.state.collaborators, this.state.value], value: ""});
    }

    removeCollaborator(collaborator){
        const collabCopy = this.state.collaborators;
        for (var i = 0; i < collabCopy.length; i++) {
            if (collabCopy[i]===collaborator) {
                collabCopy.splice(i,1);
                break;
            }
        }
        this.setState({
            ...this.state,
            collaborators: collabCopy
        })
    }

    searchUser(name){
        this.setState({...this.state, value: name});
    }



    render(){

        return (
            <div>
                <p>Add collaborators to your project. They can work on it with you.</p>
                {this.props.task.collaborators.error? <Header color='red' content="Error fetching users. Please try again later" /> : null}
                <Input
                    action={{ color: 'teal', icon: 'add', onClick: this.addCollaborator }}
                    loading={!this.props.task.collaborators.fetched}
                    icon='users'
                    iconPosition='left'
                    disabled={!this.props.task.collaborators.fetched}
                    list='users'
                    type="text"
                    placeholder='Collaborator'
                    value={this.state.value}
                    onChange={(e)=> {this.searchUser(e.target.value)}}
                    onKeyPress={(e)=>{if(e.key==='Enter') this.addCollaborator()}}
                />
                <datalist id='users'>
                    {this.props.task.collaborators.users.map((user) => {
                        return <option key={user.id} value={user.name} />
                    })}
                </datalist>
                <List divided relaxed>
                    {this.state.collaborators.map((collaborator)=>{
                        return (
                            <List.Item key={collaborator}>
                                <Icon name='user' size='huge'/>
                                <List.Content>
                                    <List.Header as='h3'>{collaborator}</List.Header>
                                    <List.Description><Icon circular inverted color='red' name='delete' size='small' onClick={()=>this.removeCollaborator(collaborator)} /></List.Description>
                                </List.Content>
                            </List.Item>
                            )
                    })}
                </List>
            </div>
        )
    }
}
