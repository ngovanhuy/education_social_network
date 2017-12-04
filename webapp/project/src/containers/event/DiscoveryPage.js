import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/class/class.css'
import EventsAgenda from "../../components/event/views/EventsAgenda";
import EventLeftmenu from "../../components/event/EventLeftmenu";
import EventsPinboard from "../../components/event/views/EventsPinboard";
import DiscoveryFilter from "../../components/event/views/DiscoveryFilter";

class DiscoveryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewStyle: "pinboard",
        };
        this.changeViewStyle = this.changeViewStyle.bind(this);
    }

    static defaultProps = {
        events: [
            {
                'id': 1,
                'title': 'All Day Event very long title',
                'allDay': true,
                'start': new Date(2015, 3, 0),
                'end': new Date(2015, 3, 1),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
                'source': '/images/cover_photo.jpg'
            },
            {
                'id': 2,
                'title': 'Long Event',
                'start': new Date(2015, 3, 7),
                'end': new Date(2015, 3, 10),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
                'source': '/images/cover_photo.jpg'
            },
            {
                'id': 3,
                'title': 'DTS STARTS',
                'start': new Date(2016, 2, 13, 0, 0, 0),
                'end': new Date(2016, 2, 20, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
                'source': '/images/cover_photo.jpg'
            },
            {
                'id': 4,
                'title': 'DTS ENDS',
                'start': new Date(2016, 10, 6, 0, 0, 0),
                'end': new Date(2016, 10, 13, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
                'source': '/images/cover_photo.jpg'
            },

            {
                'id': 5,
                'title': 'Some Event',
                'start': new Date(2015, 3, 9, 0, 0, 0),
                'end': new Date(2015, 3, 9, 0, 0, 0),
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
                'source': '/images/cover_photo.jpg'
            },
            {
                'id': 6,
                'title': 'Conference',
                'start': new Date(2015, 3, 11),
                'end': new Date(2015, 3, 13),
                desc: 'Big conference for important people',
                'location': ' Royal City 72A Nguyễn Trãi - Thanh xuân - Hà Nội',
                'source': '/images/cover_photo.jpg'
            }
        ]
    }

    changeViewStyle = (viewStyle) => {
        this.setState({
            viewStyle: viewStyle
        })
    }

    render() {
        const {classes, events} = this.props

        // var subjects = [
        //     {value: 'no_subject', label: 'No subject'},
        //     {value: 'subject_1', label: 'Subject 1'},
        //     {value: 'subject_2', label: 'Subject 2'},
        //     {value: 'subject_3', label: 'Subject 3'}
        // ];

        // var classes = [
        //     {value: 'all_school', label: 'All school'},
        //     {value: 'class_1', label: 'Class 1'},
        //     {value: 'class_2', label: 'Class 2'},
        //     {value: 'class_3', label: 'Class 3'}
        // ];

        return (
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <EventLeftmenu currentPage="discovery"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="events clearfix">
                                <div className="events-header clearfix">
                                    <span>Events in school</span>
                                    <div className="change-view-style text-right">
                                        <div className="btn-group">
                                            <a className="btn btn-white" onClick={() => this.changeViewStyle("pinboard")}>Pinboard</a>
                                            <a className="btn btn-white" onClick={() => this.changeViewStyle("agenda")}>Agenda</a>
                                        </div>
                                    </div>
                                </div>
                                <DiscoveryFilter classes={classes}/>
                                {
                                    this.state.viewStyle == "pinboard" ?
                                        <EventsPinboard events={events}/> :
                                        <EventsAgenda events={events}/>
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
    const events = state.events.items
    const {user} = state.authentication
    const classes = state.classes.items
    return {
        events,
        user,
        classes
    }
}

export default withRouter(connect(mapStateToProps)(DiscoveryPage));