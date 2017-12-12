import React, {Component} from 'react'
import Modal from 'react-modal';
// import TagsInput from 'react-tagsinput'
// import 'react-tagsinput/react-tagsinput.css'
import '../class.css'
import Autosuggest from 'react-autosuggest';
import {userService} from "../../../services";
import Select from 'react-select';
import fetch from 'isomorphic-fetch'
import {DOMAIN_SERVICE} from "../../../constants";

const customStylesModal = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position: 'absolute',
        top: '25%',
        left: '25%',
        right: '25%',
        bottom: 'unset',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    }
};

const customTagsInput = {
    inputProps: {
        placeholder: 'Enter name'
    }
}

const getSuggestionValue = suggestion => suggestion.username;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.username}
    </div>
);


class CreateClassModal extends Component {
    constructor() {
        super()
        this.state = {
            className: '',
            membersInvited: [],
            suggestions: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    onChangeValue (value) {
        this.setState({
            membersInvited: value,
        });
    }

    gotoUser (value, event) {
        window.open(`/users/${value.id}`);
    }

    getUsers (input, callback) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }
        return userService.searchByUsername(input)
            .then((response) => {
                return {options: response.data};
            })
    }

    render() {
        const AsyncComponent = Select.Async;

        const {modalIsOpen, onSubmit, suggestions} = this.props
        const {className, membersInvited} = this.state
        var modalTitle = 'Create New Group';

        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStylesModal}
                contentLabel="Create Class Modal">
                <h2>{modalTitle}</h2>
                <a href='#' className="mm-popup__close"
                   data-toggle="tooltip" data-placement="bottom" data-original-title="Close Modal"
                   onClick={this.props.closeModal}>×</a>
                <form className="create-class-modal form-horizontal" role="form">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Name your class</label>
                        <div className="col-sm-9 ">
                            <input type="text" className="form-control" id="className"
                                   name="className" value={className}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Invite members</label>
                        <div className="col-sm-9">
                            <AsyncComponent multi={true} value={membersInvited}
                                            onChange={this.onChangeValue} onValueClick={this.gotoUser}
                                            valueKey="id" labelKey="username" loadOptions={this.getUsers}
                                            backspaceRemoves={true} />
                        </div>
                    </div>
                    <div className="modal-bottom clearfix">
                        <div className="pull-right">
                            <a href='#' className="btn btn-white" onClick={this.props.closeModal}>Cancel</a>
                            <a href='#' className="btn btn-primary"
                               onClick={() => onSubmit(className, membersInvited)}>Create</a>
                        </div>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default CreateClassModal;