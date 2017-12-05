import React, {Component} from 'react'
import Modal from 'react-modal';
import FileInput from '@ranyefet/react-file-input'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import '../event.css'
import {userConstants} from "../../../constants/userConstants";

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
            eventPhoto: '',
            title: '',
            location: '',
            start: new Date(),
            startAllDay: false,
            end: new Date(),
            endAllDay: false,
            description: ''
        }
        this.handleEventPhotoChanged = this.handleEventPhotoChanged.bind(this);
        this.handleRemoveEventPhoto = this.handleRemoveEventPhoto.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeStartTimeAllDay = this.handleChangeStartTimeAllDay.bind(this);
        this.handleChangeEndTimeAllDay = this.handleChangeEndTimeAllDay.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({
            start: new Date(e.format("YYYY-MM-DD HH:mm:ss"))
        })
    }

    handleChangeEndTime(e) {
        this.setState({
            end: new Date(e.format("YYYY-MM-DD HH:mm:ss"))
        })
    }

    handleChangeStartTimeAllDay(event) {
        this.setState({
            startAllDay: event.target.checked
        });
    }

    handleChangeEndTimeAllDay(event) {
        this.setState({
            endAllDay: event.target.checked
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)

        // const {classDetail, user, title, content, topic, members, isSchedule, scopeType, startTime, endTime } = this.state;
        // this.setState({submitted: true});
        // eventService.insertPost(classDetail.id, user.id, title, content, topic, members, isSchedule, scopeType, startTime, endTime)
        //     .then(
        //         this.props.dispatch(classActions.getPosts(classDetail.id))
        //     );
        //
        // const { history } = this.props
        // history.push(`/classes/${classDetail.id}`);
    }

    render() {
        const {uploadedPhoto, eventPhoto} = this.state
        const {classDetail, modalIsOpen} = this.props

        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                contentLabel="Create Event Modal">
                <h2>{renderModalTitle(classDetail)}</h2>
                <button className="mm-popup__close"
                        data-toggle="tooltip" data-placement="bottom" data-original-title="Close Modal"
                        onClick={this.props.closeModal}>×
                </button>
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
                                   onChange={this.handleChange}
                                   placeholder="Add a short, clear name"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Location</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="location" name="location" placeholder=""
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Start</label>
                        <div className='event-end-date col-sm-4'>
                            <Datetime timeFormat={false} inputFormat="DD/MM/YYYY" value={this.state.start}
                                      onChange={this.handleChangeStartTime}/>
                        </div>
                        {
                            !this.state.startAllDay &&
                            (
                                <div className='event-end-time col-sm-3'>
                                    <Datetime dateFormat={false} value={this.state.start}
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
                            <Datetime timeFormat={false} inputFormat="DD/MM/YYYY" value={this.state.end}
                                      onChange={this.handleChangeEndTime}/>
                        </div>
                        {
                            !this.state.endAllDay &&
                            (
                                <div className='event-end-time col-sm-3'>
                                    <Datetime dateFormat={false} value={this.state.end}
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
                                    <textarea className="form-control announcement" rows="4" name="description"
                                              placeholder="Tell people more about event"
                                              onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div className="modal-bottom clearfix">
                        <div className="pull-right">
                            <button className="btn btn-white" onClick={this.props.closeModal}>Cancel</button>
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default CreateEventModal;