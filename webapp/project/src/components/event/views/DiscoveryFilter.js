import React, {Component} from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

class DiscoveryFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showFilterContent: false,
            classSelected: '',
            startDate: null,
            endDate: null,
            focusedInput: null,
        }
        this.showFilterContent = this.showFilterContent.bind(this);
        this.hideFilterContent = this.hideFilterContent.bind(this);
        this.handleChangeSearchByClass = this.handleChangeSearchByClass.bind(this);
    }

    componentWillMount() {
        // document.addEventListener('click', this.hideFilterContent, false);
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

    handleChangeSearchByClass = (classDetail) => {
        this.setState({
            classSelected: classDetail.value
        })
    }

    render() {
        const {classes} = this.props
        const {showFilterContent} = this.state
        return (
            <div className="discovery-filter">
                <form className="discovery-filter-form">
                        <div className="controls">
                            <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-search"></i>
                            </span>
                                <input type="text" className="form-control"/>
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
                            <label className="col-sm-3 control-label">Search in class</label>
                            <div className="col-sm-7">
                                <Select
                                    name="classes"
                                    value={this.state.classSelected}
                                    options={classes}
                                    onChange={this.handleChangeSearchByClass}
                                />
                            </div>
                        </div>
                        <div className="clearfix form-group filter-content-detail">
                            <label className="col-sm-3 control-label">Date</label>
                            <div className='col-sm-7'>
                                <DateRangePicker
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate })}}
                                    focusedInput={this.state.focusedInput}
                                    onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default DiscoveryFilter;