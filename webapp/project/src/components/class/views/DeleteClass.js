import React, {Component} from 'react'
import {connect} from "react-redux";
import {classService} from "../../../services";
import {history} from "../../../helpers/history";

class DeleteClass extends Component{
    constructor(props){
        super(props)
        this.deleteClass = this.deleteClass.bind(this)
    }

    deleteClass(classId, userId){
        classService.deleteClass(classId, userId)
            .then(
                history.push('/classes')
            )
    }

    render(){
        const {classDetail, user} = this.props
        return(
            <div className="ui-box has-border-radius">
                <div className="ui-box-title">
                    <span>Delete This Class</span>
                </div>

                <div className="ui-box-content">
                    <a className="btn btn-danger" onClick={() => this.deleteClass(classDetail.id, user.id)}>Confirm delete</a>
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

export default connect(mapStateToProps, null)(DeleteClass);