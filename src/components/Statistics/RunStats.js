import React, {Component} from 'react'

import axios from 'axios'
import {Progress, Segment, Transition, Header, Grid, Image, Loader} from 'semantic-ui-react'

export default class RunStats extends Component {
    constructor(props){
        super(props)
        this.state = {
            stats: null,
            hided: true,
            loading: false
        }
    }

    toggleRun(){
        this.setState({
            ...this.state,
            loading: true
        })
        if(!this.state.stats) {
            axios.get(`/tasks/runs/${this.props.run.id}?filter=stats`)
            .then(res => {
                this.setState({
                    ...this.state,
                    stats: (res.data || [-1])
                })
                if(res.data) this.calculateStats();
                this.setState({
                    ...this.state,
                    hided: !this.state.hided,
                    loading: false
                })
            })
            .catch(err => console.log(err))
        } else {
            this.setState({
                ...this.state,
                hided: !this.state.hided,
                loading: false
            })
        }
    }

    calculateStats(){
        if(this.props.run.id_runtype === 8 || this.props.run.id_runtype === 7){
            let stats = [];
            for (let key in this.state.stats){
                const imageProps = JSON.parse(this.state.stats[key]);
                let propsArray = [];
                for (let key1 in imageProps) {
                    if(key1 === 'tot') {
                        this.setState({
                            ...this.state,
                            totalAssignments: imageProps[key1],
                        })
                    } else {
                        propsArray = [...propsArray, {
                            emoName: key1,
                            value: Math.round(imageProps[key1])
                        }]
                    }
                }
                stats = [...stats, {
                    imgName: key,
                    imgUrl: `https://s3.eu-central-1.amazonaws.com/socialhumancomputationproject/tasks${this.props.tid}/runs${this.props.run.id}/${key}`,
                    individualStats: propsArray
                }];
            }
            this.setState({
                ...this.state,
                stats: stats
            })
        }
        // if(this.props.run.id_runtype === 7){
            // dosomething
        // }
    }

    render(){
        return (
            <Segment.Group piled style={{marginBottom:'1em'}}>
            <Segment onClick={(e)=>this.toggleRun()}>
                <Header size="small" content={this.props.run.name} style={{display: 'inline'}} />
                <Loader inline='centered' active={this.state.loading} />
            </Segment>
            <Transition visible={!this.state.hided}  animation='fade down' duration={500}>
                <Segment>
                    <Grid divided="vertically" verticalAlign='middle'>
                        {!this.state.hided? this.state.stats.map(stat => {
                            if(stat === -1) return <Header key={1} color='teal' content='No assignments has been completed!' />
                            return (
                                <Grid.Row key={stat.imgName}>
                                    <Grid.Column width={4}>
                                        <Image size='small' src={stat.imgUrl} />
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        {stat.individualStats.map(prop => {
                                            return <Progress key={prop.emoName} label={prop.emoName} percent={prop.value} size='small' progress indicating />
                                        })}
                                    </Grid.Column>
                                </Grid.Row>)
                        }) : null}
                    </Grid>
                </Segment>
            </Transition>
        </Segment.Group>)
    }
}
