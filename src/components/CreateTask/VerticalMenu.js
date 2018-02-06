import React, {Component} from 'react'

import {Menu, Button} from 'semantic-ui-react'

export default class VerticalMenu extends Component {

    saveBtn = {
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        minWidth: '-webkit-fill-available'
    }

    constructor(props){
        super(props);
        this.handleItemClick = props.handleItemClick;
    }

    render(){
        const activeItem = this.props.activeItem;

        return (
            <Menu fluid vertical tabular='right' color='teal'>
                <Menu.Item name='General' active={activeItem === 'General'} onClick={this.handleItemClick} />
                <Menu.Item name='Runs' active={activeItem === 'Runs'} onClick={this.handleItemClick} />
                <Menu.Item name='Tutorial' active={activeItem === 'Tutorial'} onClick={this.handleItemClick} />
                <Menu.Item name='Collaborators' active={activeItem === 'Collaborators'} onClick={this.handleItemClick} />
                <Menu.Item name='Status' active={activeItem === 'Status'} onClick={this.handleItemClick} />
                <Button color='green' style={this.saveBtn} name='Save' onClick={this.handleItemClick}>Save</Button>
            </Menu>)
    }

}
