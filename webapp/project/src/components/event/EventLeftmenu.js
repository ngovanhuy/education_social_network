import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CreateEventModal from "./views/CreateEventModal";
import {eventActions} from "../../actions";
import {connect} from "react-redux";
import {dateUtils} from "../../utils";

class EventLeftmenu extends Component{
    constructor(props) {
        super(props)
        this.state = {modalIsOpen: false}
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    renderClassNameCurrentPage(currentPage, currentLink){
        if(currentPage == currentLink){
            return "events-headline-content current";
        }
        return "events-headline-content";
    }

    handleCreateEvent = (imageUpload, title, location, content, start, end) => {
        this.setState({modalCreateEventIsOpen: false});
        const {user} = this.props
        this.props.dispatch(eventActions.insert(null, user.id, imageUpload, title, location,
            content, dateUtils.convertDateTimeToISO(start), dateUtils.convertDateTimeToISO(end)));
    }

    render(){
        const {currentPage, eventDetailTitle} = this.props

        return(
            <div className="events-left-menu">
                <CreateEventModal closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}
                                  onSubmit={this.handleCreateEvent}/>
                <div className="col-sm-12">
                    <div className="row">
                        <h1>
                            <i className="fa fa-calendar"></i>
                            <span>Events</span>
                        </h1>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="events-headline">
                            <Link to={`/events`}>
                                <div className={this.renderClassNameCurrentPage(currentPage, "events")}>
                                    <span>Events</span>
                                </div>
                            </Link>
                            {
                                eventDetailTitle ?
                                    (
                                        <div className={this.renderClassNameCurrentPage(currentPage, "eventDetail")}>
                                            <span className="event-detail">{eventDetailTitle}</span>
                                        </div>
                                    ) : ''
                            }
                            <Link to={`/events/calendar`}>
                                <div className={this.renderClassNameCurrentPage(currentPage, "calendar")}>
                                    <span>Calendar</span>
                                </div>
                            </Link>
                            <Link to={`/events/discovery`}>
                                <div className={this.renderClassNameCurrentPage(currentPage, "discovery")}>
                                    <span>Discover</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <a href="#" className="btn btn-white" onClick={this.openModal}>
                        <i className="fa fa-plus"></i>
                        Create event
                    </a>
                    <a href="#" className="btn btn-white">
                        <i className="fa fa-plus"></i>
                        Import event
                    </a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {user} = state.authentication;
    return {
        user,
    };
}


export default connect(mapStateToProps)(EventLeftmenu);