import React, {Component} from 'react'

import {Button, Icon, Transition, Segment, Header, Grid, Input, TextArea, Form, Radio, Loader, Dimmer} from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

import axios from 'axios'

import UpImage from './UpImage'

const sha256 = require('js-sha256')

export default class Runs extends Component {

    inputStyle={
        maxHeight: '30px',
        width: '-webkit-fill-available'
    }
    dzStyle = {
        padding: '5px',
        minHeight: '300px',
        maxHeight: '300px',
        overflow: 'scroll',
        border: '1px solid cadetblue',
        borderRadius: '5px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }

    constructor(props){
        super(props);
        this.state = {
            runs: (this.props.task.runs),
            loader: false,
            error: false
        }
        this.addRun = this.addRun.bind(this);
        this.toggleRun = this.toggleRun.bind(this);
        this.removeRun = this.removeRun.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeIntroduction = this.changeIntroduction.bind(this);
        this.changeType = this.changeType.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.removeAllFiles = this.removeAllFiles.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentWillUnmount(){
        this.props.setRuns(this.state.runs);
    }

    addRun(){
        this.setState({...this.state, loader: true});
        axios.post('/tasks/runs', {id_task: this.props.task.id, id_runtype: '2'})
        .then( (res) => {
            this.setState({
                ...this.state,
                loader: false,
                runs: [...this.state.runs, {
                    id: res.data,
                    name: `Untitled run`,
                    description: "",
                    introduction: "",
                    images: [],
                    uploadingError: false,
                    type: {
                        question: "",
                        type: 2
                    },
                    index: this.state.runs.length,
                    hided: false
                }]
            })
        })
        .catch(err => {
            console.log("Error: ",err);
            // this.setState({
            //     ...this.state,
            //     error: err,
            // });
        });
    }

    toggleRun(index, e){
        e.stopPropagation();
        let runsCopy = this.state.runs;
        runsCopy[index].hided = !runsCopy[index].hided;
        this.setState({...this.state, runs: runsCopy});
    }

    removeRun(index, e){
        e.stopPropagation();
        axios.delete(`/tasks/runs/${this.state.runs[index].id}`)
        .then(() => {
            let runsCopy = this.state.runs;
            for (let i=index; i<this.state.runs.length-1; i++){
                runsCopy[i] = runsCopy[i+1];
                runsCopy[i].index = i;
            }
            runsCopy.splice(-1,1);
            this.setState({
                ...this.state,
                runs: runsCopy
            })
            }
        )
        .catch(err => {
            console.log(err);
            // this.setState({
            //     ...this.state,
            //     error: err,
            // });
        })
    }

    changeName(index, name){
        let runsCopy = this.state.runs;
        runsCopy[index].name = name;
        this.setState({
            ...this.state,
            runs: runsCopy
        });
    }

    changeDescription(index, desc){
        let runsCopy = this.state.runs;
        runsCopy[index].description = desc;
        this.setState({
            ...this.state,
            runs: runsCopy
        });
    }

    changeIntroduction(index, intro){
        let runsCopy = this.state.runs;
        runsCopy[index].introduction = intro;
        this.setState({
            ...this.state,
            runs: runsCopy
        });
    }

    changeType(index, question, type){
        let runsCopy = this.state.runs;
        runsCopy[index].type.question = question;
        runsCopy[index].type.type = type;
        this.setState({
            ...this.state,
            runs: runsCopy
        });
    }

    uploadImage(index, i){
        const promise = new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(this.state.runs[index].images[i].image);

            reader.onload = () => {
                if (!!reader.result) {
                    resolve(reader.result);
                }
                else {
                    this.setState({
                        ...this.state,
                        error: "Failed to convert in base64",
                    });
                }
            }
        })
        promise.then(result => {
            const name = sha256(result+new Date().getTime());
            axios.put('/tasks/runs/'+this.state.runs[index].id, {imgname: name, base64: result})
            .then(res => {
                let runsCopy = this.state.runs;
                runsCopy[index].images[i].uploading = false;
                runsCopy[index].images[i].name = name;
                this.setState({...this.state, runs: runsCopy});
                if(i>0) this.uploadImage(index, i-1);
            })
            .catch(err => {
                console.log(err);
                // this.setState({
                //     ...this.state,
                //     error: err,
                // });
            });
        }, err => {
            console.log(err);
            // this.setState({
            //     ...this.state,
            //     error: err,
            // });
        })
    }

    onDrop(index, files){
        axios.patch('/tasks/runs/'+this.state.runs[index].id, {deleteAll: true})
        .then(res=>{
            let runsCopy = this.state.runs;
            runsCopy[index].images = [];
            this.setState({
                ...this.state,
                runs: runsCopy
            });
            runsCopy[index].images = files.map(file => { return {image: file, uploading: true}});
            runsCopy[index].uploadingError = false;
            this.setState({
                ...this.state,
                runs: runsCopy
            });
            this.uploadImage(index, files.length-1);
        })
        .catch(err => {
            console.log("Error deleting images: ",err);
            // this.setState({
            //     ...this.state,
            //     error: err,
            // });
        });
    }

    removeFile(index, imgindex, e) {
        e.stopPropagation();
        let runsCopy = this.state.runs;
        runsCopy[index].images[imgindex].uploading = true;
        this.setState({
            ...this.state,
            runs: runsCopy
        })
        axios.patch('/tasks/runs/'+this.state.runs[index].id, {imgname: runsCopy[index].images[imgindex].name})
        .then(res=>{
            runsCopy[index].images.splice(imgindex, 1);
            this.setState({
                ...this.state,
                runs: runsCopy
            });
        })
        .catch(err => {
            console.log("Error deleting image: ",err);
            // this.setState({
            //     ...this.state,
            //     error: err,
            // });
        });
    }

    removeAllFiles(index) {
        let runsCopy = this.state.runs;
        axios.patch('/tasks/runs/'+this.state.runs[index].id, {deleteAll: true})
        .then(res=>{
            runsCopy[index].images = [];
            this.setState({
                ...this.state,
                runs: runsCopy
            });
        })
        .catch(err => {
            console.log("Error deleting images: ",err);
            // this.setState({
            //     ...this.state,
            //     error: err,
            // });
        });
    }


    render(){
        if(this.state.error) return (<div><Header color='red'>Something went wrong. We saved the work you did until now, you can find your task in your task page. Please try again later.</Header><br/><p>Your error is {this.state.error}</p></div>)
        if(this.state.loader) return <Loader active inline='centered' />
        let dropzone = (
            <div style={{textAlign: 'center'}}>
                <Icon name='add circle' size='big' />
                <p>Drop images or click here to browse</p>
            </div>
        );
        return (
            <div>
                <p>What is a run??</p>
                <Button icon labelPosition='right' color='green' onClick={this.addRun}>
                    Add a run
                    <Icon name='add circle' />
                </Button>
                {this.state.runs.map((run)=>{
                    console.log(run);
                    if(this.state.runs[run.index].images.length > 0) {
                        dropzone = this.state.runs[run.index].images.map((image, imgindex) => {
                            const indexes = {
                                index: run.index,
                                imgindex: imgindex
                            };
                            return (
                                <Segment basic key={imgindex}>
                                {image.uploading?
                                    <Dimmer active>
                                        <Loader indeterminate>Uploading</Loader>
                                    </Dimmer>:null}
                                    <UpImage indexes={indexes} src={image.image?image.image.preview:image.url} delete={this.removeFile} />
                                </Segment>
                            )
                        });
                    } else {
                        dropzone = (
                            <div style={{textAlign: 'center'}}>
                                <Icon name='add circle' size='big' />
                                <p>Drop images or click here to browse</p>
                            </div>
                        );
                    }
                    return (
                        <Segment.Group key={run.index}  piled>
                            <Segment onClick={(e)=>this.toggleRun(run.index, e)}>
                                <Header size="small" content={run.name} style={{display: 'inline'}} />
                                <Button circular color='red' icon='delete' compact size='mini' floated='right' onClick={(e)=>this.removeRun(run.index, e)}/>
                                <Button circular color='teal' icon={run.hided ? 'chevron down' : 'chevron up'} compact size='mini' floated='right' onClick={(e)=>this.toggleRun(run.index, e)}/>
                            </Segment>
                            <Transition visible={!run.hided}  animation='fade down' duration={500}>
                                <Segment>
                                    <Grid>
                                        <Grid.Column stretched width={8}>
                                            <Input label='Name' labelPosition='left' type="text" placeholder='Run name' value={run.name} onChange={(e)=> {this.changeName(run.index, e.target.value)}}/>
                                        </Grid.Column>
                                        <Grid.Column stretched width={16}>
                                            {run.uploadingError? <Header color='red'>Something went wrong uploading one or more images. Please try again</Header>: null}
                                            <Dropzone accept='image/*' style={this.dzStyle} onDrop={(files) => this.onDrop(run.index, files)}>
                                                {dropzone}
                                            </Dropzone>
                                            {run.images.length>0? <Button color='red' onClick={()=>this.removeAllFiles(run.index)}>Delete all images</Button> : null}
                                        </Grid.Column>
                                        <Grid.Column stretched width={16}>
                                            <Input label='Description' labelPosition='left' type="text" placeholder='Description' value={run.description} onChange={(e)=> {this.changeDescription(run.index, e.target.value)}}/>
                                        </Grid.Column>
                                        <Grid.Column stretched width={16}>
                                            <Header content='Introduction' size='small' sub/>
                                            <TextArea autoHeight value={run.introduction} onChange={(e)=> this.changeIntroduction(run.index, e.target.value)} />
                                        </Grid.Column>
                                        <Grid.Column stretched width={10}>
                                            <Header content='Task type' size='small' sub/>
                                            <Input label='Question' labelPosition='left' type="text" placeholder='Question users should answer' value={run.type.question} onChange={(e)=> {this.changeType(run.index, e.target.value, run.type.type)}}/>
                                        </Grid.Column>
                                        <Grid.Column stretched width={6}>
                                            <Form>
                                                <Form.Field>
                                                    <Radio
                                                        label='Yes/No'
                                                        name='radioGroup'
                                                        checked={run.type.type === 2}
                                                        onChange={(e)=> {this.changeType(run.index, run.type.question, 2)}}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Radio
                                                        label='Other'
                                                        name='radioGroup'
                                                        checked={run.type.type === 3}
                                                        onChange={(e)=> {this.changeType(run.index, run.type.question, 3)}}
                                                    />
                                                </Form.Field>
                                            </Form>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                            </Transition>
                        </Segment.Group>
                    )
                })}
            </div>
        )
    }
}
