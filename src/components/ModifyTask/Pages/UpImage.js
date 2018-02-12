import React, {Component} from 'react'

import {Dimmer, Image, Button} from 'semantic-ui-react'

export default class UpImage extends Component {

    imgStyle = {
        margin: '5px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }

    constructor(props){
        super(props)
        this.state = {
            active: false,
        }
    }


    render(){
        const active = this.state.active;
        const src = this.props.src;
        const content = <Button circular color='red' icon='delete' compact size='small' onClick={(e)=>this.props.delete(this.props.indexes.index, this.props.indexes.imgindex, e)}/>

        return <Dimmer.Dimmable
                as={Image}
                dimmed={active}
                dimmer={{ active, content}}
                onMouseEnter={()=>this.setState({...this.state, active: true})}
                onMouseLeave={()=>this.setState({...this.state, active: false})}
                onClick={(e)=>e.stopPropagation()}
                size='small'
                blurring
                style={this.imgStyle}
                src={src}
            />
    }

}
