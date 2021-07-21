import React from 'react';

const { 
    Provider: CarsServiceProvider,
    Consumer: CarsServiceConsumer,
} = React.createContext();

export { CarsServiceProvider, CarsServiceConsumer };
