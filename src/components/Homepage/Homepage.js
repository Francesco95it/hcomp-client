import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Header, Grid, Icon} from 'semantic-ui-react'

import MainHeader from './MainHeader'

class Homepage extends Component {

    render(){
        return (
            <div>
            <MainHeader {...this.props}/>
            <Grid columns='two' textAlign='center' style={{marginTop: '15px'}}>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' icon>
                            <Icon name='settings' />
                            Some title
                            <Header.Subheader>
                                Something will be explained here
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h2' icon>
                            <Icon name='settings' />
                            Some title
                            <Header.Subheader>
                                Something will be explained here
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h2' icon>
                            <Icon name='settings' />
                            Some title
                            <Header.Subheader>
                                Something will be explained here
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h2' icon>
                            <Icon name='settings' />
                            Some title
                            <Header.Subheader>
                                Something will be explained here
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        session: state.session,
        user: state.user,
    };
}

export default connect(mapStateToProps)(Homepage);
