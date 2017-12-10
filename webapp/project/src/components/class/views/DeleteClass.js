import React, {Component} from 'react'
import {connect} from "react-redux";
import {classService} from "../../../services";
import {history} from "../../../helpers/history";
import {classActions} from "../../../actions";
import Modal from 'react-modal';

const customStylesModal = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position: 'absolute',
        top: '25%',
        left: '25%',
        right: '25%',
        bottom: 'unset',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    }
};

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
                    <Modal
                        isOpen={this.state.showModalWarning}
                        onRequestClose={this.closeModal}
                        style={customStylesModal}
                        contentLabel="Delete This Class?">
                        <h2>Delete This Group?</h2>
                        <a href="#" className="mm-popup__close"
                           data-toggle="tooltip" data-placement="bottom" data-original-title="Close Modal"
                           onClick={this.closeModal}>×
                        </a>
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