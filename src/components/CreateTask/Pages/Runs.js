import React, {Component} from 'react'

import {Button, Icon, Transition, Segment, Header, Grid, Input, Image, TextArea} from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

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
        justifyContent: 'center',
        alignItems: 'center'
    }
    imgStyle = {
        margin: '5px'
    }

    constructor(props){
        super(props);
        this.state = {
            runs: (this.props.task.runs)
        }
        this.addRun = this.addRun.bind(this);
        this.toggleRun = this.toggleRun.bind(this);
        this.removeRun = this.removeRun.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeIntroduction = this.changeIntroduction.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentWillUnmount(){
        this.props.setRuns(this.state.runs);
    }

    addRun(){
        this.setState({
            runs: [...this.state.runs, {
                title: `Untitled run`,
                description: "",
                introduction: "",
                images: [],
                type: "",
                index: this.state.runs.length,
                hided: false
            }]
        })
    }

    toggleRun(index, e){
        e.stopPropagation();
        let runsCopy = this.state.runs;
        runsCopy[index].hided = !runsCopy[index].hided;
        this.setState({runs: runsCopy});
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
            runs: runsCopy
        })
    }

    changeTitle(index, title){
        let runsCopy = this.state.runs;
        runsCopy[index].title = title;
        this.setState({
            runs: runsCopy
        });
    }

    changeDescription(index, desc){
        let runsCopy = this.state.runs;
        runsCopy[index].description = desc;
        this.setState({
            runs: runsCopy
        });
    }

    changeIntroduction(index, intro){
        let runsCopy = this.state.runs;
        runsCopy[index].introduction = intro;
        this.setState({
            runs: runsCopy
        });
    }

    onDrop(index, files){
        let runsCopy = this.state.runs;
        runsCopy[index].images = files;
        this.setState({
            runs: runsCopy
        })
    }


    render(){
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
                        dropzone = run.images.map((image, index) => {
                            return (
                                <Image key={index} bordered src={image.preview} size='small' inline style={this.imgStyle}/>
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
