import React, {Component} from 'react'
import {connect} from 'react-redux';

class ClassManageChangeDetail extends Component{
    constructor(props) {
        super(props);

        this.state = {
            classId: '',
            name: '',
            about: '',
            location: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        this.setState({
            classId: this.props.classDetail.id,
            name: this.props.classDetail.name,
            about: this.props.classDetail.about,
            location: this.props.classDetail.location,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classDetail !== this.props.classDetail) {
            this.setState({
                classId: this.props.classDetail.id,
                name: nextProps.classDetail.name,
                about: nextProps.classDetail.about,
                location: nextProps.classDetail.location,
            });
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render(){
        const {onSubmitChangeDetail} = this.props
        const {classId, name, about, location, submitted} = this.state;
        return(
            <div className="ui-box">
                <div className="ui-box-title">
                    <span>Class Info</span>
                </div>
               <div className="ui-box-content">
                   <form name="form">
                       <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                           <label htmlFor="classFullName">Class Full Name</label>
                           <input type="text" className="form-control" name="classFullName" value={name}
                                  onChange={this.handleChange}/>
                           {submitted && !name &&
                           <div className="help-block">Class Full Name is required</div>
                           }
                       </div>
                       <div className={'form-group'}>
                           <label htmlFor="classAbout">Class About</label>
                           <input type="text" className="form-control" name="classAbout" value={about}
                                  onChange={this.handleChange}/>
                       </div>
                       <div className={'form-group'}>
                           <label htmlFor="classLocation">Class Location</label>
                           <input type="text" className="form-control" name="classLocation" value={location}
                                  onChange={this.handleChange}/>
                       </div>
                       <div className="form-group">
                           <button className="btn btn-primary" onClick={() => onSubmitChangeDetail(classId, name, about, location)}>Update</button>
                       </div>
                   </form>
               </div>
            </div>
        )
    }
}
 export default ClassManageChangeDetail;