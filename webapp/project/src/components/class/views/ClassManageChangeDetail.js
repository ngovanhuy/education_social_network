import React, {Component} from 'react'
import {connect} from 'react-redux';

class ClassManageChangeDetail extends Component{
    constructor(props) {
        super(props);

        this.state = {
            classFullName: '',
            classAbout: '',
            classLocation: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        this.setState({
            classFullName: this.props.classDetail.fullName,
            classAbout: this.props.classDetail.about,
            classLocation: this.props.classDetail.location,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classDetail !== this.props.classDetail) {
            this.setState({
                classFullName: nextProps.classDetail.fullName,
                classAbout: nextProps.classDetail.about,
                classLocation: nextProps.classDetail.location,
            });
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {classFullName, classAbout, classLocation} = this.state;
    }

    render(){
        const {classFullName, classAbout, classLocation, submitted} = this.state;
        return(
            <div className="ui-box">
                <div className="ui-box-title">
                    <span>Class Info</span>
                </div>
               <div className="ui-box-content">
                   <form name="form" onSubmit={this.handleSubmit}>
                       <div className={'form-group' + (submitted && !classFullName ? ' has-error' : '')}>
                           <label htmlFor="classFullName">Class Full Name</label>
                           <input type="text" className="form-control" name="classFullName" value={classFullName}
                                  onChange={this.handleChange}/>
                           {submitted && !classFullName &&
                           <div className="help-block">Class Full Name is required</div>
                           }
                       </div>
                       <div className={'form-group'}>
                           <label htmlFor="classAbout">Class About</label>
                           <input type="password" className="form-control" name="classAbout" value={classAbout}
                                  onChange={this.handleChange}/>
                       </div>
                       <div className={'form-group'}>
                           <label htmlFor="classLocation">Class Location</label>
                           <input type="password" className="form-control" name="classLocation" value={classLocation}
                                  onChange={this.handleChange}/>
                       </div>
                       <div className="form-group">
                           <button className="btn btn-primary">Update</button>
                       </div>
                   </form>
               </div>
            </div>
        )
    }
}
 export default ClassManageChangeDetail;