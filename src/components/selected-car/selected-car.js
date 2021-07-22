import React from 'react';
import PropTypes from 'prop-types';

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

SelectedCar.propTypes = {
    selectedCarData: PropTypes.string,
};

export default SelectedCar;
