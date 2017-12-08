import React, {Component} from 'react'

class NewPostFooter extends Component{
    render(){
        const {className, onSubmit} = this.props
        return(
            <div className="new-post-footer">
                <a href="#" className="btn btn-primary" type="button" onClick={onSubmit}>POST</a>
                <span className="class-full-name">{className}</span>
            </div>
        )
    }
}

export default NewPostFooter;