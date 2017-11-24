import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Classes from "../../components/class/Classes";
import CreateClassModal from "../../components/class/views/CreateClassModal";
import {classActions} from "../../actions";

class ClassesPage extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    static defaultProps = {
        // classes:[{
        //     id: 1,
        //     profilePictureUrl: '/images/cover_photo.jpg',
        //     fullName: 'Chung ta la Anh em',
        //     memberCount: 489,
        //     description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        // },{
        //     id: 2,
        //     profilePictureUrl: '/images/cover_photo.jpg',
        //     fullName: 'Chung ta la Anh em',
        //     memberCount: 489,
        //     description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        // },{
        //     id: 3,
        //     profilePictureUrl: '/images/cover_photo.jpg',
        //     fullName: 'Chung ta la Anh em',
        //     memberCount: 489,
        //     description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        // },{
        //     id: 4,
        //     profilePictureUrl: '/images/cover_photo.jpg',
        //     fullName: 'Chung ta la Anh em',
        //     memberCount: 489,
        //     description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        // },{
        //     id: 5,
        //     profilePictureUrl: '/images/cover_photo.jpg',
        //     fullName: 'Chung ta la Anh em',
        //     memberCount: 489,
        //     description: 'Mục tiêu của group: Tập hợp sinh viên theo học CNTT của ĐHBKHN K60 và các Khóa trên để cùng nhau chia sẻ kinh nghiệm học tập, giải đáp các thắc mắc, bài tập liên quan, chia sẻ tài liệu, giáo trình, tìm nhóm bài tập lớn, tim môn dễ kiếm điểm,... và chém gió ngoài lề cho cuộc đời sinh viên thêm thú vị',
        // }]
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(classActions.getAll());
    }

    createClass = (className, membersInvited) => {
        this.setState({modalIsOpen: false});
        this.props.dispatch(classActions.insert(className));
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <div className="container">
                    <div className="classes clearfix">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-12">
                                    <div className="classes-header clearfix">
                                        <span className="current">Classes</span>
                                        <div className="pull-right">
                                            <a className="btn btn-primary btn-create-group" href="javascript:;"
                                               onClick={this.openModal}>
                                                <i className="fa fa-plus"></i>
                                                Create Class
                                            </a>
                                            <CreateClassModal modalIsOpen={this.state.modalIsOpen}
                                                              closeModal={this.closeModal}
                                                              onSubmit={this.createClass}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <Classes classes={classes}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classes = state.classes.items
    return {
        classes
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassesPage));