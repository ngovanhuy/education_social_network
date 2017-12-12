import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Classes from "../../components/class/Classes";
import CreateClassModal from "../../components/class/views/CreateClassModal";
import {userActions, classActions} from "../../actions";
import {classConstants} from "../../constants";
import {userUtils} from "../../utils";

const updateStatusOfClass = (classDetail, classUserJoined, classUserRequest) => {
    var classNewDetail = {
        ...classDetail,
        statusOfCurrentUser: classConstants.STATUS_OF_USER_IN_CLASS.NOT_RELATE
    }

    var classDetailBelongJoined = (classUserJoined && classUserJoined.length > 0) ?
        classUserJoined.filter(function (element) {
            return element.id == classDetail.id
        }) : [];
    if (classDetailBelongJoined && classDetailBelongJoined.length > 0) {
        classNewDetail.statusOfCurrentUser = classConstants.STATUS_OF_USER_IN_CLASS.JOINED
    }

    var classDetailBelongRequest = (classUserRequest && classUserRequest.length > 0) ?
        classUserRequest.filter(function (element) {
            return element.id == classDetail.id
        }) : [];
    if (classDetailBelongRequest && classDetailBelongRequest.length > 0) {
        classNewDetail.statusOfCurrentUser = classConstants.STATUS_OF_USER_IN_CLASS.SEND_REQUEST_JOIN
    }
    return classNewDetail
}

const updateStatusOfClasses = (classes, classUserJoined, classUserRequest) => {
    var classHasStatus = classes.map((classDetail) =>
        updateStatusOfClass(classDetail, classUserJoined, classUserRequest)
    )
    return classHasStatus;
}

class ClassesPage extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentWillMount() {
        this.props.dispatch(classActions.getAll());
        const {currentUser} = this.props
        var currentUserId = 0
        if (currentUser) {
            currentUserId = currentUser.id
        } else {
            currentUserId = userUtils.getCurrentUserId();
        }
        this.props.dispatch(userActions.getClassJoined(currentUserId));
        this.props.dispatch(userActions.getClassRequest(currentUserId));
    }

    handleCreateClass = (className, membersInvited) => {
        const {currentUser} = this.props
        this.setState({modalIsOpen: false});
        this.props.dispatch(classActions.insert(currentUser.id, className, membersInvited));
    }

    render() {
        const {classes, classUserJoined, classUserRequest, currentUser} = this.props
        const isTeacher = userUtils.checkIsTeacher(currentUser)
        var classHasStatus = updateStatusOfClasses(classes, classUserJoined, classUserRequest);
        return (
            <div>
                <div className="container">
                    <div className="classes clearfix">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-12">
                                    <div className="classes-header has-border-radius clearfix">
                                        <span className="current">Classes</span>
                                        {
                                            isTeacher &&
                                            (
                                                <div className="pull-right">
                                                    <a className="btn btn-primary btn-create-group" href="javascript:;"
                                                       onClick={this.openModal}>
                                                        <i className="fa fa-plus"></i>
                                                        Create Class
                                                    </a>
                                                    <CreateClassModal modalIsOpen={this.state.modalIsOpen}
                                                                      closeModal={this.closeModal}
                                                                      onSubmit={this.handleCreateClass}/>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <Classes classes={classHasStatus}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classes = state.classes.items
    const {currentUser} = state.authentication
    const {classUserJoined, classUserRequest} = state.users
    return {
        currentUser,
        classes,
        classUserJoined,
        classUserRequest,
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassesPage));