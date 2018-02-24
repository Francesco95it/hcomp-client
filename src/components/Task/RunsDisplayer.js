import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {Loader, Card, Button, Header} from 'semantic-ui-react'

export default class RunsDisplayer extends Component {

    render(){
        if (!this.props.runs) return (<Loader active inline='centered' />);
        if (this.props.runsError) return <Header color='red' size='small'>Error loading runs</Header>;
        const items = this.props.runs.map(run => {
            return {
                header: run.name,
                meta: run.description,
                description: run.introduction,
                extra: <Button name={run.id} as={Link} to={`/assignment/${run.id}`} color='green' floated='right' size='mini' content='Start!' icon='right arrow' labelPosition='right' />,
                fluid: true,
            }
        })
        return <Card.Group itemsPerRow={3} items={items} />
    }
}
