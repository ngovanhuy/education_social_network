import React, {Component} from 'react'
import {connect} from 'react-redux';
import {classActions} from "../../../actions";

class ClassManageChangeDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            classId: '',
            name: '',
            about: '',
            location: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            userId: this.props.user.id,
            classId: this.props.classDetail.id,
            name: this.props.classDetail.name,
            about: this.props.classDetail.about,
            location: this.props.classDetail.location,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classDetail !== this.props.classDetail) {
            this.setState({
                userId: nextProps.user.id,
                classId: nextProps.classDetail.id,
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

    handleSubmit(e) {
        e.preventDefault();

        const {userId, classId, name, about, location} = this.state;
        this.setState({submitted: true});
        this.props.dispatch(classActions.update(userId, classId, name, about, location));
    }

    render() {
        const {name, about, location, submitted} = this.state;
        return (
            <div className="ui-box has-border-radius">
                <div className="ui-box-title">
                    <span>Class Info</span>
                </div>
                <div className="ui-box-content">
                    <form role="form">
                        <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                            <label htmlFor="name">Class Full Name</label>
                            <input type="text" className="form-control" name="name" value={name}
                                   onChange={this.handleChange}/>
                            {submitted && !name &&
                            <div className="help-block">Class Full Name is required</div>
                            }
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="about">Class About</label>
                            <input type="text" className="form-control" name="about" value={about}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="classLocation">Class Location</label>
                            <input type="text" className="form-control" name="location" value={location}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {classDetail} = state.classes
    const {user} = state.authentication
    return {
        classDetail,
        user
    }
}

export default connect(mapStateToProps, null)(ClassManageChangeDetail);