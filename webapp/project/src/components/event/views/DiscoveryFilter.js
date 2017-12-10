import React, {Component} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';
import {classActions, eventActions, postActions, userActions} from "../../../actions";
import {dateUtils} from "../../../utils";

const fillUsersInfoForSelectTag = (users) => {
    if (!users || users.length <= 0) {
        return []
    }
    const newUsers = users.slice()
    var newEventFilterUserFor = []
    newEventFilterUserFor = newUsers.map((user) =>
        ({
            value: user.id,
            label: user.firstName + " " + user.lastName
        })
    )
    newEventFilterUserFor.unshift({value: "all_user", label: 'All User'});
    return newEventFilterUserFor;
}

const fillClassesInfoForSelectTag = (classes) => {
    if (!classes || classes.length <= 0) {
        return []
    }
    const newClasses = classes.slice()
    var newEventFilterUserFor = []
    newEventFilterUserFor = newClasses.map((classDetail) =>
        ({
            value: classDetail.id,
            label: classDetail.name
        })
    )
    newEventFilterUserFor.unshift({value: "all_class", label: 'All Class'});
    return newEventFilterUserFor;
}

class DiscoveryFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            textSearch: '',
            showFilterContent: false,
            classSelected: '',
            userSelected: '',
            startDate: null,
            endDate: null,
            focusedInput: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.showFilterContent = this.showFilterContent.bind(this);
        this.hideFilterContent = this.hideFilterContent.bind(this);
        this.handleChangeSearchByClass = this.handleChangeSearchByClass.bind(this);
        this.handleChangeSearchByUser = this.handleChangeSearchByUser.bind(this);
        this.handleSearch = this.handleSearch.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillMount() {
        const {textSearch, classSelected, userSelected, startDate, endDate} = this.state
        this.props.dispatch(eventActions.filter(textSearch, userSelected, classSelected,
            dateUtils.convertDateTimeToISO(startDate), dateUtils.convertDateTimeToISO(endDate)))
        this.props.dispatch(classActions.getAll())
        this.props.dispatch(userActions.getAll())
    }

    showFilterContent(event) {
        this.setState({
            showFilterContent: !this.state.showFilterContent
        })
    }

    hideFilterContent(event) {
        this.setState({
            showFilterContent: false
        })
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleChangeSearchByClass = (classDetail) => {
        this.setState({
            classSelected: classDetail ? classDetail.value : ''
        })
    }

    handleChangeSearchByUser = (userDetail) => {
        this.setState({
            userSelected: userDetail ? userDetail.value : ''
        })
    }

    handleReset = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            textSearch: '',
            // showFilterContent: false,
            classSelected: '',
            userSelected: '',
            startDate: null,
            endDate: null,
            focusedInput: null,
        })
    }

    onKeyPress(e) {
        if (e.key == 'Enter') {
            e.preventDefault();

            this.handleSearch(e);
        }
    }

    handleSearch = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            showFilterContent: false
        })

        var {textSearch, classSelected, userSelected, startDate, endDate} = this.state
        if (classSelected === "all_class") {
            classSelected = ''
        }
        if (userSelected === "all_user") {
            userSelected = ''
        }
        this.props.dispatch(eventActions.filter(textSearch, userSelected, classSelected,
            dateUtils.convertDateTimeToISO(startDate), dateUtils.convertDateTimeToISO(endDate)))
    }

    render() {
        var {classes, users} = this.props
        var newEventFilterUserFor = fillUsersInfoForSelectTag(users)
        var newEventFilterClassFor = fillClassesInfoForSelectTag(classes)
        const {showFilterContent, textSearch, classSelected, userSelected, startDate, endDate, focusedInput} = this.state
        return (
            <div className="discovery-filter">
                <form className="discovery-filter-form">
                    <div className="controls">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-search"></i>
                            </span>
                            <input type="text" className="form-control" value={textSearch} name="textSearch"
                                   onChange={this.handleChange}
                                   onKeyPress={this.onKeyPress}/>
                            <div className="input-group-btn">
                                <a className="show-filter-content-button btn btn-white" href="javascript:;"
                                   onClick={this.showFilterContent}>
                                    <b className="caret"></b>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={'discovery-filter-content' + (!showFilterContent ? ' hide-filter-content ' : '')}>
                        <div className="clearfix form-group filter-content-detail">
                            <label className="col-sm-4 control-label">Search in Class</label>
                            <div className="col-sm-8">
                                <Select
                                    name="classes"
                                    value={classSelected}
                                    options={newEventFilterClassFor}
                                    onChange={this.handleChangeSearchByClass}
                                />
                            </div>
                        </div>
                        <div className="clearfix form-group filter-content-detail">
                            <label className="col-sm-4 control-label">Search of User</label>
                            <div className="col-sm-8">
                                <Select
                                    name="users"
                                    value={userSelected}
                                    options={newEventFilterUserFor}
                                    onChange={this.handleChangeSearchByUser}
                                />
                            </div>
                        </div>
                        <div className="clearfix form-group filter-content-detail">
                            <label className="col-sm-4 control-label">Date</label>
                            <div className='col-sm-8'>
                                <DateRangePicker
                                    startDate={startDate}
                                    endDate={endDate}
                                    onDatesChange={({startDate, endDate}) => {
                                        this.setState({startDate, endDate})
                                    }}
                                    focusedInput={focusedInput}
                                    onFocusChange={(focusedInput) => {
                                        this.setState({focusedInput})
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-bottom pull-right clearfix">
                            <button className="btn btn-white" onClick={this.handleReset}>Reset</button>
                            <button className="btn btn-primary" onClick={this.handleSearch}>Search</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const users = state.users.items
    const classes = state.classes.items
    return {
        users,
        classes
    }
}

export default connect(mapStateToProps)(DiscoveryFilter);