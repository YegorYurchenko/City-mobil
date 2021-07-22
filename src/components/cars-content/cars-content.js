import React, { Component } from 'react';
import Searcher from '../searcher';
import CarsTable from '../cars-table';
import { getData, sortCarsAsc, sortCarsDesc } from '../../services/cars-service';

class CarsContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            sortingCars: 'ASC',
            inputValue: '',
            cars: [],
            tariffsList: [],
        };
    }

    componentDidMount() {
        getData()
            .then((result) => {
                this.setState(
                    {
                        loading: false,
                        cars: result.cars,
                        tariffsList: result.tariffsList,
                    });
                })
            .catch((e) => {
                console.error(e);
            });
    }

    filterCars = (cars, inputValue) => {
        const filteredCars = cars.filter(car => `${car.mark.toLowerCase()} ${car.model.toLowerCase()}`.indexOf(inputValue) >= 0);
        return filteredCars;
    }

    onSearchChange = (inputValue) => {
        this.setState({ inputValue });
    }

    onSortCarsChange = () => {
        this.setState((prevState) => {
            if (prevState.sortingCars === 'ASC') {
                return {
                    sortingCars: 'DESC',
                    cars: sortCarsDesc(prevState.cars),
                };
            }

            return {
                sortingCars: 'ASC',
                cars: sortCarsAsc(prevState.cars),
            };
        });
    }

    render() {
        let { loading, inputValue, cars, tariffsList } = this.state;

        if (inputValue) {
            cars = this.filterCars(cars, inputValue);
        }

        return (
            <section className="cars-content">
                <Searcher onSearchChange={this.onSearchChange} />
                <CarsTable loading={loading} cars={cars} tariffsList={tariffsList} onSortCarsChange={this.onSortCarsChange} />
            </section>
        );
    }
}

export default CarsContent;
