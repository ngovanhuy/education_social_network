import React, {Component} from 'react'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

const getByValue = (array, value) => {
    var result = array.filter(function (o) {
        return o.value == value;
    });

    return result ? result[0].label : null;
}

class DiscoveryFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueDropdown: '',
            showDropDown: false,
            showTags: false,
            visibilityValue: '',
            tagsValue: '',
            locationValue: '',
            textSearch: '',
            eventStartAfter: false,
            eventStartAfterValue: '',
            eventStartBefore: false,
            eventStartBeforeValue: '',
            subjectValue: '',
            classValue: '',
        };
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    handleChangeSubjectValue = (event) => {
        this.setState({
            ...this.state,
            subjectValue: event.target.value
        });
    }

    handleChangeClassValue = (event) => {
        console.log(event.target.value)
        this.setState({
            ...this.state,
            classValue: event.target.value
        });
    }

    showDropDown = () => {
        this.setState({
            showDropDown: !this.state.showDropDown
        });
    };

    handleChange = (event) => {
        this.setState({
            valueDropdown: event.target.value,
            filter: event.target.value && true
        });
    };

    changeTextSearch = e => {
        const textSearch = e.target.value
    };

    handleChangeVisibility = (event) => {
        this.setState({
            visibilityValue: event.target.value,
            filter: true
        });
    };

    search = () => {
        const {visibilityValue, tagsValue, textSearch} = this.state;
        this.setState({
            valueDropdown: '',
            showTags: true,
            showDropDown: false
        });
        // this.props.loadBwProducts(1, visibilityValue, tagsValue, textSearch, this.props.storeAlias);
    };

    handChangeEventStart = (event) => {
        if (event.target.value == "greater_than") {
            this.setState({
                eventStartAfter: true,
                filter: true
            })
        } else if (event.target.value == "less_than") {
            this.setState({
                eventStartBefore: true,
                filter: true
            })
        }
    }

    handleChangeStartFilterValue = (value) => {
        if (this.state.eventStartAfter) {
            this.setState({
                ...this.state,
                eventStartAfterValue: value
            })
        }
        if (this.state.eventStartBefore) {
            this.setState({
                ...this.state,
                eventStartBeforeValue: value
            })
        }
    }

    handleChangeLocation = (event) => {
        this.setState({
            locationValue: event.target.value,
            filter: true
        });
    };

    handleChangeTag = (event) => {
        this.setState({
            tagsValue: event.target.value,
            filter: true
        });
    };

    removeSearchTag = () => {
        const {visibilityValue, textSearch} = this.state;
        this.setState({
            tagsValue: ''
        });

        // this.props.loadBwProducts(1, visibilityValue, '', textSearch, this.props.storeAlias);
    };

    removeSearchVisibility = () => {
        const {tagsValue, textSearch} = this.state;
        this.setState({
            visibilityValue: ''
        });
        // this.props.loadBwProducts(1, '', tagsValue, textSearch, this.props.storeAlias);
    };

    removeEventStartBefore = () => {
        this.setState({
            eventStartBefore: false,
            eventStartBeforeValue: '',
        });
        // this.props.loadBwProducts(1, '', tagsValue, textSearch, this.props.storeAlias);
    };

    removeEventStartAfter = () => {
        this.setState({
            eventStartAfter: false,
            eventStartAfterValue: '',
        });
        // this.props.loadBwProducts(1, '', tagsValue, textSearch, this.props.storeAlias);
    };

    removeEventLocation = () => {
        this.setState({
            ...this.state,
            locationValue: ''
        })
    }

    removeEventSubject = () => {
        this.setState({
            ...this.state,
            subjectValue: ''
        })
    }

    removeEventClass = () => {
        this.setState({
            ...this.state,
            classValue: ''
        })
    }

    handleClick = e => {
        let buttonDropdown = this.refs.buttonDropdown;
        let showMenu = this.refs.showMenu;

        if (showMenu !== undefined && showMenu !== null && !showMenu.contains(e.target) && !buttonDropdown.contains(e.target)) {
            this.setState({
                showDropDown: false,
                valueDropdown: ''
            });
        }
    };

    addFilter = text => {
        const {tagsValue, visibilityValue} = this.state;
        this.setState({
            ...this.state,
            textSearch: text,
        });
        // this.props.loadBwProducts(1, visibilityValue, tagsValue, text, this.props.storeAlias);
    };

    render() {
        const {classes} = this.props
        return (
            <div>
                <div className="has-bulk-actions">
                    <div className="filters">
                        <div className="filter-container">
                            <div className="btn-group btn-group-filter clearfix">
                                <div className="btn-group dropdown">
                                    <a className="btn btn-white dropdown-toggle toggle-filter btn-filter"
                                       ref="buttonDropdown"
                                       data-toggle="dropdown"
                                       onClick={this.showDropDown}>
                                        Filter
                                        <span className="caret"></span>
                                    </a>
                                    {
                                        this.state.showDropDown
                                            ?
                                            <div ref="showMenu"
                                                 className="dropdown-menu arrow-style dropdown-filter"
                                                 style={{height: '85px', display: 'block'}}>
                                                <div className="arrow"></div>
                                                <div className="filters">
                                                    <label className="filter-title">
                                                        Display events by:
                                                    </label>
                                                    <div className="filter-content">
                                                        <select
                                                            className="form-control form-selectboxit"
                                                            id="filter-conditions"
                                                            onChange={this.handleChange}>
                                                            <option value="">Filter by...</option>
                                                            {/*<option value="visibility">*/}
                                                                {/*Display*/}
                                                            {/*</option>*/}
                                                            <option value="start">
                                                                Event start time
                                                            </option>
                                                            {/*<option value="location">*/}
                                                                {/*Event location*/}
                                                            {/*</option>*/}
                                                            {/*<option value="subject">*/}
                                                                {/*Event of subject*/}
                                                            {/*</option>*/}
                                                            <option value="class">
                                                                Event of class
                                                            </option>
                                                            {/*<option value="tag">*/}
                                                                {/*Tag with*/}
                                                            {/*</option>*/}
                                                        </select>
                                                        <div className="inline filter-choose">
                                                            {/*{*/}
                                                                {/*this.state.valueDropdown === "visibility" &&*/}
                                                                {/*<div>*/}
                                                                    {/*<select*/}
                                                                        {/*className="form-control form-selectboxit filter-select"*/}
                                                                        {/*onChange={this.handleChangeVisibility}>*/}
                                                                        {/*<option value="">Select*/}
                                                                            {/*condition filter...*/}
                                                                        {/*</option>*/}
                                                                        {/*<option value="visibility">*/}
                                                                            {/*Display*/}
                                                                        {/*</option>*/}
                                                                        {/*<option value="hidden">*/}
                                                                            {/*Hidden*/}
                                                                        {/*</option>*/}
                                                                    {/*</select>*/}
                                                                {/*</div>*/}
                                                            {/*}*/}
                                                            {
                                                                this.state.valueDropdown === 'start' &&
                                                                <div className="date inline margin-right">
                                                                    <select
                                                                        className="form-control form-selectboxit filter-select"
                                                                        onChange={this.handChangeEventStart}>
                                                                        <option value="">Select condition filter...
                                                                        </option>
                                                                        <option value="greater_than">After</option>
                                                                        <option value="less_than">
                                                                            Before
                                                                        </option>
                                                                    </select>
                                                                    {
                                                                        (this.state.eventStartAfter || this.state.eventStartBefore) &&
                                                                        <Datetime timeFormat={false}
                                                                                  onChange={this.handleChangeStartFilterValue}
                                                                                  inputFormat="DD/MM/YYYY"/>
                                                                    }
                                                                </div>
                                                            }
                                                            {/*{*/}
                                                                {/*this.state.valueDropdown === 'location' &&*/}
                                                                {/*<div>*/}
                                                                    {/*<input type="text"*/}
                                                                           {/*className="form-control inline filter-input"*/}
                                                                           {/*onChange={this.handleChangeLocation}/>*/}
                                                                {/*</div>*/}
                                                            {/*}*/}
                                                            {/*{*/}
                                                                {/*this.state.valueDropdown === 'subject' &&*/}
                                                                {/*<div>*/}
                                                                    {/*<select*/}
                                                                        {/*className="form-control form-selectboxit filter-select"*/}
                                                                        {/*onChange={this.handleChangeSubjectValue}>*/}
                                                                        {/*{*/}
                                                                            {/*subjects && subjects.length > 0 &&*/}
                                                                            {/*subjects.map((subject, index) =>*/}
                                                                                {/*(*/}
                                                                                    {/*<option key={index}*/}
                                                                                            {/*value={subject.value}>*/}
                                                                                        {/*{subject.label}*/}
                                                                                    {/*</option>*/}
                                                                                {/*))*/}
                                                                        {/*}*/}
                                                                    {/*</select>*/}
                                                                {/*</div>*/}
                                                            {/*}*/}
                                                            {
                                                                this.state.valueDropdown === 'class' &&
                                                                <div>
                                                                    <select
                                                                        className="form-control form-selectboxit filter-select"
                                                                        onChange={this.handleChangeClassValue}>
                                                                        {
                                                                            classes && classes.length > 0 &&
                                                                            classes.map((classDetail, index) =>
                                                                                (
                                                                                    <option key={index}
                                                                                            value={classDetail.value}>
                                                                                        {classDetail.label}
                                                                                    </option>
                                                                                ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            }
                                                            {/*{*/}
                                                                {/*this.state.valueDropdown === 'tag' &&*/}
                                                                {/*<div>*/}
                                                                    {/*<input type="text"*/}
                                                                           {/*className="form-control inline filter-input"*/}
                                                                           {/*onChange={this.handleChangeTag}/>*/}
                                                                {/*</div>*/}
                                                            {/*}*/}
                                                            {
                                                                this.state.valueDropdown &&
                                                                <input type="button"
                                                                       className="btn btn-white add-filter filtering-complete"
                                                                       value="Lọc"
                                                                       onClick={this.search}/>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                    }
                                </div>
                                <div className="search-container">
                                    <input type="text"
                                           className="form-control form-large search-input"
                                           placeholder="Nhập từ khóa tìm kiếm ..."
                                           onChange={this.changeTextSearch}
                                           onKeyDown={e => {
                                               if (e.keyCode !== 13)
                                                   return;
                                               e.preventDefault();
                                               this.addFilter(e.target.value)
                                           }}
                                           name="query" id="search-product-mpage"/>
                                </div>
                            </div>
                            {this.state.showTags ?
                                <div className="btn-group btn-group-filter">
                                    <div className="btn-group">
                                        <div className="bootstrap-tagsinput" style={{border: '0'}}>
                                            {/*{*/}
                                                {/*(*/}
                                                    {/*this.state.visibilityValue !== null && this.state.visibilityValue*/}
                                                {/*) ?*/}
                                                    {/*(*/}
                                                        {/*<span className="tag label label-info">*/}
                                                        {/*{this.state.visibilityValue === "visibility" ? 'Display' : 'Hidden'}*/}
                                                            {/*<span data-role="remove"*/}
                                                                  {/*onClick={this.removeSearchVisibility}>*/}
                                                        {/*</span>*/}
                                                {/*</span>*/}
                                                    {/*) : ''*/}
                                            {/*}*/}
                                            {
                                                (
                                                    this.state.eventStartAfter && this.state.eventStartAfterValue
                                                ) ?
                                                    (
                                                        <span className="tag label label-info">
                                                            {
                                                                'Start after ' + this.state.eventStartAfterValue.format("MM/DD/YYYY")
                                                            }
                                                            <span data-role="remove"
                                                                  onClick={this.removeEventStartAfter}>
                                                                </span>
                                                        </span>
                                                    ) : ''
                                            }
                                            {
                                                (
                                                    this.state.eventStartBefore && this.state.eventStartBeforeValue
                                                ) ?
                                                    (
                                                        <span className="tag label label-info">
                                                            {
                                                                'Start before ' + this.state.eventStartBeforeValue.format("MM/DD/YYYY")
                                                            }
                                                            <span data-role="remove"
                                                                  onClick={this.removeEventStartBefore}>
                                                                </span>
                                                        </span>
                                                    ) : ''
                                            }
                                            {/*{*/}
                                                {/*(*/}
                                                    {/*this.state.locationValue !== null && this.state.locationValue*/}
                                                {/*) ?*/}
                                                    {/*(*/}
                                                        {/*<span className="tag label label-info">*/}
                                                        {/*{"Location at \"" + this.state.locationValue + "\""}*/}
                                                            {/*<span data-role="remove"*/}
                                                                  {/*onClick={this.removeSearchVisibility}>*/}
                                                        {/*</span>*/}
                                                {/*</span>*/}
                                                    {/*) : ''*/}
                                            {/*}*/}
                                            {/*{*/}
                                                {/*(*/}
                                                    {/*this.state.subjectValue !== null && this.state.subjectValue*/}
                                                {/*) ?*/}
                                                    {/*<span className="tag label label-info">*/}
                                                        {/*{*/}
                                                            {/*"Event of subject \"" +*/}
                                                            {/*getByValue(subjects, this.state.subjectValue) + "\""*/}
                                                        {/*}*/}
                                                        {/*<span data-role="remove"*/}
                                                              {/*onClick={this.removeEventSubject}>*/}
                                                        {/*</span>*/}
                                                    {/*</span>*/}
                                                    {/*: ''*/}
                                            {/*}*/}
                                            {
                                                (
                                                    this.state.classValue !== null && this.state.classValue
                                                ) ?
                                                    <span className="tag label label-info">
                                                        {
                                                            "Event in class \"" +
                                                            getByValue(classes, this.state.classValue) + "\""
                                                        }
                                                        <span data-role="remove"
                                                              onClick={this.removeEventClass}>
                                                        </span>
                                                    </span>
                                                    : ''
                                            }
                                            {/*{*/}
                                                {/*this.state.tagsValue !== null && this.state.tagsValue ?*/}
                                                    {/*(*/}
                                                        {/*<span className="tag label label-info">*/}
                                                    {/*{'Tag with ' + this.state.tagsValue}*/}
                                                            {/*<span*/}
                                                                {/*data-role="remove"*/}
                                                                {/*onClick={this.removeSearchTag}>*/}
                                                    {/*</span>*/}
                                                {/*</span>*/}
                                                    {/*) : ''*/}

                                            {/*}*/}
                                        </div>
                                    </div>
                                </div> : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DiscoveryFilter;