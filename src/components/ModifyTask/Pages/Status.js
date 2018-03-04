import React, {Component} from 'react'

import {Radio, Divider, Button, Icon, Input, Label} from 'semantic-ui-react'

export default class Status extends Component {

    constructor(props){
        super(props);
        this.state = {
            is_public: this.props.task.status.is_public,
            is_live: this.props.task.status.is_live
        }
    }

    componentWillUnmount(){
        this.props.setStatus({
            is_public: this.state.is_public,
            is_live: this.state.is_live
        });
    }

    render(){
        console.log(this.link);
        return (
            <div>
                <p>When your project is ready, set it to live. If you have to modify it for some time, or just want to wait, set it to development so that people cannot do it.</p>
                <Radio
                label='In development'
                name='liveStatus'
                checked={!this.state.is_live}
                onChange={()=>this.setState({...this.state, is_live: false})}
                /><br />
                <Radio
                label='Live'
                name='liveStatus'
                checked={this.state.is_live}
                onChange={()=>this.setState({...this.state, is_live: true})}
                />
                <Divider />
                <p>If you set your project to private, only people who knows the link we give you will be able to do it, since it will be hidden in other contexts. Otherwise, set it to public.</p>
                <Radio
                label='Private'
                name='publicStatus'
                checked={!this.state.is_public}
                onChange={()=>this.setState({...this.state, is_public: false})}
                /><br />
                <Radio
                label='Public'
                name='publicStatus'
                checked={this.state.is_public}
                onChange={()=>this.setState({...this.state, is_public: true})}
                />
                <br />
                {(!this.state.is_public && this.state.is_live)?
                    <div style={{marginTop: '20px'}}>
                        <p>
                            The <b>link</b> for your task is:{' '}
                        </p>
                        <Input
                        id='link'
                        action={
                            <Button color='teal' animated='fade' onClick={(e)=>{document.getElementById('link').select(); e.target.focus(); this.setState({...this.state, copied:true})}}>
                                <Button.Content visible>
                                    <Icon name='copy' />
                                </Button.Content>
                                <Button.Content hidden>
                                    Copy!
                                </Button.Content>
                            </Button>
                        }
                        ref={link => this.link = link}
                        value={`https://${window.location.hostname}/task/${this.props.task.id}`} />{'   '}
                        {this.state.copied?<Label color='green'><Icon name='checkmark' /> Copied!</Label>:null}
                    </div>
                :null}
            </div>
        )
    }
}
//this.link.select(); document.execCommand('copy');
