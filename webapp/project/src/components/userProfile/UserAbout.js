import React, {Component} from 'react'
import {connect} from 'react-redux';
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import {userActions} from "../../actions";
import {userConstants} from "../../constants";
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {dateUtils} from "../../utils";

const fillGenderForSelectTag = () => {
    var genders = [
        {
            value: userConstants.GENDER.NONE,
            label: "None"
        },
        {
            value: userConstants.GENDER.MALE,
            label: "Male"
        },
        {
            value: userConstants.GENDER.FEMALE,
            label: "Female"
        }
    ]
    return genders;
}

class UserAbout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            birthday: {},
            phone: '',
            about: '',
            quote: '',
            location: '',
            gender: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const {user} = this.props
        if (user) {
            this.setState({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                birthday: new Date(user.birthday),
                phone: user.phone,
                quote: user.quote,
                about: user.about,
                location: user.location,
                gender: user.gender.enum_id.toString()
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            const {user} = nextProps
            if (user) {
                this.setState({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthday: new Date(user.birthday),
                    phone: user.phone,
                    quote: user.quote,
                    about: user.about,
                    location: user.location,
                    gender: user.gender.enum_id.toString()
                });
            }
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        const {id, firstName, lastName, phone, quote, about, location, gender} = this.state;
        var birthday = dateUtils.convertDateTimeToISO(this.state.birthday)
        this.setState({submitted: true});
        this.props.dispatch(userActions.update({
            id,
            firstName,
            lastName,
            birthday,
            phone,
            quote,
            about,
            location,
            gender
        }));
    }

    handleChangeGender = (gender) => {
        this.setState({
            gender: gender ? gender.value : userConstants.GENDER.NONE
        })
    }

    render() {
        const genders = fillGenderForSelectTag()
        const {firstName, lastName, birthday, phone, quote, about, location, gender} = this.state;
        return (
            <div className="ui-box has-border-radius">
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
                                           value={firstName}
                                           onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="lastName"
                                           value={lastName}
                                           onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="birthday">Birthday</label>
                                    <Datetime inputProps={{readOnly:true}} timeFormat={false} inputFormat="MM/DD/YYYY"
                                              value={birthday}
                                              onChange={(data) => this.setState({birthday: Datetime.moment(data).format("MM/DD/YYYY")})}/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <Select
                                        name="genders"
                                        value={gender}
                                        options={genders}
                                        onChange={this.handleChangeGender}/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" className="form-control" name="phone" value={phone}
                                           onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quote">Quote</label>
                            <textarea rows="4" style={{maxHeight: 100, maxWidth: "100%"}} className="form-control"
                                      name="quote" value={quote} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="about">About</label>
                            <textarea rows="4" style={{maxHeight: 100, maxWidth: "100%"}} className="form-control"
                                      name="about" value={about}
                                      onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="classLocation">Location</label>
                            <textarea rows="4" style={{maxHeight: 100, maxWidth: "100%"}} className="form-control"
                                      name="location" value={location}
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

export default connect(null)(UserAbout);