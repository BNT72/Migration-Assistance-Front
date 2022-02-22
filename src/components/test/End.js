import React, { useEffect, useState } from 'react';



const End = ({ results, data, onReset, onAnswersCheck, time }) => {
    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        let correct = 0;
        results.forEach((result, index) => {
            if(result.a === data[index].answer) {
                correct++;
            }
        });
        setCorrectAnswers(correct);
        // eslint-disable-next-line
    }, []);

    return(
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h3>Ваш результат</h3>
                    <p>{correctAnswers} из {data.length}</p>
                    <p><strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
                    <p><strong>Время выполнения</strong> {formatTime(time)}</p>
                </div>
            </div>
        </div>
    );
}

export default End;


const formatTime = time => {
    if(time < 60) {
        return time < 10 ? `0${time}s` : `${time}s`;
    }else {
        return Math.floor(time / 60) + 'm' + (time % 60) + 's';
    }
}