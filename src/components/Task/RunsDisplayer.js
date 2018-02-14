import React, {Component} from 'react'

import {Loader, Card, Button} from 'semantic-ui-react'

export default class RunsDisplayer extends Component {

    render(){
        if (!this.props.runs) return (<Loader active inline='centered' />);

        const items = this.props.runs.map(run => {
            return {
                header: run.name,
                meta: run.description,
                description: run.introduction,
                extra: <Button name={run.id} color='green' floated='right' size='mini' content='Start!' icon='right arrow' labelPosition='right' onClick={(e) => console.log(e.target.name)} />,
                fluid: true,
            }
        })
        return <Card.Group itemsPerRow={3} items={items} />
    }
}
