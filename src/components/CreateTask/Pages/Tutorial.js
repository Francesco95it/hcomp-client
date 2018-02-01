import React, {Component} from 'react'

import {Icon, Button} from 'semantic-ui-react'

export default class Tutorial extends Component {

    constructor(props){
        super(props);
        this.state = {
            steps: this.props.task.tutorial
        };
    }

    componentWillUnmount(){
        this.props.setTutorial(this.state.steps);
    }

    addStep(){
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




    render(){

        return (
            <div>
                <p>Add a tutorial, step by step, for helping out users do your task.</p>

                <Button icon labelPosition='right' color='green' onClick={this.addStep}>
                    Add a run
                    <Icon name='add circle' />
                </Button>>
            </div>
        )
    }
}
