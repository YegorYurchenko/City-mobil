import React, { Component } from 'react';
import withCarsService from '../hoc';
import { getData } from '../../services/cars-service';

class CarsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: [],
            tariffsList: []
        }

        getData()
            .then((result) => {
                this.state = {
                    cars: result.cars,
                    tariffsList: result.tariffsList
                }

                this.setState(
                    {
                        cars: result.cars,
                        tariffsList: result.tariffsList
                    }
                );
            })
            .catch((e) => {
                console.error(e);
            });
    }

    renderRow = (car, id) => {
        return <CarsTableRow
            key = {`car_${id}`}
            tariffsList = {this.state.tariffsList}
            title = {`${car.mark} ${car.model}`}
            tariffs = {car.tariffs}
        />
    };

    render() {
        const columnWidth = `${this.state.tariffsList.length + 1}%`;

        return (
            <div className="cars-table scrollable">
                <table className="cars-table__table">
                    <thead className="cars-table__head">
                        <tr className="cars-table__row">
                            <th className="cars-table__row-item-head" style={{ width: columnWidth }}>
                                <span className="cars-table__row-item-head-text">Марка и модель</span>
                                <svg className="cars-table__row-item-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)"> <path d="M13.8333 7.5H10.5V2.5H5.49996V7.5H2.16663L7.99996 13.3333L13.8333 7.5ZM2.16663 15V16.6667H13.8333V15H2.16663Z" fill="#7B8395" /></g>
                                    <defs><clipPath id="clip0"><rect width="16" height="16" fill="white" /></clipPath></defs>
                                </svg>
                            </th>
                            {this.state.tariffsList.map((tariff, idx) => {
                                return <th className="cars-table__row-item-head" key={`title_${idx}`} style={{ width: columnWidth }}>{tariff }</th>
                            })}
                        </tr>
                    </thead>
                    <tbody className="cars-table__body">
                        {this.state.cars.map(this.renderRow)}
                    </tbody>
                </table>
            </div>
        );
    }
};

const CarsTableRow = ({ tariffsList, title, tariffs }) => {
    const columnWidth = `${tariffsList.length + 1}%`;

    return (
        <tr className="cars-table__row">
            <th className="cars-table__row-item">{title}</th>
            {tariffsList.map((tariff, idx) => {
                const tariffExisting = tariffs[tariff];

                let tariffValue = '-'
                if (tariffExisting) {
                    tariffValue = tariffExisting.year;
                }

                return <th className="cars-table__row-item" key={`carInfo_${idx}`} style={{ width: columnWidth }}>{tariffValue}</th>
            })}
        </tr>
    );
};

export default withCarsService()(CarsTable);
