import React, {Component} from "react";

import UserService from "../redux/services/user.service";
import EventBus from "../common/EventBus";
import {getAllDialogs, getDialog, setMessage} from "../redux/actions/support";
import {connect} from "react-redux";
import TimeAgo from "javascript-time-ago";
import ru from 'javascript-time-ago/locale/ru.json'
import {Scrollbars} from "react-custom-scrollbars";

class BoardModerator extends Component {
    constructor(props) {
        super(props);
        this.getMessages = this.getMessages.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.findDialogs = this.findDialogs.bind(this);
        this.findDialog = this.findDialog.bind(this);
        this.state = {
            content: "",
            currentDialog:[],
            currentDialogName:"",
            value:""
        };

    }

     findDialogs(){
        // do whatever you like here
         this.props.getAllDialogs().then()
        setTimeout(this.findDialogs, 5000);
    }

    findDialog(){
        // do whatever you like here
        this.props.getDialog(this.props.dialog[0].username);
        setTimeout(this.findDialog, 5000);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        let mess = {
            username: '',
            message: ''
        };
        mess.username = this.props.user.username
        mess.message = this.state.value
        this.props.setMessage(this.props.dialog[0].username, mess);
        this.setState({value: ''});


    }
    getMessages(dialog) {
        this.props.getDialog(dialog.username).then(this.findDialog);

        // this.setState({currentDialog:dialog.messages,currentDialogName:dialog.username})
       // this.props.dialog=messages
    }
    componentDidMount() {
        UserService.getModeratorBoard().then(
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
        // this.props.getAllDialogs().then()
        // while (true) {

        this.findDialogs()

    }



    render() {

    
        TimeAgo.addLocale(ru)
        const timeAgo=new TimeAgo('ru');
     // timeAgo.addLocale(ru)


        return (
            <div>

                <div>
                    <div className="container py-5">

                        <div className="row">
                            <div className="col-md-12">

                                <div className="card" id="chat3">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">

                                                <div className="p-3">

                                                    <div data-mdb-perfect-scrollbar="true">
                                                        <ul className="list-unstyled mb-0">

                                                            {this.props.dialogs.map(dialog =>
                                                                <li key={dialog.id} className="p-2 border-bottom">
                                                                    <span  onClick={() => this.getMessages(dialog)}
                                                                       className="d-flex justify-content-between">
                                                                        <div className="d-flex flex-row">
                                                                            <div className="pt-1">
                                                                                <p className="fw-bold mb-0">   {dialog.username}</p>
                                                                                <p className="small text-muted">{dialog.messages[dialog.messages.length-1].message}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="pt-1">
                                                                            <p className="small text-muted mb-1">
                                                                                <br/>
                                                                                {timeAgo.format(Date.parse((dialog.messages[dialog.messages.length-1].dateTime)))}
                                                                            </p>

                                                                        </div>
                                                                    </span>


                                                                </li>
                                                                )}
                                                        </ul>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-md-6 col-lg-7 col-xl-8">

                                                <div className="pt-3 pe-3" data-mdb-perfect-scrollbar="true">
                                                    <Scrollbars style={{ height: 600}}>
                                                        <div className="card-body " data-mdb-perfect-scrollbar="true">

                                                            {
                                                                this.props.dialog.map(message =>

                                                                    message.username !== this.props.user.username ? (
                                                                        <div key={message.id} id={message.id}
                                                                             className="d-flex flex-row justify-content-start">
                                                                            <div>
                                                                                <p className="small p-2 ms-3 mb-1 mb-1 text-white  rounded-3 bg-secondary">{message.message}</p>
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

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                {/*<div className="row">*/}

                {/*    <div className="col-1">*/}
                {/*        <div className="list-group">*/}
                {/*            {this.props.dialogs.map(dialog =>*/}
                {/*                <button key={dialog.username} type="button"*/}
                {/*                        className="list-group-item list-group-item-action">*/}
                {/*                    {dialog.username}*/}
                {/*                </button>*/}
                {/*            )}*/}

                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="col-8">*/}

                {/*    </div>*/}
                {/*</div>*/}

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    const {dialogs,dialog} = state.support;
    return {
        user,
        dialogs,
        dialog
    };
}

const mapDispatchToProps = {
    setMessage, getAllDialogs,getDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardModerator);
