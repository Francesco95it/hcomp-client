import React, {Component} from 'react'

import {Input, Icon, List, Header, Image, Segment} from 'semantic-ui-react'

export default class Collaborators extends Component {

    listStyle = {
        display: 'flex',
        alignItems: 'center'
    }

    inputStyle = {
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
        // eslint-disable-next-line
        this.props.task.collaborators.users.find(elem => {
            if(elem.name===this.state.value) {
                if (!this.state.collaborators.map(e=>e.id).includes(elem.id)) this.setState({collaborators: [...this.state.collaborators, elem], value: ""});
            }
        });
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

    updateUsers(){
        let collabCopy = [];
        for (let collaborator of this.state.collaborators) {
            console.log(this.props.task.collaborators.users.find( user => (collaborator===user.id || collaborator.id===user.id)));
            collabCopy.push(this.props.task.collaborators.users.find( user => (collaborator===user.id || collaborator.id===user.id)));
        }
        console.log("collabCopy: ", collabCopy);
        this.setState({
            ...this.state,
            collaborators: collabCopy
        })
    }


    render(){
        if(!this.props.task.collaborators.fetched) return <Segment loading style={{minHeight: '200px'}} />

        return (
            <div>
                <p>Add collaborators to your project. They can work on it with you.</p>
                {this.props.task.collaborators.error? <Header color='red' content="Error fetching users. Please try again later" /> : null}
                <Input
                    action={{ color: 'teal', icon: 'add', onClick: this.addCollaborator }}
                    loading={!this.props.task.collaborators.fetched}
                    size='small'
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
                        console.log(collaborator);
                        if(!collaborator.name) this.updateUsers();
                        return (
                            <List.Item key={collaborator.id} style={this.listStyle}>
                                <Image avatar src={collaborator.img} />
                                <List.Content>
                                    <List.Header>{collaborator.name}</List.Header>
                                    <List.Description><Icon circular inverted color='red' name='delete' size='tiny' onClick={()=>this.removeCollaborator(collaborator.id)} /></List.Description>
                                </List.Content>
                            </List.Item>
                            )
                    })}
                </List>
            </div>
        )
    }
}
