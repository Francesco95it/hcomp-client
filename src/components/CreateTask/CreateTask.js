import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Segment, Grid} from 'semantic-ui-react'

import VerticalMenu from './VerticalMenu'

class CreateTask extends Component {

    loadingSegm = {
        minHeight: '200px'
    }

    gridRightStyle = {
        borderTop: '1px solid grey'
    }

    constructor(props){
        super(props);
        this.state = {
            activeItem: 'General'
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        return (
            <Grid style={{marginTop:'0px'}}>
                <Grid.Column width={2}>
                    <VerticalMenu handleItemClick={this.handleItemClick} activeItem={this.state.activeItem} />
                </Grid.Column>

                <Grid.Column stretched width={12} style={this.gridRightStyle}>
                    <Segment basic>
                        Active item: {this.state.activeItem}
                    </Segment>
                </Grid.Column>
            </Grid>);
        }
}

function mapStateToProps(state) {
    return {
        session: state.session,
        user: state.user,
    };
}

export default connect(mapStateToProps)(CreateTask);
