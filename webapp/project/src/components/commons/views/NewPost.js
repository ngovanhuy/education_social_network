import React, {Component} from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import PostCreateAnnouncement from "./PostCreateAnnouncement";
import PostCreateAssignment from "./PostCreateAssignment";
import CreateEventModal from "../../event/views/CreateEventModal";
import {eventActions} from "../../../actions";
import {connect} from "react-redux";
import {dateUtils, userUtils} from "../../../utils";
import {eventConstants} from "../../../constants";

class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false
        }
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

    handleCreateEvent = (imageUpload, title, location, content, start, end, frequencyValue, frequencies) => {
        this.setState({modalCreateEventIsOpen: false});
        const {user, classDetail} = this.props
        if(frequencyValue == eventConstants.FREQUENCY.ONCE){
            this.props.dispatch(eventActions.insert(classDetail.id, user.id, imageUpload, title, location,
                content, dateUtils.convertDateTimeToISO(start), dateUtils.convertDateTimeToISO(end)));
        } else {
            var periods = dateUtils.convertFrequencyInfoToEventTimes(frequencyValue, frequencies)
            // console.log(periods)
            var eventStartRequest = {}, eventEndRequest = {}
            if(frequencyValue == eventConstants.FREQUENCY.DAILY){
                eventStartRequest = frequencies.daily.startDate
                eventEndRequest = frequencies.daily.endDate
            } else if(frequencyValue == eventConstants.FREQUENCY.WEEKLY){
                eventStartRequest = frequencies.weekly.startDate
                eventEndRequest = frequencies.weekly.endDate
            }
            this.props.dispatch(eventActions.insertMulti(classDetail.id, user.id, imageUpload, title, location, content,
                dateUtils.convertDateTimeToISO(eventStartRequest), dateUtils.convertDateTimeToISO(eventEndRequest), periods));
        }
    }

    render() {
        const {classDetail, currentUser} = this.props
        const isTeacher = userUtils.checkIsTeacher(currentUser)
        return (
            <div className="new-post has-border-radius">
                <div className="new-post-headline">
                    <Tabs>
                        <TabList>
                            <Tab>
                                <div className="new-post-headline-content">
                                    <i className="fa fa-edit"></i>
                                    Create announcement
                                </div>
                            </Tab>
                            {
                                isTeacher &&
                                (
                                    <Tab>
                                        <div className="new-post-headline-content">
                                            <i className="fa fa-tasks"></i>
                                            Create assignment
                                        </div>
                                    </Tab>
                                )
                            }
                            {/*<Tab>*/}
                                {/*<div className="new-post-headline-content">*/}
                                    {/*<i className="fa fa-question-circle"></i>*/}
                                    {/*Create question*/}
                                {/*</div>*/}
                            {/*</Tab>*/}
                            <Tab disabled={true}>
                                <div className="new-post-headline-content dropdown">
                                    <button data-toggle="dropdown" className="btn btn-white dropdown-toggle"
                                            type="button">
                                        <span className="fa fa-ellipsis-h"></span>
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <ul role="menu" className="dropdown-menu pull-right-xs">
                                        <li>
                                            <a href="javascript:;" onClick={this.openModal}>
                                                <i className="fa fa-calendar"></i>
                                                Create event
                                            </a>
                                            <CreateEventModal classDetail={classDetail} modalIsOpen={this.state.modalIsOpen}
                                                              onSubmit={this.handleCreateEvent}
                                                              closeModal={this.closeModal}/>
                                        </li>
                                    </ul>
                                </div>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <PostCreateAnnouncement/>
                        </TabPanel>
                        {
                            isTeacher &&
                            (
                                <TabPanel>
                                    <PostCreateAssignment/>
                                </TabPanel>
                            )
                        }
                        {/*<TabPanel>*/}
                            {/*<h2>Any content 3</h2>*/}
                        {/*</TabPanel>*/}
                        <TabPanel>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {currentUser} = state.authentication;
    return {
        currentUser,
    };
}

export default connect(mapStateToProps)(NewPost);