import React, {Component} from 'react'
import Modal from 'react-modal';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import '../class.css'

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

class LeaveClassWarningModal extends Component {
    render() {
        const {userFullNameLeave, userId, classDetail, modalIsOpen, onSubmit} = this.props
        var modalTitle = 'Leave This Group?';
        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStylesModal}
                contentLabel="Leave This Group?">
                <h2>{modalTitle}</h2>
                <a href="#" className="mm-popup__close"
                        data-toggle="tooltip" data-placement="bottom" data-original-title="Close Modal"
                        onClick={this.props.closeModal}>×
                </a>
                <form className="form-horizontal" role="form">
                    <div className="form-group">
                        <label className="control-label">
                            {
                                (userFullNameLeave) ? `Are you sure you want ${userFullNameLeave} to leave class ${classDetail.name}?`
                                    : `Are you sure you want to leave class ${classDetail.name}?`
                            }
                        </label>
                    </div>
                    <div className="modal-bottom clearfix">
                        <div className="pull-right">
                            <a href="#" className="btn btn-white" onClick={this.props.closeModal}>Cancel</a>
                            <a href="#" className="btn btn-primary"
                                    onClick={() => onSubmit(userId, classDetail)}>
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