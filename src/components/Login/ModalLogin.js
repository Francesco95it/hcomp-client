import React, {Component} from 'react'

import {Modal, Header, Image} from 'semantic-ui-react'

import ballnoteal from './Ball_noteal.svg'
import ballteal from './Ball_teal.svg'

export default class ModalLogin extends Component {
    
    render(){
        return <Modal open={this.props.loginSuccess} size='mini' style={{textAlign: 'center'}}>
                <Header>We are logging you in</Header>
                <Modal.Content>

                    <div style={{textAlign: 'center'}}>
                        <Image size='mini' src={ballteal} inline centered/>
                        <Image size='mini' src={ballnoteal} inline centered/>
                        <Image size='mini' src={ballteal} inline centered/>
                    </div>
                </Modal.Content>
            </Modal>
    }
}
