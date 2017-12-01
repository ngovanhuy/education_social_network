import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Autosuggest from 'react-autosuggest';
import {userService} from "../../../services/userService";
import {classService} from "../../../services/classService";

const getSuggestionValue = suggestion => suggestion.username;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.username}
    </div>
);

class AddMember extends Component{
    constructor() {
        super();

        this.state = {
            classId: '',
            value: '',
            suggestions: [],
            memberCount: 0
        };
    }

    componentWillMount() {
        this.setState({
            classId: this.props.classId,
            memberCount: this.props.memberCount
        });
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
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

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        const {classId} = this.props
        classService.addMember(classId, suggestion.id)
        this.setState({
            value: '',
            suggestions: [],
            memberCount: this.state.memberCount++
        });
    };

    render(){
        const { classId, memberCount, value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Enter username',
            value,
            onChange: this.onChange
        };
        return(
            <div>
                <div className="add-member">
                    <h3>
                        Add members
                        <Link to={`/classes/${classId}/members`}>
                            <span className="pull-right">{memberCount} members</span>
                        </Link>
                    </h3>

                    <div className="controls">
                        <div className="input-group">
                            <span className="input-group-addon">
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
            </div>
        )
    }
}

export default AddMember;