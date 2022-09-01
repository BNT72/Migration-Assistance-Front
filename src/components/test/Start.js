import React from 'react';

const Start = ({ onQuizStart,tp }) => {
    return(
        <div className="card">
            <div className="card-content">
                <div className="content">
                    <h1>Тест на тему</h1>
                    <h1>{tp}</h1>
                    <button className="button is-info is-medium" onClick={onQuizStart}>Начать</button>
                </div>
            </div>
        </div>
    );
}

export default Start;