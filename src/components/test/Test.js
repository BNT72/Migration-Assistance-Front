import React, {useState, useEffect} from 'react';
import '../../App.css';

import Start from './Start';
import Question from './Question';
import End from './End';
import Modal from './Modal';
import store from "../../store";
import {getTest} from "../../redux/actions/test";
import history from '../../img/history_test.png'
import law from '../../img/law_test.png'
import rus from '../../img/rus_test.png'

let interval;

function Test() {
    const [step, setStep] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [time, setTime] = useState(0);
    const state = store.getState();
    const [type,setType]=useState("")
    useEffect(() => {
        if (step === 3) {
            clearInterval(interval);
        }
    }, [step]);

    const quizStartHandler = () => {
        setStep(2);
        interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
    }

    const resetClickHandler = () => {
        setActiveQuestion(0);
        setAnswers([]);
        setStep(2);
        setTime(0);
        interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
    }

    const goTestR = () => {
        store.dispatch(getTest("RUSSIAN"));
        setStep(1);
        // this.val=<Test stepw={1}/>
        setType("Русский язык")
    }

    const goTestH = () => {
        store.dispatch(getTest("HISTORY"));
        setStep(1);
        setType("История россии")
        // this.val=<Test stepw={1}/>


    }

    const goTestB = () => {
        store.dispatch(getTest("BASIS_OF_LEGISLATION"));
        setStep(1);
        setType("Основы законодательства")
        // this.val=<Test stepw={1}/>


    }



    return (
        <>
            <div className="card-group  ">
                <div className="card m-2" onClick={goTestR}>
                    <h5 className="card-title text-center">
                        <img className="card-img-top" src={rus} style={{height: 100, width: 100}} alt="Card image cap"/> <br/>
                        Русский язык
                    </h5>
                </div>
                <div className="card m-2" onClick={goTestH}>
                    <h5 className="card-title text-center">
                        <img className="card-img-top" src={history} style={{height: 100, width: 100}} alt="Card image cap"/><br/>
                        История России
                    </h5>
                </div>
                <div className="card m-2" onClick={goTestB}>
                    <h5 className="card-title text-center">
                        <img className="card-img-top" src={law} style={{height: 100, width: 100}} alt="Card image cap"/><br/>
                        Основы законодательства РФ
                    </h5>
                </div>
            </div>
            <div className="Test">

                {step === 1 && <Start onQuizStart={quizStartHandler} tp={type} />}
                {step === 2 && <Question
                    data={state.test.testValue[activeQuestion]}
                    onAnswerUpdate={setAnswers}
                    numberOfQuestions={state.test.testValue.length}
                    activeQuestion={activeQuestion}
                    onSetActiveQuestion={setActiveQuestion}
                    onSetStep={setStep}
                />}
                {step === 3 && <End
                    results={answers}
                    data={state.test.testValue}
                    onReset={resetClickHandler}
                    onAnswersCheck={() => setShowModal(true)}
                    time={time}
                />}

                {showModal && <Modal
                    onClose={() => setShowModal(false)}
                    results={answers}
                    data={state.test.testValue}
                />}
            </div>
        </>
    );
}

export default Test;
