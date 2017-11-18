import React, {Component} from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

class PostCreateAssignment extends Component {
    logChange = (val) => {
        console.log('Selected: ', val);
    }

    render() {
        var newPostUserFor = [
            {value: 'all_student', label: 'All student'},
            {value: 'huongnt', label: 'Ngo Thi Huong'},
            {value: 'huynv', label: 'Ngo Van Huy'},
            {value: 'hiennt', label: 'Ngo Thi Hien'}
        ];
        var newPostTopicFor = [
            {value: 'no_topic', label: 'No topic'},
            {value: 'topic_1', label: 'Topic 1'},
            {value: 'topic_2', label: 'Topic 2'},
            {value: 'topic_3', label: 'Topic 3'}
        ];
        return (
            <div className="new-post-content clearfix">
                <form className="form-horizontal">
                    <div className="new-post-message">
                        <div className="form-group">
                            <label className="col-sm-1 control-label">For</label>
                            <div className="col-sm-11">
                                <Select
                                    name="new-post-user-for"
                                    value="all_student"
                                    options={newPostUserFor}
                                    onChange={this.logChange}
                                />
                            </div>
                        </div>
                        <div className="form-group controls">
                            <div className="col-sm-12">
                                <textarea className="form-control" rows="1" placeholder="Title"></textarea>
                            </div>
                        </div>
                        <div className="form-group controls">
                           <div className="col-sm-12">
                                <textarea className="form-control" rows="1"
                                          placeholder="Instructions (optional)"></textarea>
                           </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-1">Due</label>
                            <div className='post-end-date col-sm-4'>
                                <Datetime timeFormat={false} inputFormat="DD/MM/YYYY" defaultValue={new Date()}/>
                            </div>
                            <div className='post-end-time col-sm-3'>
                                <Datetime dateFormat={false} defaultValue={new Date()}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-1">Topic</label>
                            <div className="col-sm-11">
                                <Select
                                    name="new-post-topic-for"
                                    value="no_topic"
                                    options={newPostTopicFor}
                                    onChange={this.logChange}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostCreateAssignment;