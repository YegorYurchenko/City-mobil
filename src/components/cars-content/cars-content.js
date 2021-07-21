import React from 'react';
import Searcher from '../searcher';
import CarsTable from '../cars-table';

const CarsContent = () => (
    <section className="cars-content">
        <Searcher />
        <CarsTable />
    </section>
);

export default CarsContent;
