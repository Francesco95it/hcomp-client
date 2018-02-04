import React, {Component} from 'react'

import {Icon, Button, TextArea} from 'semantic-ui-react'

export default class Tutorial extends Component {

    constructor(props){
        super(props);
        this.state = {
            steps: this.props.task.tutorial
        };
        this.addStep = this.addStep.bind(this);
        this.removeStep = this.removeStep.bind(this);
    }

    componentWillUnmount(){
        this.props.setTutorial(this.state.steps);
    }

    addStep(){
        console.log('Eu');
        this.setState({
            steps: [...this.state.steps, {
                index: this.state.steps.length,
                text: "",
            }]
        });

    }

    removeStep(step){
        const stepsCopy = this.state.steps;
        for (var i = 0; i < stepsCopy.length; i++) {

        }
        this.setState({
            ...this.state,
            steps: stepsCopy
        })
    }

    changeText(index, text){
        const stepsCopy = this.state.steps;
        stepsCopy[index].text = text;
        this.setState({
            ...this.state,
            steps: stepsCopy
        })
    }


    render(){

        return (
            <div>
                <p>Add a tutorial, step by step, for helping out users do your task.</p>

                <Button icon labelPosition='right' color='green' onClick={this.addStep}>
                    Add a step
                    <Icon name='add circle' />
                </Button>
                {
                    this.state.steps.map((step, index) => {
                        return (
                            <div key={index}>
                                <p style={{marginTop:'10px', marginBottom: '2px'}}>Step {step.index + 1}</p>
                                <TextArea autoHeight value={step.text} style={{width: '-webkit-fill-available'}} onChange={(e)=> this.changeText(index, e.target.value)} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
