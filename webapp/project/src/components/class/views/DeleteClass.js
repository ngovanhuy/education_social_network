import React, {Component} from 'react'
import {connect} from "react-redux";
import {classActions} from "../../../actions";
import Modal from 'react-responsive-modal';

class DeleteClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModalWarning: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.deleteClass = this.deleteClass.bind(this)
    }

    openModal() {
        this.setState({showModalWarning: true});
    }

    closeModal() {
        this.setState({showModalWarning: false});
    }

    deleteClass(classId, userId) {
        this.props.dispatch(classActions.deleteClass(classId, userId))
    }

    render() {
        const {classDetail, currentUser} = this.props
        return (
            <div className="ui-box has-border-radius">
                <div className="ui-box-title">
                    <span>Delete This Class</span>
                </div>
                <div className="ui-box-content">
                    <a className="btn btn-danger" onClick={() => this.openModal()}>Confirm delete</a>
                    <Modal open={this.state.showModalWarning}
                           onClose={this.closeModal} little>
                        <h2 className="title-modal">Delete This Class?</h2>
                        <form className="form-horizontal" role="form">
                            <div className="form-group">
                                <div className="col-sm-12">
                                    <label className="control-label">
                                        {
                                            `Are you sure you want to delete class ${classDetail.name}?`
                                        }
                                    </label>
                                </div>
                            </div>
                            <div className="modal-bottom clearfix">
                                <div className="pull-right">
                                    <a href="#" className="btn btn-white" onClick={this.closeModal}>Cancel</a>
                                    <a href="#" className="btn btn-primary"
                                       onClick={() => this.deleteClass(classDetail.id, currentUser.id)}>
                                        Delete This Class
                                    </a>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const {classDetail} = state.classes
    const {currentUser} = state.authentication
    return {
        classDetail,
        currentUser
    }
}

export default connect(mapStateToProps, null)(DeleteClass);