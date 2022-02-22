import React, {Component} from "react";
import {connect} from "react-redux";
import {getTest} from "../redux/actions/test";
import Test from "./test/Test";
import store from "../store";


class BoardTest extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="container">
                <div>
                    Комплексный экзамен состоит из 3 модулей, позволяющих наиболее объективно подойти к оценке знаний
                    кандидата:
                </div>



                <Test/>
            </div>
        );
    }
}

function mapStateToProps(state) {

    const {testValue} = state.test;
    return {
        testValue
    };
}

export default connect(mapStateToProps)(BoardTest);
