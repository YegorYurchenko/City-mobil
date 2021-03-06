import React, { Component } from 'react';
import Spinner from '../spinner';
import PropTypes from 'prop-types';

class CarsTable extends Component {
    componentDidMount() {
        this.tableWrapper = React.createRef();
        this.table = React.createRef();
        this.carsTitleSvg = React.createRef();
        this.tableBody = React.createRef();

        this.classes = {
            desktop: 'desktop',
            'desktopShort': 'desktopShort',
            mobile: 'mobile',
            rotate: 'rotate',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loading === true && !this.props.loading) {
            // Из-за scroll
            this.windowResize();
        }

        if (prevProps.cars.length !== this.props.cars) {
            // Изменяем ширину таблицы (т.к. пропадает scroll)
            this.correctTableWidth();
        }
    }

    windowResize = () => {
        this.correctTable();

        window.addEventListener('resize', () => {
            this.correctTable();
        });
    }

    correctTableWidth() {
        if (window.innerWidth > 480) {
            if (this.tableWrapper.current.offsetHeight >= this.table.current.scrollHeight) {
                this.tableWrapper.current.classList.remove(this.classes.mobile);
                this.tableWrapper.current.classList.remove(this.classes.desktop);
                this.tableWrapper.current.classList.add(this.classes.desktopShort);
            } else {
                this.tableWrapper.current.classList.remove(this.classes.mobile);
                this.tableWrapper.current.classList.remove(this.classes.desktopShort);
                this.tableWrapper.current.classList.add(this.classes.desktop);
            }
        }
    }

    correctTable = () => {
        if (window.innerWidth > 480) {
            this.tableWrapper.current.classList.remove(this.classes.mobile);
            this.tableWrapper.current.classList.add(this.classes.desktop);
        } else {
            this.tableWrapper.current.classList.remove(this.classes.desktop);
            this.tableWrapper.current.classList.add(this.classes.mobile);
        }
    }

    sortCars = () => {
        const { onSortCarsChange } = this.props;

        let ua = window.navigator.userAgent.toLowerCase();
        let is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
        
        if (!is_ie) {
            this.carsTitleSvg.current.classList.toggle(this.classes.rotate);
        }

        onSortCarsChange();
    };

    selectCar = (e) => {
        const { onCarClick } = this.props;
    
        const year = e.target.innerHTML;
        const carTitle = e.target.parentElement.getAttribute('data-car-title');

        if (isNaN(year)) {
            onCarClick(carTitle);
        } else {
            onCarClick(carTitle, year);
        }
    }

    renderRow = (car, id) => {
        return <CarsTableRow
            key={`car_${id}`}
            tariffsList={this.props.tariffsList}
            title={`${car.mark} ${car.model}`}
            tariffs={car.tariffs}
        />
    };

    render() {
        const { loading, cars, tariffsList } = this.props;
        const columnWidth = `${tariffsList.length + 1}%`;

        if (loading) {
            return <Spinner />
        }

        return (
            <div className="cars-table scrollable" ref={this.tableWrapper}>
                <table className="cars-table__table" ref={this.table}>
                    <thead className="cars-table__head">
                        <tr className="cars-table__row">
                            <th className="cars-table__row-item-head" style={{ width: columnWidth }} onClick={this.sortCars}>
                                <div className="cars-table__row-item-head-inner">
                                    <span className="cars-table__row-item-head-text">Марка и модель</span>
                                    <svg ref={this.carsTitleSvg} className="cars-table__row-item-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)"> <path d="M13.8333 7.5H10.5V2.5H5.49996V7.5H2.16663L7.99996 13.3333L13.8333 7.5ZM2.16663 15V16.6667H13.8333V15H2.16663Z" fill="#7B8395" /></g>
                                        <defs><clipPath id="clip0"><rect width="16" height="16" fill="white" /></clipPath></defs>
                                    </svg>
                                </div>
                            </th>
                            {tariffsList.map((tariff, idx) => {
                                return <th className="cars-table__row-item-head" key={`title_${idx}`} style={{ width: columnWidth }}>{tariff}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody className="cars-table__body" ref={this.tableBody} onClick={this.selectCar}>
                        {cars.map(this.renderRow)}
                    </tbody>
                </table>
            </div>
        );
    }
}

CarsTable.propTypes = {
    loading: PropTypes.bool,
    cars: PropTypes.array,
    tariffsList: PropTypes.array,
    onSortCarsChange: PropTypes.func,
    onCarClick: PropTypes.func,
};

const CarsTableRow = ({ tariffsList, title, tariffs }) => {
    const columnWidth = `${tariffsList.length + 1}%`;

    return (
        <tr className="cars-table__row" data-car-title={title}>
            <th className="cars-table__row-item">{title}</th>
            {tariffsList.map((tariff, idx) => {
                const tariffExisting = tariffs[tariff];

                let tariffYear = '-'
                if (tariffExisting) {
                    tariffYear = tariffExisting.year;
                }

                return <th className="cars-table__row-item" key={`carInfo_${idx}`} style={{ width: columnWidth }}>{tariffYear}</th>
            })}
        </tr>
    );
};

CarsTableRow.propTypes = {
    tariffsList: PropTypes.array,
    title: PropTypes.string,
    tariffs: PropTypes.object,
};

export default CarsTable;
