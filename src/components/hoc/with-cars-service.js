import React from 'react';
import { CarsServiceConsumer } from '../cars-service-context';

const withCarsService = () => (Wrapped) => (props) => (
    <CarsServiceConsumer>
        {
            (carsService) => (
                <Wrapped {...props}
                    carsService={carsService} />
            )
        }
    </CarsServiceConsumer>
);

export default withCarsService;
