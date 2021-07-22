import React from 'react';

const SelectedCar = ({ selectedCarData }) => {
    if (!selectedCarData) {
        return null;
    }

    return (
        <div className="selected-car">
            <span className="selected-car__text">{ selectedCarData }</span>
        </div>
    );
}

export default SelectedCar;
