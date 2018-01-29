import React, {Component} from 'react'

import {Form, Input, TextArea, Grid, Header} from 'semantic-ui-react'

export default class General extends Component {

    inputStyle={
        maxHeight: '30px'
    }


    render(){
        return (
            <Form>
                <Grid>
                    <Grid.Column stretched width={8}>
                        <Header content='Project title' size='small' sub/>
                        <Input type="text" value={this.props.title} onChange={this.props.titleChanged} style={this.inputStyle}/>
                        <p>Set your project title</p>
                    </Grid.Column>
                    <Grid.Column stretched width={6}>
                        <Header content='Avatar' size='small' sub/>
                        <Input type="text" value="I'll become an upload box" style={this.inputStyle}/>
                        <p>The avatar represents your project with an image</p>
                    </Grid.Column>
                    <Grid.Column stretched width={16}>
                        <Header content='Description' size='small' sub/>
                        <Input type="text" style={this.inputStyle}/>
                        <p>Describe your project in one line</p>
                    </Grid.Column>
                    <Grid.Column stretched width={16}>
                        <Header content='Introduction' size='small' sub/>
                        <TextArea autoHeight />
                        <p>Explain interested people what your project is and why should they help you</p>
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}
