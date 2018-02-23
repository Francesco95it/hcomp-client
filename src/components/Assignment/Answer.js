import React, {Component} from 'react'

import {Grid, Image, Header, Form, Radio, Button, Loader, Progress} from 'semantic-ui-react'

export default class Answer extends Component {

    constructor(props){
        super(props)
        this.state = {
            answer: null,
            answerChosen: false,
            loader: false
        }
    }

    componentWillReceiveProps(){
        setTimeout(()=>{
            this.setState({
                ...this.state,
                answer: null,
                answerChosen: false,
                loader: false
            })
        }, 500);
    }

    changeAnswer(answer){
        this.setState({
            ...this.state,
            answerChosen: true,
            answer: answer
        })
    }

    render(){
        if(this.state.loader) return <Loader active inline='centered' />
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Image centered src={this.props.image.url} size='medium' />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Grid.Row>
                            <Button.Group floated='right' size='mini' compact >
                                <Button color='instagram' content='Save' onClick={()=>this.props.save()}/>
                                <Button.Or text='or' />
                                <Button negative content='Save & exit' onClick={()=>this.props.save(true)}/>
                            </Button.Group>
                            <Header content={this.props.question} size='medium' style={{marginTop: 0}}/>
                        </Grid.Row>
                        <Grid.Row style={{marginTop: '1em'}}>
                            <Form>
                                <Form.Field>
                                    <Radio
                                        label='Yes'
                                        name='radioGroup'
                                        checked={this.state.answer === 'Yes'}
                                        onChange={(e)=> {this.changeAnswer('Yes')}}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='No'
                                        name='radioGroup'
                                        checked={this.state.answer === 'No'}
                                        onChange={(e)=> {this.changeAnswer('No')}}
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Row>
                        <Grid.Row style={{position: 'absolute', right: '0', bottom: '0', marginRight: '10px'}}>
                            <Grid.Column width={16}>
                                <Button
                                disabled={!this.state.answerChosen}
                                content={this.props.isLast ? 'Done' : 'Next'}
                                icon={this.props.isLast ? 'checkmark' : 'right arrow'}
                                labelPosition='right'
                                color='green'
                                onClick={()=>{
                                    this.setState({...this.state, loader: true});
                                    this.props.next({
                                        answer: this.state.answer,
                                        imgname: this.props.image.name
                                    });
                                }}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{borderTop: '1px solid #d6d6d6'}}>
                    <Grid.Column width={16}>
                        <Header size='small' content='Progress' color='teal' />
                        <Progress percent={this.props.percent} indicating style={{marginBottom: '0'}}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
