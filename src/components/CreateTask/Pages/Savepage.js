import React, {Component} from 'react'

import {Segment, Header} from 'semantic-ui-react'

export default class Savepage extends Component {

    componentDidMount(){
        this.props.removeBlock();
        setTimeout(()=>{
            const task = this.props.task;
            const newRuns = this.props.task.runs.map(run => { return {
                id: run.id,
                title: run.title,
                description: run.description,
                introduction: run.introduction,
                type: run.type.type,
                question: run.type.question,
                index: run.index
            }});
            const newCollaborators = this.props.task.collaborators.list.map(collaborator => {return collaborator.id});
            const prepTask = {
                id: task.id,
                title: task.general.title,
                description: task.general.title,
                introduction: task.general.introduction,
                runs: newRuns,
                collaborators: newCollaborators,
                tutorial: task.tutorial,
                is_active: task.status
            }
            console.log(prepTask);
            this.props.uploadTask(prepTask);
        }, 500);
    }

    render(){
        if(!this.props.allTask.uploaded) return <Segment loading style={{minHeight: '200px'}} />
        if(this.props.allTask.error) return <Header color='red'>An error occurred. Your task could not be saved.</Header>
        return <Header color='green'>Task saved</Header>
    }
}
