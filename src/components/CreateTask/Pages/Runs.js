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
        }
        this.addRun = this.addRun.bind(this);
        this.toggleRun = this.toggleRun.bind(this);
        this.removeRun = this.removeRun.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeIntroduction = this.changeIntroduction.bind(this);
        this.changeType = this.changeType.bind(this);
        this.removeFile = this.removeFile.bind(this);
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
                    title: `Untitled run`,
                    description: "",
                    introduction: "",
                    images: [],
                    imagesUploading: false,
                    imagesUpError: false,
                    type: {
                        question: "",
                        type: "yesno"
                    },
                    index: this.state.runs.length,
                    hided: false
                }]
            })
        })
        .catch(e => console.log("Error: ",e));
    }

    toggleRun(index, e){
        e.stopPropagation();
        let runsCopy = this.state.runs;
        runsCopy[index].hided = !runsCopy[index].hided;
        this.setState({...this.state, runs: runsCopy});
    }

    removeRun(index, e){
        e.stopPropagation();
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

    changeTitle(index, title){
        let runsCopy = this.state.runs;
        runsCopy[index].title = title;
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

    onDrop(index, files){
        let runsCopy = this.state.runs;
        runsCopy[index].images = files;
        runsCopy[index].imagesUploading = true;
        runsCopy[index].imagesUpError = false;
        this.setState({
            ...this.state,
            runs: runsCopy
        });
        for (let i=0; i<this.state.runs[index].images.length; i++) {
            console.log(this.state.runs[index].images[i]);
            const promise = new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.readAsDataURL(this.state.runs[index].images[i]);

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
                axios.put('/tasks/runs/'+this.state.runs[index].id, {number: i, imgname: sha256(result), base64: result})
                .then(res => {
                    let runsCopy = this.state.runs;
                    runsCopy[index].imagesUploading = false;
                    this.setState({...this.state, runs: runsCopy});
                })
                .catch(err => {
                    let runsCopy = this.state.runs;
                    runsCopy[index].imagesUploading = false;
                    runsCopy[index].imagesUpError = true;
                    this.setState({...this.state, runs: runsCopy});
                    console.log(err);
                });
            }, err => {
                    let runsCopy = this.state.runs;
                    runsCopy[index].imagesUploading = false;
                    runsCopy[index].imagesUpError = true;
                    this.setState({...this.state, runs: runsCopy});
                    console.log(err);
            })
        }
    }

    removeFile(index, imgindex, e) {
        e.stopPropagation();
        let runsCopy = this.state.runs;
        runsCopy[index].images.splice(imgindex, 1);
        this.setState({
            ...this.state,
            runs: runsCopy
        });
    }


    render(){
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
                {this.state.runs.map((run, index)=>{
                    if(run.images.length > 0) {
                        dropzone = run.images.map((image, imgindex) => {
                            const indexes = {
                                index: index,
                                imgindex: imgindex
                            };
                            return (
                                <Segment basic key={imgindex}>
                                {run.imagesUploading?
                                    <Dimmer active>
                                        <Loader indeterminate>Uploading</Loader>
                                    </Dimmer>:null}
                                    <UpImage indexes={indexes} src={image.preview} delete={this.removeFile} />
                                </Segment>
                            )
                        });
                    }
                    return (
                        <Segment.Group key={index}  piled>
                            <Segment onClick={(e)=>this.toggleRun(index, e)}>
                                <Header size="small" content={run.title} style={{display: 'inline'}} />
                                <Button circular color='red' icon='delete' compact size='mini' floated='right' onClick={(e)=>this.removeRun(index, e)}/>
                                <Button circular color='teal' icon={run.hided ? 'chevron down' : 'chevron up'} compact size='mini' floated='right' onClick={(e)=>this.toggleRun(index, e)}/>
                            </Segment>
                            <Transition visible={!run.hided}  animation='fade down' duration={500}>
                                <Segment>
                                    <Grid>
                                        <Grid.Column stretched width={8}>
                                            <Input label='Title' labelPosition='left' type="text" placeholder='Run title' value={run.title} onChange={(e)=> {this.changeTitle(index, e.target.value)}}/>
                                        </Grid.Column>
                                        <Grid.Column stretched width={16}>
                                            <Dropzone style={this.dzStyle} onDrop={(files) => this.onDrop(index, files)}>
                                                {dropzone}
                                            </Dropzone>
                                        </Grid.Column>
                                        <Grid.Column stretched width={16}>
                                            <Input label='Description' labelPosition='left' type="text" placeholder='Description' value={run.description} onChange={(e)=> {this.changeDescription(index, e.target.value)}}/>
                                        </Grid.Column>
                                        <Grid.Column stretched width={16}>
                                            <Header content='Introduction' size='small' sub/>
                                            <TextArea autoHeight value={run.introduction} onChange={(e)=> this.changeIntroduction(index, e.target.value)} />
                                        </Grid.Column>
                                        <Grid.Column stretched width={10}>
                                            <Header content='Task type' size='small' sub/>
                                            <Input label='Question' labelPosition='left' type="text" placeholder='Question users should answer' value={run.type.question} onChange={(e)=> {this.changeType(index, e.target.value, run.type.type)}}/>
                                        </Grid.Column>
                                        <Grid.Column stretched width={6}>
                                            <Form>
                                                <Form.Field>
                                                    <Radio
                                                        label='Yes/No'
                                                        name='radioGroup'
                                                        value='yesno'
                                                        checked={run.type.type === 'yesno'}
                                                        onChange={(e)=> {this.changeType(index, run.type.question, 'yesno')}}
                                                    />
                                                </Form.Field>
                                                <Form.Field>
                                                    <Radio
                                                        label='Other'
                                                        name='radioGroup'
                                                        value='other'
                                                        checked={run.type.type === 'other'}
                                                        onChange={(e)=> {this.changeType(index, run.type.question, 'other')}}
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
