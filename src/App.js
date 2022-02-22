import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route, Router, Switch} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardTest from "./components/test.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import {logout} from "./redux/actions/auth";
import {clearMessage} from "./redux/actions/message";

import {history} from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Test from "./components/test/Test";
import {NavDropdown} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import GR from "./components/info/GR";
import RVP from "./components/info/RVP";
import VNZ from "./components/info/VNZ";

import logo from "./img/logo.png"

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };

        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }

    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        this.props.dispatch(logout());
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const {currentUser, showModeratorBoard, showAdminBoard} = this.state;

        return (
            <Router history={history}>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-between">

                        <div className="navbar-nav mr-auto">

                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                <img src={logo} style={{height:30,width:40}}/>

                                </Link>

                            </li>

                            <NavDropdown title={"FAQ"} menuVariant="dark">
                                <DropdownItem className="dropdown-item"> <Link to={"/GR"} className="nav-link">
                                    Гражданство
                                </Link></DropdownItem>
                                <DropdownItem className="dropdown-item"> <Link to={"/RVP"} className="nav-link">
                                    РВП
                                </Link></DropdownItem>
                                <DropdownItem className="dropdown-item"> <Link to={"/VNZ"} className="nav-link">
                                    Вид на жительство
                                </Link></DropdownItem>
                            </NavDropdown>


                            {showModeratorBoard && (
                                <li className="nav-item">
                                    <Link to={"/mod"} className="nav-link">
                                        Служба поддержки
                                    </Link>
                                </li>
                            )}

                            {showAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link">
                                        Admin Board
                                    </Link>
                                </li>
                            )}

                            {currentUser && !showModeratorBoard && (
                                <li className="nav-item">
                                    <Link to={"/user"} className="nav-link">
                                        Служба поддержки
                                    </Link>
                                </li>
                            )}
                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/test"} className="nav-link">
                                        Комплексное тестирование
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        Выйти
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Войти
                                    </Link>
                                </li>

                                <li className="nav-item my-sm-0">
                                    <Link to={"/register"} className="nav-link">
                                        Регистрация
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/GR" component={GR}/>
                            <Route exact path="/RVP" component={RVP}/>
                            <Route exact path="/VNZ" component={VNZ}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route path="/user" component={BoardUser}/>
                            <Route path="/test" component={BoardTest}/>
                            <Route path="/mod" component={BoardModerator}/>
                            <Route path="/admin" component={BoardAdmin}/>
                            <Route path="/test/start" component={Test}/>
                        </Switch>
                    </div>

                    {/* <AuthVerify logOut={this.logOut}/> */}
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {testValue} = state.test;
    return {
        user, testValue
    };

}

export default connect(mapStateToProps)(App);
