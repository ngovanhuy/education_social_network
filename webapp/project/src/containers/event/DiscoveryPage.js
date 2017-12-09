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

    changeViewStyle = (viewStyle) => {
        this.setState({
            viewStyle: viewStyle
        })
    }

    render() {
        const {events} = this.props
        const {viewStyle} = this.state
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
                                    <span className="events-header-title">Events in school</span>
                                    <DiscoveryFilter/>
                                    <div className="change-view-style">
                                        <div className="btn-group">
                                            <a className={viewStyle === "pinboard" ? "current btn btn-white" : "btn btn-white"}
                                               onClick={() => this.changeViewStyle("pinboard")}>Pinboard</a>
                                            <a className={viewStyle === "agenda" ? "current btn btn-white" : "btn btn-white"}
                                               onClick={() => this.changeViewStyle("agenda")}>Agenda</a>
                                        </div>
                                    </div>
                                </div>
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
    return {
        events,
    }
}

export default withRouter(connect(mapStateToProps)(DiscoveryPage));