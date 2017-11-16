import React, {Component} from 'react'

class ClassTopics extends Component {

    renderTopic(topic, index) {
        return (
            <div key={index} className="topic clearfix">
                <a href="#" className="topic-full-name">{topic.fullName}</a>
                <div className="dropdown pull-right">
                    <a data-toggle="dropdown" className="btn dropdown-toggle" href="javascript:;">
                        <span className="fa fa-ellipsis-v"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                    </a>
                    <ul role="menu" className="dropdown-menu">
                        <li><a href="javascript:;">Rename</a></li>
                        <li><a href="javascript:;">Delete</a></li>
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        const {topics} = this.props
        return (
            <div className="class-topics clearfix">
                <h3>Topics</h3>
                {
                    topics && topics.length > 0 &&
                    topics.map((topic, index) =>
                        this.renderTopic(topic, index))
                }
                <div className="class-add-topic">
                    <button className="btn btn-default pull-right">
                        Add topic
                    </button>
                </div>
            </div>
        )
    }
}

export default ClassTopics;