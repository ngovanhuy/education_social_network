import React, {Component} from 'react'
import {connect} from 'react-redux';
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import {userActions} from "../../actions";

class UserAbout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            birthday: '',
            phone: '',
            about: '',
            quote: '',
            location: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            id: this.props.user.id,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            birthday: this.props.user.birthday,
            phone: this.props.user.phone,
            quote: this.props.user.quote,
            about: this.props.user.about,
            location: this.props.user.location,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            this.setState({
                id: this.props.user.id,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                birthday: this.props.user.birthday,
                phone: this.props.user.phone,
                quote: this.props.user.quote,
                about: this.props.user.about,
                location: this.props.user.location
            });
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        const {id, firstName, lastName, birthday, phone, quote, about, location} = this.state;
        this.setState({submitted: true});
        this.props.dispatch(userActions.update({id, firstName, lastName, birthday, phone, quote, about, location}));
    }

    render() {
        return (
            <div className="ui-box">
                <div className="ui-box-title">
                    <span>Edit About</span>
                </div>
                <div className="ui-box-content">
                    <form role="form">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" name="firstName"
                                           value={this.state.firstName}
                                           onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="lastName"
                                           value={this.state.lastName}
                                           onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="birthday">Birthday</label>
                                    <Datetime timeFormat={false} inputFormat="DD/MM/YYYY"
                                              defaultValue={new Date(this.state.birthday)}
                                              onChange={(data) => this.setState({birthday: Datetime.moment(data).format("YYYY-MM-DD HH:MM:SS")})}/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" className="form-control" name="phone" value={this.state.phone}
                                           onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quote">Quote</label>
                            <textarea rows="4" style={{maxHeight: 100, maxWidth: "100%"}} className="form-control"
                                      name="quote" value={this.state.quote} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="about">About</label>
                            <textarea rows="4" style={{maxHeight: 100, maxWidth: "100%"}} className="form-control"
                                      name="about" value={this.state.about}
                                      onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="classLocation">Location</label>
                            <textarea rows="4" style={{maxHeight: 100, maxWidth: "100%"}} className="form-control"
                                      name="location" value={this.state.location}
                                      onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.handleSubmit}>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {user} = state.authentication
    return {
        user
    }
}

export default connect(mapStateToProps, null)(UserAbout);