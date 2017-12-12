import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Autosuggest from 'react-autosuggest';
import {connect} from 'react-redux'
import {userService} from "../../../services";
import {classActions} from "../../../actions";

const getSuggestionValue = suggestion => suggestion.username;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.username}
    </div>
);

class AddMember extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
        };
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({value}) => {
        userService.searchByUsername(value)
            .then(
                response => {
                    this.setState({
                        suggestions: response.data
                    });
                }
            )

    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
        const {classDetail} = this.props
        this.props.dispatch(classActions.addMember(classDetail.id, suggestion.id, suggestion.typeuser.enum_id))
        this.setState({
            value: '',
            suggestions: [],
        });
    };

    render() {
        const {value, suggestions} = this.state;
        const {classDetail} = this.props

        const inputProps = {
            placeholder: 'Enter username',
            value,
            onChange: this.onChange
        };
        return (
            <div>
                {
                    classDetail &&
                    <div className="add-member">
                        <h3 className="title">
                            Add members
                            <Link to={`/classes/${classDetail.id}/members`}>
                                <span className="pull-right">{classDetail.memberCount} members</span>
                            </Link>
                        </h3>
                        <div className="controls">
                            <div className="input-group">
                                <span className="input-group-addon hidden-sm">
                                    <i className="fa fa-plus"></i>
                                </span>
                                {/*<input type="text" className="form-control" placeholder="Enter name or email"/>*/}
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    onSuggestionSelected={this.onSuggestionSelected}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default connect(null)(AddMember);