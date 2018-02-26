import React, {Component} from 'react'

import { Button, Header, Icon, Modal, Tab } from 'semantic-ui-react'

class TutorialModal extends Component {

    render(){
        const panes = this.props.tutorial.map(st => {
            const step = JSON.parse(st);
            return {menuItem: (step.index+1).toString(), render: () => <Tab.Pane attached={false}>{step.text}</Tab.Pane>}
        })
        return (
            <Modal
            trigger={<Button color='teal' circular icon='help circle' style={{position: 'fixed', bottom: '10px', right: '10px'}} onClick={()=>{this.props.handleModalOpen()}} />}
            open={this.props.open}
            onClose={() => {this.props.handleModalClose()}}
            closeIcon>
                <Header content='Tutorial' />
                <Modal.Content>
                    {(panes.length>0) ? <Tab menu={{text: true, attached: 'bottom', tabular: false}} panes={panes} /> : <Header size='small' color='red'>Tutorial has not been provided for this run. We are sure you can do it anyway!</Header>}
                </Modal.Content>
                <Modal.Actions>
                    <p>You can always open this from the <Icon color='teal' name='help circle' /> button on the bottom right corner.</p>
                </Modal.Actions>
            </Modal>
        )
    }

}

export default TutorialModal
