import React from 'react';
import icon from './error.png';

const ErrorIndicator = () => (
    <div className="error-indicator">
        <img className="error-indicator__img" src={icon} alt="error-icon" />
        <h1 className="error-indicator__title">Упс...</h1>
        <span className="error-indicator__subtitle">Кажется что-то пошло не так, перезагрузите, пожалуйста, страницу.</span>
    </div>
);

export default ErrorIndicator;
