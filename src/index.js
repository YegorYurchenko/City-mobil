import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import CarsService from './services/cars-service';
import { CarsServiceProvider } from './components/cars-service-context';

import './styles/app.scss';

const carsService = new CarsService();

ReactDOM.render(
    <ErrorBoundry>
        <CarsServiceProvider value={carsService}>
            <App />
        </CarsServiceProvider>
    </ErrorBoundry>,
    document.getElementById('root'),
);
