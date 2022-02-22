import React, {Component} from "react";

import UserService from "../redux/services/user.service";
import MapContainer from "./map/MapContainer";
import store from "../store";
import {getTest} from "../redux/actions/test";
import Test from "./test/Test";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (

            <div className="container ">
                <header className="jumbotron">
                    <h3>Помощь в получении гражданства
                    </h3>
                </header>
                <div>Миграционные услуги для иностранцев требуют от исполнителей безупречного знания законодательства,
                    большого опыта и ответственного подхода к своей работе. Наши специалисты вас грамотно
                    проконсультируют, для получения консультации перейдите на страницу службы поддержки.
                </div>
                <div>
                Также вы можете найти необходимые адреса для оформления и подачи документов на нашей интерактивной карте
                </div>

                <MapContainer/>
            </div>
        );
    }
}



