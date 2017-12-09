import React, {Component} from 'react'
import {connect} from 'react-redux'
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

const renderModalTitle = (classDetail) => {
    var modalTitle = 'Create event';
    if (classDetail && classDetail.name) {
        modalTitle += " for " + classDetail.name;
    }
    return modalTitle;
}

class CreateEventModal extends Component {
    constructor() {
        super()
        this.state = {
            uploadedPhoto: false,
            eventPhoto: {},
            title: '',
            location: '',
            start: new Date(),
            startAllDay: false,
            end: new Date(),
            endAllDay: false,
            content: ''
        }
        this.handleEventPhotoChanged = this.handleEventPhotoChanged.bind(this);
        this.handleRemoveEventPhoto = this.handleRemoveEventPhoto.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeStartTimeAllDay = this.handleChangeStartTimeAllDay.bind(this);
        this.handleChangeEndTimeAllDay = this.handleChangeEndTimeAllDay.bind(this);
    }

    handleEventPhotoChanged = function (event) {
        console.log('Selected file:', event.target.files[0]);
        const file = event.target.files[0]
        this.setState({
            uploadedPhoto: true,
            eventPhoto: file
        })
    }

    handleRemoveEventPhoto() {
        this.setState({
            uploadedPhoto: false,
            eventPhoto: ''
        })
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleChangeStartTime(e) {
        if(this.state.startAllDay){
            this.setState({
                start: new Date(e.format("YYYY-MM-DD"))
            })
        } else {
            this.setState({
                start: new Date(e.format("YYYY-MM-DD HH:mm:ss"))
            })
        }
    }

    handleChangeEndTime(e) {
        if(this.state.endAllDay){
            this.setState({
                end: new Date(e.format("YYYY-MM-DD"))
            })
        } else {
            this.setState({
                end: new Date(e.format("YYYY-MM-DD HH:mm:ss"))
            })
        }
    }

    handleChangeStartTimeAllDay(event) {
        var startDate = this.state.start
        var startAllDay = event.target.checked
        this.setState({
            startAllDay: startAllDay,
        });
        if(startAllDay){
            this.setState({
                start: new Date(startDate.setHours(0,0,0,0))
            });
        }
    }

    handleChangeEndTimeAllDay(event) {
        var endDate = this.state.end
        var endAllDay = event.target.checked
        this.setState({
            endAllDay: endAllDay,
        });
        if(endAllDay){
            this.setState({
                end: new Date(endDate.setHours(0,0,0,0))
            });
        }
    }

    render() {
        const {uploadedPhoto, eventPhoto, title, location, start, end, startAllDay, endAllDay, content } = this.state
        const {classDetail, modalIsOpen, onSubmit} = this.props

        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Create Event Modal">
                <h2>{renderModalTitle(classDetail)}</h2>
                <a href='#' className="mm-popup__close"
                        data-toggle="tooltip" data-placement="bottom" data-original-title="Close Modal"
                        onClick={this.props.closeModal}>×
                </a>
                <form className="create-event-modal form-horizontal" role="form">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Event Photo</label>
                        <div className="col-sm-9">
                            {
                                !uploadedPhoto ?
                                    (
                                        <div className="event-photo-upload clearfix">
                                            <FileInput name="coverPhoto" onChange={this.handleEventPhotoChanged}>
                                                <div className="upload-content">
                                                    <i className="fa fa-camera"></i>
                                                    <span>Upload Photo</span>
                                                </div>
                                            </FileInput>
                                        </div>
                                    ) :
                                    (
                                        <div className="event-photo-preview">
                                            <img src={URL.createObjectURL(eventPhoto)}/>

                                            <button className="mm-popup__close btn-remove-event-photo"
                                                    data-toggle="tooltip" data-placement="top"
                                                    data-original-title="Remove event photo"
                                                    onClick={this.handleRemoveEventPhoto}>×
                                            </button>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Title</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="title" name="title"
                                   value={title}
                                   onChange={this.handleChange}
                                   placeholder="Add a short, clear name"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Location</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="location" name="location" placeholder=""
                                   value={location}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Start</label>
                        <div className='event-end-date col-sm-4'>
                            <Datetime timeFormat={false} inputFormat="DD/MM/YYYY" value={start}
                                      onChange={this.handleChangeStartTime}/>
                        </div>
                        {
                            !startAllDay &&
                            (
                                <div className='event-end-time col-sm-3'>
                                    <Datetime dateFormat={false} value={start}
                                              onChange={this.handleChangeStartTime}/>
                                </div>
                            )
                        }
                        <div className="col-sm-2">
                            <div className="controls">
                                <label className="checkbox-inline">
                                    <input type="checkbox" onChange={this.handleChangeStartTimeAllDay}/>
                                    All Day
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">End</label>
                        <div className='event-end-date col-sm-4'>
                            <Datetime timeFormat={false} inputFormat="DD/MM/YYYY" value={end}
                                      onChange={this.handleChangeEndTime}/>
                        </div>
                        {
                            !endAllDay &&
                            (
                                <div className='event-end-time col-sm-3'>
                                    <Datetime dateFormat={false} value={end}
                                              onChange={this.handleChangeEndTime}/>
                                </div>
                            )
                        }
                        <div className="col-sm-2">
                            <div className="controls">
                                <label className="checkbox-inline">
                                    <input type="checkbox" onChange={this.handleChangeEndTimeAllDay}/>
                                    All Day
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Description</label>
                        <div className="col-sm-9">
                                    <textarea className="form-control announcement" rows="4" name="content"
                                              value={content}
                                              placeholder="Tell people more about event"
                                              onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div className="modal-bottom clearfix">
                        <div className="pull-right">
                            <a href='#' className="btn btn-white" onClick={this.props.closeModal}>Cancel</a>
                            <a href='#' className="btn btn-primary"
                                    onClick={() => onSubmit(eventPhoto, title, location, content, start, end)}>Create</a>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default CreateEventModal;