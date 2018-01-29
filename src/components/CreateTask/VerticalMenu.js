import React, {Component} from 'react'

import {Menu} from 'semantic-ui-react'

export default class VerticalMenu extends Component {

    constructor(props){
        super(props);
        this.handleItemClick = props.handleItemClick;
    }

    render(){
        const activeItem = this.props.activeItem;

        return (
            <Menu fluid vertical tabular='right'>
                <Menu.Item name='General' active={activeItem === 'General'} onClick={this.handleItemClick} />
                <Menu.Item name='Runs' active={activeItem === 'Runs'} onClick={this.handleItemClick} />
                <Menu.Item name='Tutorial' active={activeItem === 'Tutorial'} onClick={this.handleItemClick} />
                <Menu.Item name='Collaborators' active={activeItem === 'Collaborators'} onClick={this.handleItemClick} />
                <Menu.Item name='Status' active={activeItem === 'Status'} onClick={this.handleItemClick} />
            </Menu>)
    }

}
