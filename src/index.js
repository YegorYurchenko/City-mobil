import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';

import './styles/app.scss';

ReactDOM.render(
    <ErrorBoundry>
        <App />
    </ErrorBoundry>,
    document.getElementById('root'),
);
