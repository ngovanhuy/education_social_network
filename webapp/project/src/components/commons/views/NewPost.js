import React, {Component} from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import PostCreateAnnouncement from "./PostCreateAnnouncement";
import PostCreateAssignment from "./PostCreateAssignment";
import PostAddAttachment from "./PostAddAttachment";
import NewPostFooter from "./NewPostFooter";

class NewPost extends Component {
    render() {
        const {className, classFullName} = this.props
        return (
            <div className="new-post">
                <div className="new-post-headline">
                    <Tabs>
                        <TabList>
                            <Tab>
                                <div className="new-post-headline-content">
                                    <i className="fa fa-edit"></i>
                                    Create announcement
                                </div>
                            </Tab>
                            <Tab>
                                <div className="new-post-headline-content">
                                    <i className="fa fa-tasks"></i>
                                    Create assignment
                                </div>
                            </Tab>
                            <Tab>
                                <div className="new-post-headline-content">
                                    <i className="fa fa-question-circle"></i>
                                    Create question
                                </div>
                            </Tab>
                            <Tab disabled={true}>
                                <div className="new-post-headline-content dropdown">
                                    <button data-toggle="dropdown" className="btn btn-default dropdown-toggle"
                                            type="button">
                                        <span className="fa fa-ellipsis-h"></span>
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <ul role="menu" className="dropdown-menu pull-right-xs">
                                        <li>
                                            <a href="javascript:;">
                                                <i className="fa fa-calendar"></i>
                                                Create event
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <PostCreateAnnouncement/>
                        </TabPanel>
                        <TabPanel>
                            <PostCreateAssignment/>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 3</h2>
                        </TabPanel>
                        <TabPanel>
                        </TabPanel>
                    </Tabs>
                </div>
                <PostAddAttachment/>
                <NewPostFooter classFullName={classFullName}/>
            </div>
        )
    }
}

export default NewPost;