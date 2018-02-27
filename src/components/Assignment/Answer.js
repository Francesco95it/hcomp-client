import React, {Component} from 'react'

import {Grid, Image, Header, Button, Loader, Progress} from 'semantic-ui-react'

import Type from './Type'

export default class Answer extends Component {

    constructor(props){
        super(props)
        this.state = {
            answer: null,
            answerChosen: false,
            wheelLoaded: false,
            loader: false
        }
        this.wheelLoaded = this.wheelLoaded.bind(this);
        this.answerChosen = this.answerChosen.bind(this);
    }

    componentWillReceiveProps(){
        setTimeout(()=>{
            let chosen = false;
            if(this.props.type === 8) chosen = true;
            this.setState({
                ...this.state,
                answer: null,
                answerChosen: chosen,
                loader: false
            })
        }, 500);
    }

    componentDidMount(){
        if(this.props.type === 8){
            this.setState({
                ...this.state,
                answerChosen:true
            })
        }
    }

    wheelLoaded(){
        this.setState({
            ...this.state,
            wheelLoaded:true,
        })
    }

    answerChosen(answer){
        this.setState({
            answer: answer,
            answerChosen: true,
        })
    }

    onNext(){
        this.setState({...this.state, loader: true});
        if(this.props.type===8){
            let founded = false;
            for(const emo in window.elemData.data) {
                if(window.elemData.data[emo]) founded=true;
            }
            if(founded){
                this.props.next({
                    answer: window.elemData.data,
                    imgname: this.props.image.name
                });
            } else {
                alert('Select at least one emotion');
                this.setState({...this.state, loader: false});
            }
        } else {
            this.props.next({
                answer: this.state.answer,
                imgname: this.props.image.name
            });
        }

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
                            <Type type={this.props.type} answerChosen={this.answerChosen} percent={this.props.percent}/>
                        </Grid.Row>
                        <Grid.Row style={{position: 'absolute', right: '0', bottom: '0', marginRight: '10px'}}>
                            <Grid.Column width={16}>
                                <Button
                                disabled={!this.state.answerChosen}
                                content={this.props.isLast ? 'Done' : 'Next'}
                                icon={this.props.isLast ? 'checkmark' : 'right arrow'}
                                labelPosition='right'
                                color='green'
                                onClick={()=>this.onNext()}/>
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
