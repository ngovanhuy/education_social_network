import React, {Component} from 'react'

class AddMember extends Component{
    render(){
        const {memberCount} = this.props
        return(
            <div>
                <div className="add-member">
                    <h3>
                        Add members
                        <a href="#">
                            <span className="pull-right">{memberCount} members</span>
                        </a>
                    </h3>

                    <div className="controls">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-plus"></i>
                            </span>
                            <input type="text" className="form-control" placeholder="Enter name or email address"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddMember;