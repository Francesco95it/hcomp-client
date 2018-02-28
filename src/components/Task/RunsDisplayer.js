import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {Loader, Card, Button, Header} from 'semantic-ui-react'

export default class RunsDisplayer extends Component {

    render(){
        if (!this.props.runs) return (<Loader active inline='centered' />);
        if (this.props.runsError) return <Header color='red' size='small'>Error loading runs</Header>;
        const items = this.props.runs.filter(run => run.name).map(run => {
            let extra = <Button name={run.id} as={Link} to={`/assignment?rid=${run.id}&tid=${run.id_task}`} color='green' floated='right' size='mini' content='Start!' icon='right arrow' labelPosition='right' />;
            if (!this.props.authenticated) extra = <Button name={run.id} as={Link} to={`/login?redirect=task&id=${run.id_task}`} color='green' floated='right' size='mini' content='Login and start!' icon='right arrow' labelPosition='right' />
            return {
                header: run.name,
                meta: run.description,
                description: run.introduction,
                extra: extra,
                fluid: true,
            }
        })
        return <Card.Group itemsPerRow={3} items={items} />
    }
}
