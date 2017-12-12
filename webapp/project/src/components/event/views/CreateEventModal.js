import React, {Component} from 'react'
import Modal from 'react-modal';
import FileInput from '@ranyefet/react-file-input'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import '../event.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {eventConstants} from "../../../constants";

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
const {FREQUENCY} = eventConstants

const renderModalTitle = (classDetail) => {
    var modalTitle = 'Create event';
    if (classDetail && classDetail.name) {
        modalTitle += " for " + classDetail.name;
    }
    return modalTitle;
}

const fillFrequencyForSelectTag = () => {
    var frequencyList = [
        {
            value: FREQUENCY.ONCE,
            label: "Occurs Once"
        },
        {
            value: FREQUENCY.DAILY,
            label: "Daily"
        },
        {
            value: FREQUENCY.WEEKLY,
            label: "Weekly"
        }
    ]
    return frequencyList;
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
            content: '',
            frequencyValue: 'once',
            frequencies: {
                daily: {
                    startDate: new Date(),
                    endDate: Datetime.moment(new Date()).add(1, 'days').toDate(),
                    startTime: new Date(),
                    endTime: new Date()
                },
                weekly: {
                    days: [],
                    daysOption: [
                        { value: 'Sunday', label: 'Sunday' },
                        { value: 'Monday', label: 'Monday' },
                        { value: 'Tuesday', label: 'Tuesday' },
                        { value: 'Wednesday', label: 'Wednesday' },
                        { value: 'Thursday', label: 'Thursday' },
                        { value: 'Friday', label: 'Friday' },
                        { value: 'Saturday', label: 'Saturday' },
                    ],
                    startDate: new Date(),
                    endDate: Datetime.moment(new Date()).add(1, 'weeks').toDate(),
                    startTime: new Date(),
                    endTime: new Date()
                }
            }
        }
        this.handleEventPhotoChanged = this.handleEventPhotoChanged.bind(this);
        this.handleRemoveEventPhoto = this.handleRemoveEventPhoto.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeStartTimeAllDay = this.handleChangeStartTimeAllDay.bind(this);
        this.handleChangeEndTimeAllDay = this.handleChangeEndTimeAllDay.bind(this);
        this.handleChangeEndDateFrequencyDaily = this.handleChangeEndDateFrequencyDaily.bind(this);
        this.handleChangeStartDateFrequencyDaily = this.handleChangeStartDateFrequencyDaily.bind(this);
        this.handleChangeEndDateFrequencyWeekly = this.handleChangeEndDateFrequencyWeekly.bind(this);
        this.handleChangeStartDateFrequencyWeekly = this.handleChangeStartDateFrequencyWeekly.bind(this);
        this.handleChangeEndTimeFrequencyDaily = this.handleChangeEndTimeFrequencyDaily.bind(this);
        this.handleChangeStartTimeFrequencyDaily = this.handleChangeStartTimeFrequencyDaily.bind(this);
        this.handleChangeEndTimeFrequencyWeekly = this.handleChangeEndTimeFrequencyWeekly.bind(this);
        this.handleChangeStartTimeFrequencyWeekly = this.handleChangeStartTimeFrequencyWeekly.bind(this);
        this.onChangeWeeklyDaysOption = this.onChangeWeeklyDaysOption.bind(this);
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
        const start = new Date(e.format("YYYY-MM-DD"))
        var {end} = this.state
        if (start.getTime() > end.getTime()) {
            end = start
        }
        if (this.state.startAllDay) {
            this.setState({
                start: new Date(e.format("YYYY-MM-DD")),
                end: end
            })
        } else {
            this.setState({
                start: new Date(e.format("YYYY-MM-DD HH:mm:ss")),
                end: end
            })
        }
    }

    handleChangeEndTime(e) {
        if (this.state.endAllDay) {
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
        if (startAllDay) {
            this.setState({
                start: new Date(startDate.setHours(0, 0, 0, 0))
            });
        }
    }

    handleChangeEndTimeAllDay(event) {
        var endDate = this.state.end
        var endAllDay = event.target.checked
        this.setState({
            endAllDay: endAllDay,
        });
        if (endAllDay) {
            this.setState({
                end: new Date(endDate.setHours(0, 0, 0, 0))
            });
        }
    }

    handleChangeStartDateFrequencyWeekly(e) {
        const startDate = new Date(e.format("YYYY-MM-DD"))
        var {endDate} = this.state.frequencies.weekly
        if(Datetime.moment(endDate.toLocaleDateString()).isBefore(Datetime.moment(startDate.toLocaleDateString()).add(1, 'weeks'))){
            endDate = Datetime.moment(startDate).add(1, 'weeks').toDate()
        }
        this.setState({
            frequencies: {
                ...this.state.frequencies,
                weekly: {
                    ...this.state.frequencies.weekly,
                    startDate: new Date(e.format("YYYY-MM-DD")),
                    endDate: endDate
                }
            }
        })
    }

    handleChangeEndDateFrequencyWeekly(e) {
        this.setState({
            frequencies: {
                ...this.state.frequencies,
                weekly: {
                    ...this.state.frequencies.weekly,
                    endDate: new Date(e.format("YYYY-MM-DD"))
                }
            }
        })
    }

    handleChangeStartDateFrequencyDaily(e) {
        const startDate = new Date(e.format("YYYY-MM-DD"))
        var {endDate} = this.state.frequencies.daily
        if(Datetime.moment(endDate.toLocaleDateString()).isBefore(Datetime.moment(startDate.toLocaleDateString()).add(1, 'days'))){
            endDate = Datetime.moment(startDate).add(1, 'days').toDate()
        }
        this.setState({
            frequencies: {
                ...this.state.frequencies,
                daily: {
                    ...this.state.frequencies.daily,
                    startDate: new Date(e.format("YYYY-MM-DD")),
                    endDate: endDate
                }
            }
        })
    }

    handleChangeEndDateFrequencyDaily(e) {
        this.setState({
            frequencies: {
                ...this.state.frequencies,
                daily: {
                    ...this.state.frequencies.daily,
                    endDate: new Date(e.format("YYYY-MM-DD"))
                }
            }
        })
    }

    handleChangeStartTimeFrequencyWeekly(e) {
        this.setState({
            frequencies: {
                ...this.state.frequencies,
                weekly: {
                    ...this.state.frequencies.weekly,
                    startTime: new Date(e.format("YYYY-MM-DD HH:mm:ss"))
                }
            }
        })
    }

    handleChangeEndTimeFrequencyWeekly(e) {
        this.setState({
            frequencies: {
                ...this.state.frequencies,
                weekly: {
                    ...this.state.frequencies.weekly,
                    endTime: new Date(e.format("YYYY-MM-DD HH:mm:ss"))
                }
            }
        })
    }

    handleChangeStartTimeFrequencyDaily(e) {
        this.setState({
            frequencies: {
                ...this.state.frequencies,
                daily: {
                    ...this.state.frequencies.daily,
                    startTime: new Date(e.format("YYYY-MM-DD HH:mm:ss"))
                }
            }
        })
    }

    handleChangeEndTimeFrequencyDaily(e) {
        this.setState({
            frequencies: {
                ...this.state.frequencies,
                daily: {
                    ...this.state.frequencies.daily,
                    endTime: new Date(e.format("YYYY-MM-DD HH:mm:ss"))
                }
            }
        })
    }

    handleChangeFrequency = (frequency) => {
        this.setState({
            frequencyValue: frequency ? frequency.value : FREQUENCY.ONCE
        })
    }

    onChangeWeeklyDaysOption(value) {
        this.setState({
            frequencies: {
                ...this.state.frequencies,
                weekly: {
                    ...this.state.frequencies.weekly,
                    days: value,
                }
            }
        });
    }

    render() {
        const {uploadedPhoto, eventPhoto, title, location, start, end, startAllDay, endAllDay, content, frequencyValue, frequencies} = this.state
        const {classDetail, modalIsOpen, onSubmit} = this.props
        const frequencyList = fillFrequencyForSelectTag()

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
                        <label className="col-sm-3 control-label">Frequency</label>
                        <div className="col-sm-9">
                            <Select name="frequency"
                                    value={frequencyValue}
                                    options={frequencyList}
                                    onChange={this.handleChangeFrequency}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-9 col-sm-offset-3">
                            {
                                frequencyValue == FREQUENCY.ONCE &&
                                <div className="frequency-once">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Start</label>
                                        <div className='event-end-date col-sm-4'>
                                            <Datetime inputProps={{readOnly:true}} timeFormat={false} inputFormat="DD/MM/YYYY" value={start}
                                                      onChange={this.handleChangeStartTime}/>
                                        </div>
                                        {
                                            !startAllDay &&
                                            (
                                                <div className='event-end-time col-sm-3'>
                                                    <Datetime inputProps={{readOnly:true}} dateFormat={false} value={start}
                                                              onChange={this.handleChangeStartTime}/>
                                                </div>
                                            )
                                        }
                                        <div className="col-sm-3">
                                            <div className="controls">
                                                <label className="checkbox-inline">
                                                    <input type="checkbox" onChange={this.handleChangeStartTimeAllDay}/>
                                                    All Day
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">End</label>
                                        <div className='event-end-date col-sm-4'>
                                            <Datetime inputProps={{readOnly:true}} timeFormat={false} inputFormat="DD/MM/YYYY" value={end}
                                                      onChange={this.handleChangeEndTime}
                                                      isValidDate={(current) => {
                                                          return current.isAfter(Datetime.moment(start).subtract(1, 'days'));
                                                      }}/>
                                        </div>
                                        {
                                            !endAllDay &&
                                            (
                                                <div className='event-end-time col-sm-3'>
                                                    <Datetime inputProps={{readOnly:true}} dateFormat={false} value={end}
                                                              onChange={this.handleChangeEndTime}/>
                                                </div>
                                            )
                                        }
                                        <div className="col-sm-3">
                                            <div className="controls">
                                                <label className="checkbox-inline">
                                                    <input type="checkbox" onChange={this.handleChangeEndTimeAllDay}/>
                                                    All Day
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                frequencyValue == FREQUENCY.DAILY &&
                                <div className="frequency-daily">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Start</label>
                                        <div className='col-sm-4'>
                                            <Datetime inputProps={{readOnly:true}} timeFormat={false} inputFormat="DD/MM/YYYY"
                                                      value={frequencies.daily.startDate}
                                                      onChange={this.handleChangeStartDateFrequencyDaily}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">End</label>
                                        <div className='col-sm-4'>
                                            <Datetime inputProps={{readOnly:true}} timeFormat={false} inputFormat="DD/MM/YYYY"
                                                      value={frequencies.daily.endDate}
                                                      onChange={this.handleChangeEndDateFrequencyDaily}
                                                      isValidDate={(current) => {
                                                          return current.isAfter(Datetime.moment(frequencies.daily.startDate));
                                                      }}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Time</label>
                                        <div className='col-sm-3'>
                                            <Datetime inputProps={{readOnly:true}} dateFormat={false}
                                                      value={frequencies.daily.startTime}
                                                      onChange={this.handleChangeStartTimeFrequencyDaily}/>
                                        </div>
                                        <div className='col-sm-3'>
                                            <Datetime inputProps={{readOnly:true}} dateFormat={false}
                                                      value={frequencies.daily.endTime}
                                                      onChange={this.handleChangeEndTimeFrequencyDaily}/>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                frequencyValue == FREQUENCY.WEEKLY &&
                                <div className="frequency-weekly">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Day</label>
                                        <div className='col-sm-10'>
                                            <div className="frequency-weekly-days-select">
                                                {/*<div className="day-select">*/}
                                                    {/*<label>*/}
                                                        {/*<div>*/}
                                                            {/*<input type="checkbox" className="check_day"/>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="day-value">Sun</div>*/}
                                                    {/*</label>*/}
                                                {/*</div>*/}
                                                {/*<div className="day-select">*/}
                                                    {/*<label>*/}
                                                        {/*<div><input type="checkbox" className="check_day"/></div>*/}
                                                        {/*<div className="day-value">Mon</div>*/}
                                                    {/*</label>*/}
                                                {/*</div>*/}
                                                {/*<div className="day-select">*/}
                                                    {/*<label>*/}
                                                        {/*<div><input type="checkbox" className="check_day"/></div>*/}
                                                        {/*<div className="day-value">Tue</div>*/}
                                                    {/*</label>*/}
                                                {/*</div>*/}
                                                {/*<div className="day-select">*/}
                                                    {/*<label>*/}
                                                        {/*<div><input type="checkbox" className="check_day"/></div>*/}
                                                        {/*<div className="day-value">Wed</div>*/}
                                                    {/*</label>*/}
                                                {/*</div>*/}
                                                {/*<div className="day-select">*/}
                                                    {/*<label>*/}
                                                        {/*<div><input type="checkbox" className="check_day"/></div>*/}
                                                        {/*<div className="day-value">Thu</div>*/}
                                                    {/*</label>*/}
                                                {/*</div>*/}
                                                {/*<div className="day-select">*/}
                                                    {/*<label>*/}
                                                        {/*<div><input type="checkbox" className="check_day"/></div>*/}
                                                        {/*<div className="day-value">Fri</div>*/}
                                                    {/*</label>*/}
                                                {/*</div>*/}
                                                {/*<div className="day-select">*/}
                                                    {/*<label>*/}
                                                        {/*<div><input type="checkbox" className="check_day"/></div>*/}
                                                        {/*<div className="day-value">Sat</div>*/}
                                                    {/*</label>*/}
                                                {/*</div>*/}
                                                <Select
                                                    multi={true}
                                                    onChange={this.onChangeWeeklyDaysOption}
                                                    options={frequencies.weekly.daysOption}
                                                    simpleValue
                                                    value={frequencies.weekly.days}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Start</label>
                                        <div className='col-sm-4'>
                                            <Datetime inputProps={{readOnly:true}} timeFormat={false} inputFormat="DD/MM/YYYY"
                                                      value={frequencies.weekly.startDate}
                                                      onChange={this.handleChangeStartDateFrequencyWeekly}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">End</label>
                                        <div className='col-sm-4'>
                                            <Datetime inputProps={{readOnly:true}} timeFormat={false} inputFormat="DD/MM/YYYY"
                                                      value={frequencies.weekly.endDate}
                                                      onChange={this.handleChangeEndDateFrequencyWeekly}
                                                      isValidDate={(current) => {
                                                          return current.isAfter(Datetime.moment(frequencies.weekly.startDate).add(6, 'days'));
                                                      }}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Time</label>
                                        <div className='col-sm-3'>
                                            <Datetime inputProps={{readOnly:true}} dateFormat={false}
                                                      value={frequencies.weekly.startTime}
                                                      onChange={this.handleChangeStartTimeFrequencyWeekly}/>
                                        </div>
                                        <div className='col-sm-3'>
                                            <Datetime inputProps={{readOnly:true}} dateFormat={false}
                                                      value={frequencies.weekly.endTime}
                                                      onChange={this.handleChangeEndTimeFrequencyWeekly}/>
                                        </div>
                                    </div>
                                </div>
                            }
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
                               onClick={() => onSubmit(eventPhoto, title, location, content, start, end, frequencyValue, frequencies)}>Create</a>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default CreateEventModal;