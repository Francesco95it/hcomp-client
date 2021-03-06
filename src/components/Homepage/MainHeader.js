import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {Segment, Icon, Button} from 'semantic-ui-react'

import backgroundImage from './background.jpeg'

class MainHeader extends Component {
    segmentStyle = {
        backgroundImage: 'url('+backgroundImage+')',
        backgroundSize: 'cover',
        padding: '0',
    }

    divStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingTop: '6em',
        paddingBottom: '6em',
        paddingLeft: '1em',
        paddingRight: '1em',
    }

    render(){

        if(this.props.session.authenticated){
            // USER AUTHENTICATED. RENDER STATS OR SOMETHING
            return (<Segment inverted vertical padded='very' textAlign='center' style={this.segmentStyle}>
                <div style={this.divStyle}>
                    <Icon name='home' size='massive' />
                    <h1>Welcome {this.props.session.user.name}.</h1>
                    <h4 style={{marginTop: '5px'}}>Your friend Carlo completed <a href='#'>Science Scribbler</a> task 1 hour ago!</h4>
                    <Button basic animated color='yellow' size='big' as={Link} to="/profile">
                        <Button.Content visible>Go to your profile</Button.Content>
                        <Button.Content hidden>
                            <Icon name='right arrow' />
                        </Button.Content>
                    </Button>
                </div>
            </Segment>)
        }

        //NO USER LOGGED IN, PRESENTATION PAGE

        return (<Segment inverted vertical padded='very' textAlign='center' style={this.segmentStyle}>
            <div style={this.divStyle}>
                <Icon name='pencil' size='massive' />
                <h1>Help people. Help science. Earn money.</h1>
                <Button basic animated color='yellow' size='big' as={Link} to='/login'>
                    <Button.Content visible>Get Started</Button.Content>
                    <Button.Content hidden>
                        <Icon name='right arrow' />
                    </Button.Content>
                </Button>
            </div>
        </Segment>);
    }
};

export default MainHeader;
