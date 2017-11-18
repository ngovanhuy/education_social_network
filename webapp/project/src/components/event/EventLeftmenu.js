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

    render(){
        const {currentPage} = this.props

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
                                <div className={currentPage == "events" ? "events-headline-content current" : "events-headline-content"}>
                                    <span>Events</span>
                                </div>
                            </Link>
                            <Link to={`/events/calendar`}>
                                <div className={currentPage == "calendar" ? "events-headline-content current" : "events-headline-content"}>
                                    <span>Calendar</span>
                                </div>
                            </Link>
                            <Link to={`/events/discovery`}>
                                <div className={currentPage == "discovery" ? "events-headline-content current" : "events-headline-content"}>
                                    <span>Discover</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn btn-default" onClick={this.openModal}>
                        <i className="fa fa-plus"></i>
                        Create event
                    </button>
                </div>
            </div>
        )
    }
}

export default EventLeftmenu;