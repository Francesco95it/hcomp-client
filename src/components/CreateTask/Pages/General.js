import React, {Component} from 'react'

import { set_general } from '../../../store/actions/createTaskActions'

import {Form, Input, TextArea, Grid, Header, Image, Icon} from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

export default class General extends Component {

    inputStyle={
        maxHeight: '30px',
        width: '-webkit-fill-available'
    }
    dzStyle = {
        padding: '5px',
        minHeight: '80px',
        border: '1px solid cadetblue',
        borderRadius: '5px',
        textAlign: 'center',
        verticalAlign: 'center'
    }

    constructor(props){
        super(props);
        this.state = {
            title: props.values.title,
            description: props.values.description,
            introduction: props.values.introduction,
            images: props.values.images
        }
    }

    componentWillUnmount(){
        this.props.dispatch(set_general(this.state));
    }

    onDrop(files) {
        this.setState({
            ...this.state,
            images: files
        });
    }

    render(){
        console.log(this.state);

        let dropzone = (
            <Icon name='add circle' size='big' style={{marginTop: '20px'}} />
        );
        try {
            if(this.state.images.length > 0) {
                dropzone = this.state.images.map((image, index) => {
                    return (
                        <Image key={index} src={image.preview} size='small' inline/>
                    )
                });
            }
        } catch (e) {
            console.error(e);
        }

        return (
            <Form>
                <Grid>
                    <Grid.Column stretched width={10}>
                    <div>
                        <Header content='Project title' size='small' sub/>
                        <Input type="text" value={this.state.title} onChange={(e)=> {this.setState({...this.state, title: e.target.value}); this.props.titleChanged(e);}} style={this.inputStyle}/>
                        <p>Set your project title</p>
                    </div>
                    </Grid.Column>
                    <Grid.Column stretched width={6}>
                        <Header content='Avatar' size='small' sub/>

                        <div>
                            <Dropzone multiple={false} style={this.dzStyle} onDrop={this.onDrop.bind(this)}>
                                {dropzone}
                            </Dropzone>
                        </div>

                        <p>The avatar represents your project with an image</p>
                    </Grid.Column>
                    <Grid.Column stretched width={16}>
                        <Header content='Description' size='small' sub/>
                        <Input type="text" value={this.state.description} onChange={(e)=> this.setState({...this.state, description: e.target.value})} style={this.inputStyle}/>
                        <p>Describe your project in one line</p>
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
