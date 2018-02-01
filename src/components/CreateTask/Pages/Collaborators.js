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
            value: "",
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
        console.log(this.state.value);
        this.props.task.collaborators.users.find(elem => {if(elem.name===this.state.value) this.setState({collaborators: [...this.state.collaborators, elem], value: ""})});
    }

    removeCollaborator(collaboratorID){
        const collabCopy = this.state.collaborators;
        for (var i = 0; i < collabCopy.length; i++) {
            if (collabCopy[i].id===collaboratorID) {
                collabCopy.splice(i,1);
                break;
            }
        }
        this.setState({
            ...this.state,
            collaborators: collabCopy
        })
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
                    onChange={(e)=>this.setState({...this.state, value: e.target.value})}
                    onKeyPress={(e)=>{if(e.key==='Enter') this.addCollaborator()}}
                />
                <datalist id='users'>
                    {this.props.task.collaborators.users.map((user) => {
                        return <option key={user.id} value={user.name}/>
                    })}
                </datalist>
                <List divided relaxed>
                    {this.state.collaborators.map((collaborator)=>{
                        return (
                            <List.Item key={collaborator.id}>
                                <Icon name='user' size='huge'/>
                                <List.Content>
                                    <List.Header as='h3'>{collaborator.name}</List.Header>
                                    <List.Description><Icon circular inverted color='red' name='delete' size='small' onClick={()=>this.removeCollaborator(collaborator.id)} /></List.Description>
                                </List.Content>
                            </List.Item>
                            )
                    })}
                </List>
            </div>
        )
    }
}
