import React, {Component} from 'react'

import Script from 'react-load-script'
import {Form, Radio, Loader} from 'semantic-ui-react'

export default class Type extends Component {

    constructor(props){
        super(props)
        console.log("Constructor type");
        this.state = {
            answer: null,
            time: false,
            plutchLoaded: false,
            plutchCreated: false,
        }
    }

    componentWillMount(){
        window.connectScript = 'a'+new Date().getTime();
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                ...this.state,
                time:true
            })
        }, 1500)
    }

    changeAnswer(answer){
        this.setState({
            ...this.state,
            answer: answer
        })
        this.props.answerChosen(answer);
    }

    render(){
        console.log("props: ", this.props);
        console.log("state: ", this.state);
        console.log("elem: ", document.getElementById('drawer'+window.connectScript));
        switch (this.props.type) {
            case 7:
            return (
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
            )

            case 8:
            return(
                <div>
                    <div id={'drawer'+window.connectScript}></div>
                    {this.state.time?<Script attributes={{id: window.connectScript}} url={`${window.location.protocol}//${window.location.host}/renderScript.js`} onError={(e)=>{console.log("error render");}} onLoad={(e)=>{console.log("load render");}} onCreate={()=>this.setState({...this.state, plutchCreated: true})}/> : null}
                </div>)

            default:

        }
        return <Loader active />
    }
}

// {this.state.time?<Script url={`${window.location.protocol}//${window.location.host}/PlutchikWheel.js`} onError={(e)=>{console.log("error wheel");}} onLoad={(e)=>{console.log("load wheel"); this.setState({...this.state, plutchLoaded: true})}} onCreate={()=>this.setState({...this.state, plutchLoaded: true})} />:<Loader active />}
// {this.state.time?<Script url={`${window.location.protocol}//${window.location.host}/PlutchTheme.js`} onError={(e)=>{console.log("error theme");}} onLoad={(e)=>{console.log("load theme");}} />:null}
// {this.state.plutchLoaded?<Script attributes={{id: window.connectScript}} url={`${window.location.protocol}//${window.location.host}/renderScript.js`} onError={(e)=>{console.log("error render");}} onLoad={(e)=>{console.log("load render");}} onCreate={()=>this.setState({...this.state, plutchCreated: true})}/>:null}
