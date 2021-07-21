import axios from 'axios';

export default class CarsService {
    constructor() {
        this.tariffsList = null;
        this.cars = null;

        // Получаем данные всех машин
        axios({
            method: 'get',
            url: 'https://city-mobil.ru/api/cars',
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        this.cars = response.data.cars;
                        this.tariffsList = response.data.tariffsList;
                        break;
                    default:
                        console.error('Что-то пошло не так!');
                        break;
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }

    getCars() {
        return this.cars;
    }

    getTariffsList() {
        return this.tariffsList;
    }
}
