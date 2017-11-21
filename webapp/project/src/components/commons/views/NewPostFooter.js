import React, {Component} from 'react'

class NewPostFooter extends Component{
    render(){
        const {classFullName} = this.props
        return(
            <div className="new-post-footer">
                <button className="btn btn-primary" type="button">POST</button>
                <span className="class-full-name">{classFullName}</span>
            </div>
        )
    }
}

export default NewPostFooter;