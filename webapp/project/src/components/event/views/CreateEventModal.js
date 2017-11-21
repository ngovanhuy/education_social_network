import React, {Component} from 'react'
import Modal from 'react-modal';
import FileInput from '@ranyefet/react-file-input'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import '../event.css'

const customStyles = {
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
        top: '40px',
        left: '25%',
        right: '25%',
        bottom: '30px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '10px 20px'
    }
};

class CreateEventModal extends Component{

    handleEventPhotoChanged = function (event) {
        console.log('Selected file:', event.target.files[0]);
    }

    render(){
        const {classDetail, modalIsOpen} = this.props
        var modalTitle = 'Create event';
        if(classDetail && classDetail.fullName){
            modalTitle += " for " + classDetail.fullName;
        }
        return(
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Create Event Modal"

            >
                <h2>{modalTitle}</h2>
                <button className="mm-popup__close" onClick={this.props.closeModal}>×</button>
                <form className="create-event-modal form-horizontal" role="form">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Event Photo</label>
                        <div className="col-sm-9 event-photo-upload clearfix">
                            <div>
                                <FileInput name="coverPhoto" onChange={this.handleEventPhotoChanged}>
                                    <div className="upload-content">
                                        <i className="fa fa-camera"></i>
                                        <span>Upload Photo</span>
                                    </div>
                                </FileInput>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Event Name</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="eventName"
                                   placeholder="Add a short, clear name"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Location</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="location" placeholder=""/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Start</label>
                        <div className='event-end-date col-sm-4'>
                            <Datetime timeFormat={false} inputFormat="DD/MM/YYYY" defaultValue={new Date()}/>
                        </div>
                        <div className='event-end-time col-sm-3'>
                            <Datetime dateFormat={false} defaultValue={new Date()}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">End</label>
                        <div className='event-end-date col-sm-4'>
                            <Datetime timeFormat={false} inputFormat="DD/MM/YYYY" defaultValue={new Date()}/>
                        </div>
                        <div className='event-end-time col-sm-3'>
                            <Datetime dateFormat={false} defaultValue={new Date()}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Description</label>
                        <div className="col-sm-9">
                                    <textarea className="form-control announcement" rows="4"
                                              placeholder="Tell people more about event"></textarea>
                        </div>
                    </div>
                    <div className="modal-bottom clearfix">
                        <div className="pull-right">
                            <button className="btn btn-white" onClick={this.props.closeModal}>Cancel</button>
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default CreateEventModal;