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

    componentWillMount() {
        const {classId} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
        }
    }

    render() {
        const {classDetail, classId, topics} = this.props
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
    const {classDetail, topics} = state.classes
    return {
        classId,
        classDetail,
        topics,
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassManagePage));