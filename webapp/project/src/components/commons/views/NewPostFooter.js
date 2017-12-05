import React, {Component} from 'react'

class NewPostFooter extends Component{
    render(){
        const {className, onSubmit} = this.props
        return(
            <div className="new-post-footer">
                <button className="btn btn-primary" type="button" onClick={onSubmit}>POST</button>
                <span className="class-full-name">{className}</span>
            </div>
        )
    }
}

export default NewPostFooter;