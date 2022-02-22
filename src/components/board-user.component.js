import React, {Component} from "react";

import UserService from "../redux/services/user.service";
import {getDialog, setMessage} from "../redux/actions/support";
import EventBus from "../common/EventBus";
import {connect} from "react-redux";
import {Scrollbars} from 'react-custom-scrollbars';
import TimeAgo from "javascript-time-ago";
import ru from 'javascript-time-ago/locale/ru.json'

class BoardUser extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.findDialog = this.findDialog.bind(this);

        this.state = {
            content: "",
            value: ''

        };
        this.d = <></>

    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let mess = {
            username: '',
            message: '',

        };
        mess.username = this.props.user.username
        mess.message = this.state.value
        this.props.setMessage(this.props.user.username, mess);
        this.setState({value: ''});
    }
    findDialog(){
        // do whatever you like here
        if(this.props.dialog.length>0){
        this.props.getDialog(this.props.dialog[0].username);}
        setTimeout(this.findDialog, 5000);
    }

    componentDidMount() {

        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );

        this.props.getDialog(this.props.user.username).then(this.findDialog);
        this.d = this.props.dialog.map(message =>
            <>
                if (message.username === this.props.user.username) {
                <div className="d-flex flex-row justify-content-start">
                    <div>
                        <p className="small p-2 ms-3 mb-1 rounded-3">{message.message}</p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted">{message.dateTime}</p>
                    </div>
                </div>
            } else {

                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                    <div>
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{message.message}</p>
                        <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{message.dateTime}</p>
                    </div>

                </div>
            }


            </>
        )
    }


    render() {
        const messagesEndRef = React.createRef()
        TimeAgo.addLocale(ru)
        const timeAgo = new TimeAgo('ru');
        return (
            <>

                <section>
                    <div className="container  row d-flex justify-content-center ">

                        <div className="col-md-12 col-lg-12 col-xl-9">

                            <div className="card" id="chat2">
                                <div className="card-header d-flex justify-content-between align-items-center ">
                                    <h5 className="">Chat</h5>
                                </div>
                                <Scrollbars  style={{height: 600}} scrollTop={0}>
                                    <div className="card-body " data-mdb-perfect-scrollbar="true">

                                        {
                                            this.props.dialog.map(message =>

                                                message.username !== this.props.user.username ? (
                                                    <div key={message.id} id={message.id}
                                                         className="d-flex flex-row justify-content-start">
                                                        <div>
                                                            <p className="small p-2 ms-3 mb-1 text-white rounded-3 bg-secondary">{message.message}</p>
                                                            <p className="small ms-3 mb-3 rounded-3 text-muted">{timeAgo.format(Date.parse((message.dateTime)))}</p>
                                                        </div>
                                                    </div>
                                                ) : (

                                                    <div key={message.id}
                                                         className="d-flex flex-row justify-content-end mb-4 pt-1">
                                                        <div>
                                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{message.message}</p>
                                                            <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{timeAgo.format(Date.parse((message.dateTime)))}</p>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                    <div ref={messagesEndRef} />
                                </Scrollbars>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>
                                            Essay:
                                            <textarea className={"form-control"} value={this.state.value}
                                                      onChange={this.handleChange}/>
                                        </label>
                                        <input className={"btn btn-primary"} type="submit" value="Submit"/>
                                    </div>
                                </form>
                            </div>

                        </div>


                    </div>

                </section>


            </>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {dialog} = state.support;
    return {
        user,
        dialog
    };
}

const mapDispatchToProps = {
    setMessage, getDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardUser);
