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
            <Menu fluid vertical tabular>
                <Menu.Item name='General' active={activeItem === 'General'} onClick={this.handleItemClick} />
                <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
                <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick} />
                <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick} />
            </Menu>)
    }

}
