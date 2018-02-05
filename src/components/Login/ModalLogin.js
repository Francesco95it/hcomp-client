import React, {Component} from 'react'

import {Modal, Header, Image} from 'semantic-ui-react'

export default class ModalLogin extends Component {
    render(){
        return <Modal open={this.props.loginSuccess} size='small'>
                <Header>We are logging you in</Header>
                <Modal.Content>
                    <Image src='./Ball_teal.svg' />
                    <Image src='./Ball_noteal.svg' />
                    <Image src='./Ball_teal.svg' />
                </Modal.Content>
            </Modal>
    }
}
