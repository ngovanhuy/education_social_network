import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Classes from "../../components/class/Classes";
import CreateClassModal from "../../components/class/views/CreateClassModal";
import {userActions, classActions} from "../../actions";
import {classConstants} from "../../constants/classConstants";

const updateStatusOfClass = (classDetail, classUserJoined, classUserRequest) => {
    var classNewDetail = {
        ...classDetail,
        statusOfCurrentUser: classConstants.STATUS_OF_USER_IN_CLASS.NOT_RELATE
    }

    var classDetailBelongJoined = (classUserJoined && classUserJoined.length > 0) ?
        classUserJoined.filter(function (element) {
            return element._id == classDetail.id
        }) : [];
    if (classDetailBelongJoined && classDetailBelongJoined.length > 0) {
        classNewDetail.statusOfCurrentUser = classConstants.STATUS_OF_USER_IN_CLASS.JOINED
    }

    var classDetailBelongRequest = (classUserRequest && classUserRequest.length > 0) ?
        classUserRequest.filter(function (element) {
            return element._id == classDetail.id
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
        const {user} = this.props
        if (user) {
            this.props.dispatch(userActions.getClassJoined(user.id));
            this.props.dispatch(userActions.getClassRequest(user.id));
        }
    }

    handleCreateClass = (className, membersInvited) => {
        this.setState({modalIsOpen: false});
        this.props.dispatch(classActions.insert(className));
    }


    render() {
        const {classes, classUserJoined, classUserRequest, user} = this.props
        var classHasStatus = updateStatusOfClasses(classes, classUserJoined, classUserRequest);
        return (
            <div>
                <div className="container">
                    <div className="classes clearfix">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-12">
                                    <div className="classes-header clearfix">
                                        <span className="current">Classes</span>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                {
                                    user && user.id &&
                                    (
                                        <Classes classes={classHasStatus} userId={user.id}/>
                                    )
                                }
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
    const {user, classUserJoined, classUserRequest} = state.authentication
    return {
        classes,
        user,
        classUserJoined,
        classUserRequest
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassesPage));