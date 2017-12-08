import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ClassAddTopicModal from "./ClassAddTopicModal";
import {classActions} from "../../../actions";
import {classService} from "../../../services";

class ClassTopics extends Component {
    constructor() {
        super()
        this.state = {
            modalAddTopic: false
        }

        this.openModalAddTopic = this.openModalAddTopic.bind(this);
        this.closeModalAddTopic = this.closeModalAddTopic.bind(this);
        this.handleAddTopic = this.handleAddTopic.bind(this);
    }

    openModalAddTopic() {
        this.setState({modalAddTopic: true});
    }

    closeModalAddTopic() {
        this.setState({modalAddTopic: false});
    }

    handleAddTopic = (classId, topicName) => {
        this.setState({modalAddTopic: false});
        classService.insertTopic(classId, topicName)
            .then(
                this.props.dispatch(classActions.getTopics(classId))
            );
    }

    renderTopic(topic, index, classId, currentTopic) {
        return (
            <div key={index} className={(currentTopic && currentTopic==topic) ? 'topic clearfix current' : 'topic clearfix'}>
                <Link to={`/classes/${classId}/topics/${topic}`}
                      className={'topic-full-name'}>
                    {topic}
                </Link>
                {/*<div className="dropdown pull-right">*/}
                    {/*<a data-toggle="dropdown" className="btn dropdown-toggle" href="javascript:;">*/}
                        {/*<span className="fa fa-ellipsis-v"></span>*/}
                        {/*<span className="sr-only">Toggle Dropdown</span>*/}
                    {/*</a>*/}
                    {/*<ul role="menu" className="dropdown-menu">*/}
                        {/*<li><a href="javascript:;">Rename</a></li>*/}
                        {/*<li><a href="javascript:;">Delete</a></li>*/}
                    {/*</ul>*/}
                {/*</div>*/}
            </div>
        )
    }

    render() {
        const {topics, classId, currentTopic} = this.props
        return (
            <div className="class-topics has-border-radius clearfix">
                <h3>Topics</h3>
                {
                    topics && topics.length > 0 &&
                    topics.map((topic, index) =>
                        this.renderTopic(topic, index, classId, currentTopic))
                }
                <div className="class-add-topic">
                    <button className="btn btn-white pull-right" onClick={this.openModalAddTopic}>
                        Add topic
                    </button>
                    <ClassAddTopicModal classId={classId}
                                        modalIsOpen={this.state.modalAddTopic}
                                        closeModal={this.closeModalAddTopic}
                                        onSubmit={this.handleAddTopic}/>
                </div>
            </div>
        )
    }
}

export default connect(null)(ClassTopics);