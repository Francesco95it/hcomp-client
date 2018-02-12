import React, {Component} from 'react'

import {Form, Input, TextArea, Grid, Header, Image, Icon, Dimmer, Loader, Segment} from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

import axios from 'axios'
const sha256 = require('js-sha256')

export default class General extends Component {

    inputStyle={
        maxHeight: '30px',
        width: '-webkit-fill-available'
    }
    dzStyle = {
        padding: '5px',
        minHeight: '100px',
        border: '1px solid cadetblue',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    constructor(props){
        super(props);
        this.state = {
            title: props.task.general.title,
            description: props.task.general.description,
            introduction: props.task.general.introduction,
            avatar: props.task.general.avatar,
            avatarUploading: false,
            avatarUpError: false
        }
    }

    componentWillUnmount(){
        this.props.setGeneral(this.state);
    }

    onDrop(file) {
        this.setState({
            ...this.state,
            avatar: file,
            avatarUploading:true,
            avatarUpError: false
        });
        const promise = new Promise((resolve, reject) => {
            console.log(file[0]);
            const reader = new FileReader();

            reader.readAsDataURL(file[0]);

            reader.onload = () => {
                if (!!reader.result) {
                  resolve(reader.result);
                }
                else {
                  reject(Error("Failed converting to base64"));
                }
            }

        })
        promise.then(result => {
            axios.put('/tasks/'+this.props.task.id, {imgname: sha256(result), base64: result})
            .then(res => {
                this.setState({...this.state, avatarUploading: false});
            })
            .catch(err => {
                this.setState({...this.state, avatarUploading: false, avatarUpError: true});
                console.log(err);
            });
        }, err => {
            this.setState({...this.state, avatarUploading: false, avatarUpError: true});
            console.log(err)
        })

    }

    render(){
        let dropzone = (
            <div style={{textAlign: 'center'}}>
                <Icon name='add circle' size='big' />
                <p>Drop an image or click here to browse</p>
            </div>
        );
        if(this.state.avatar) {
            dropzone =
                    <Segment basic>
                    {this.state.avatarUploading?
                        <Dimmer active>
                            <Loader indeterminate>Uploading</Loader>
                        </Dimmer>:null}
                    <Image src={this.state.avatar} size='small' inline/></Segment>
        }

        return (
            <Form>
                <Grid>
                    <Grid.Column stretched width={10}>
                    <div>
                        <Header content='Project title' size='small' sub/>
                        <Input type="text" value={this.state.title} onChange={(e)=> {this.setState({...this.state, title: e.target.value}); this.props.setGeneralTitle(e.target.value)}} style={this.inputStyle}/>
                        <p>Set your project title</p>
                        <Header content='Description' size='small' sub/>
                        <Input type="text" value={this.state.description} onChange={(e)=> this.setState({...this.state, description: e.target.value})} style={this.inputStyle}/>
                        <p>Describe your project in one line</p>
                    </div>
                    </Grid.Column>
                    <Grid.Column stretched width={6}>
                        <Header content='Avatar' size='small' sub/>

                        <div>
                            <Dropzone accept='image/*' multiple={false} style={this.dzStyle} onDrop={this.onDrop.bind(this)}>
                                {dropzone}
                            </Dropzone>
                            {this.state.avatarUpError?<Header as='h4' color='red' content='Something went wrong. Please try again.'/>:null}
                        </div>

                        <p>The avatar represents your project with an image</p>
                    </Grid.Column>
                    <Grid.Column stretched width={16}>
                        <Header content='Introduction' size='small' sub/>
                        <TextArea autoHeight value={this.state.introduction} onChange={(e)=> this.setState({...this.state, introduction: e.target.value})} />
                        <p>Explain interested people what your project is and why should they help you</p>
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}
