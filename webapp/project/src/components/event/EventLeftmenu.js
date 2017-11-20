import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CreateEventModal from "./views/CreateEventModal";

class EventLeftmenu extends Component{
    constructor(props) {
        super(props)
        this.state = {modalIsOpen: false}
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    render(){
        const {currentPage, eventDetailTitle} = this.props

        return(
            <div className="events-left-menu">
                <CreateEventModal closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}/>
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
                <div className="btn-group">
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

export default EventLeftmenu;