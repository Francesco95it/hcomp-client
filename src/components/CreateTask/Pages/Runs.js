import React, {Component} from 'react'

import {Button, Icon, Transition, Segment, Header, Grid, Input} from 'semantic-ui-react'

export default class Runs extends Component {

    inputStyle={
        maxHeight: '30px',
        width: '-webkit-fill-available'
    }

    constructor(props){
        super(props);
        this.state = {
            runs: this.props.values
        }
        this.addRun = this.addRun.bind(this);
        this.toggleRun = this.toggleRun.bind(this);
        this.removeRun = this.removeRun.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
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

    toggleRun(index){
        let runsCopy = this.state.runs;
        runsCopy[index].hided = !runsCopy[index].hided;
        this.setState({runs: runsCopy});
    }

    removeRun(index){
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


    render(){
        console.log(this.state);
        return (
            <div>
                <p>What is a run??</p>
                <Button icon labelPosition='right' color='green' onClick={this.addRun}>
                    Add a run
                    <Icon name='add circle' />
                </Button>
                {this.state.runs.map((run, index)=>{
                    return (
                        <Segment.Group key={index}  piled>
                            <Segment>
                                <Header size="small" content={run.title} style={{display: 'inline'}} />
                                <Button circular icon='delete' compact size='mini' floated='right' onClick={()=>this.removeRun(index)}/>
                                <Button circular icon={run.hided ? 'chevron down' : 'chevron up'} compact size='mini' floated='right' onClick={()=>this.toggleRun(index)}/>
                            </Segment>
                            <Transition visible={!run.hided}  animation='fade down' duration={500}>
                                <Segment>
                                    <Grid>
                                        <Grid.Column stretched width={8}>

                                            <Input label='Title' labelPosition='left' type="text" placeholder='Run title' onChange={(e)=> {this.changeTitle(index, e.target.value)}}/>
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
