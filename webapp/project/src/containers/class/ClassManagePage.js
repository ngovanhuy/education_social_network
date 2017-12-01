import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import ClassManage from "../../components/class/ClassManage";
import queryString from "query-string"
import {classActions} from "../../actions/classActions";

class ClassManagePage extends Component {
    constructor() {
        super()
        this.state = {
            currentViewLink: "memberRequests",
        }
    }

    static defaultProps = {
        topics: [{
            fullName: 'Task 1',
            topicName: 'task_1',
        }, {
            fullName: 'Task 2',
            topicName: 'task_2',
        }, {
            fullName: 'Task 3',
            topicName: 'task_3',
        }]
    }

    render() {
        const {classDetail, topics, classId} = this.props
        const queryStringParsed = queryString.parse(this.props.location.search)
        const currentViewLink = (queryStringParsed && queryStringParsed.currentViewLink) ? queryStringParsed.currentViewLink : 'memberRequests'
        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="manage_class"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <ClassManage currentViewLink={currentViewLink} classId={classId}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail} = state.classes
    return {
        classId,
        classDetail
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassManagePage));