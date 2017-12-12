import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import '../class.css'

class LeaveClassWarningModal extends Component {
    render() {
        const {userFullNameLeave, classDetail, modalIsOpen, onSubmit} = this.props
        var modalTitle = 'Leave This Group?';
        return (
            <Modal open={modalIsOpen}
                   onClose={this.props.closeModal} little>
                <h2 className="title-modal">{modalTitle}</h2>
                <form className="form-horizontal" role="form">
                    <div className="form-group">
                        <div className="col-sm-12">
                            <label className="control-label">
                                {
                                    (userFullNameLeave) ? `Are you sure you want ${userFullNameLeave} to leave class ${classDetail.name}?`
                                        : `Are you sure you want to leave class ${classDetail.name}?`
                                }
                            </label>
                        </div>
                    </div>
                    <div className="modal-bottom clearfix">
                        <div className="pull-right">
                            <a href="#" className="btn btn-white" onClick={this.props.closeModal}>Cancel</a>
                            <a href="#" className="btn btn-primary"
                               onClick={() => onSubmit()}>
                                Leave Class
                            </a>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default LeaveClassWarningModal;