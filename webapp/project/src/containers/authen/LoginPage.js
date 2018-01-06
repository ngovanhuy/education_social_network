import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../../actions';
import {alertAuthenActions} from "../../actions/alertAuthenActions";
import {history} from "../../helpers/history";
import {initData} from "../../middleware/initData";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            initDataAdmin: false,
            initDataClass: false,
            initDataStudent: false,
            initDataTeacher: false,
            initDataLoadStudentEnterClass: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInitDataAdmin = this.handleInitDataAdmin.bind(this);
        this.handleInitDataClass = this.handleInitDataClass.bind(this);
        this.handleInitDataStudent = this.handleInitDataStudent.bind(this);
        this.handleInitDataTeacher = this.handleInitDataTeacher.bind(this);
        this.handleInitDataUserEnterClass = this.handleInitDataUserEnterClass.bind(this);
    }

    componentWillMount() {
        const {dispatch} = this.props;
        history.listen((location, action) => {
            dispatch(alertAuthenActions.clear());
        });
        dispatch(userActions.logout());

        let admin = JSON.parse(localStorage.getItem('admin'))
        let hasDataAdmin = false
        if(admin && admin.id){
            hasDataAdmin = true
        }
        let hasData = JSON.parse(localStorage.getItem('hasData'))
        if (hasData) {
            this.setState({
                initDataAdmin: hasDataAdmin,
                initDataClass: hasData.hasClass,
                initDataStudent: hasData.hasStudent,
                initDataTeacher: hasData.hasTeacher,
                initDataLoadStudentEnterClass: hasData.loadStudentEnterClass,
            })
        } else {
            this.setState({
                initDataAdmin: hasDataAdmin,
            })
        }
    };

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;
        const {dispatch} = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    handleInitDataAdmin(e) {
        e.preventDefault();
        initData.initAdmin().then(
            response => {
                var admin = {
                    "id": response.data.id
                };
                localStorage.setItem('admin', JSON.stringify(admin));
                console.log("Completed init admin user")
            }
        );
        this.setState({
            initDataAdmin: true
        })
    }

    handleInitDataClass(e) {
        e.preventDefault();
        let admin = JSON.parse(localStorage.getItem('admin'))
        if(admin && admin.id){
            initData.initDataClass(admin.id)
            let hasData = JSON.parse(localStorage.getItem('hasData'))
            hasData = {
                ...hasData,
                hasClass: true
            }
            localStorage.setItem('hasData', JSON.stringify(hasData));
            this.setState({
                initDataClass: true
            })
        }
    }

    handleInitDataStudent(e) {
        e.preventDefault();
        initData.initDataUserStudent()
        let hasData = JSON.parse(localStorage.getItem('hasData'))
        hasData = {
            ...hasData,
            hasStudent: true
        }
        localStorage.setItem('hasData', JSON.stringify(hasData));
        this.setState({
            initDataStudent: true
        })
    }

    handleInitDataTeacher(e) {
        e.preventDefault();
        initData.initDataUserTeacher()
        let hasData = JSON.parse(localStorage.getItem('hasData'))
        hasData = {
            ...hasData,
            hasTeacher: true
        }
        localStorage.setItem('hasData', JSON.stringify(hasData));
        this.setState({
            initDataTeacher: true
        })
    }

    handleInitDataUserEnterClass(e) {
        e.preventDefault();
        initData.initDataUserEnterClass()
        let hasData = JSON.parse(localStorage.getItem('hasData'))
        hasData = {
            ...hasData,
            loadStudentEnterClass: true
        }
        localStorage.setItem('hasData', JSON.stringify(hasData));
        this.setState({
            initDataLoadStudentEnterClass: true
        })
    }

    render() {
        const {loggingIn, alertAuthen} = this.props;
        const {username, password, submitted} = this.state;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alertAuthen.message &&
                        <div className={`alert ${alertAuthen.type}`}>{alertAuthen.message}</div>
                        }
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Login</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" value={username}
                                           onChange={this.handleChange}/>
                                    {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={password}
                                           onChange={this.handleChange}/>
                                    {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Login</button>
                                    {loggingIn &&
                                    <img
                                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                                    }
                                    <Link to="/register" className="btn btn-link">Register</Link>
                                </div>
                                <div className="form-group">
                                    <div className="col-button-colors">
                                        {
                                            !this.state.initDataAdmin &&
                                            <button className="btn btn-default" onClick={this.handleInitDataAdmin}>
                                                Init User Admin
                                            </button>
                                        }
                                        {
                                            (this.state.initDataAdmin && !this.state.initDataClass) &&
                                            <button className="btn btn-default" onClick={this.handleInitDataClass}>
                                                Init Class
                                            </button>
                                        }
                                        {
                                            (this.state.initDataAdmin && !this.state.initDataTeacher) &&
                                            <button className="btn btn-default" onClick={this.handleInitDataTeacher}>
                                                Init Teacher
                                            </button>
                                        }
                                        {
                                            (this.state.initDataAdmin && !this.state.initDataStudent) &&
                                            <button className="btn btn-default" onClick={this.handleInitDataStudent}>
                                                Init Student
                                            </button>
                                        }
                                        {
                                            (this.state.initDataAdmin && this.state.initDataStudent &&
                                                this.state.initDataTeacher && !this.state.initDataLoadStudentEnterClass) &&
                                            <button className="btn btn-default"
                                                    onClick={this.handleInitDataUserEnterClass}>
                                                Load Student Enter Class
                                            </button>
                                        }
                                        {
                                            (this.state.initDataAdmin && this.state.initDataStudent &&
                                                this.state.initDataTeacher && this.state.initDataLoadStudentEnterClass) &&
                                                <a href={`/initData/Data.xlsx`} target="_blank">Get Data Imported</a>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loggingIn} = state.authentication;
    const {alertAuthen} = state;
    return {
        loggingIn,
        alertAuthen
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {connectedLoginPage as LoginPage};