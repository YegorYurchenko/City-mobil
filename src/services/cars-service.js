import axios from 'axios';

export const getData = async () => {
    let cars = null;
    let tariffsList = null;
    // Получаем данные всех машин
    await axios({
        method: 'get',
        url: 'https://city-mobil.ru/api/cars',
    })
        .then((response) => {
            switch (response.status) {
                case 200:
                    cars = response.data.cars;
                    tariffsList = response.data.tariffs_list;
                    break;
                default:
                    console.error('Что-то пошло не так!');
                    break;
            }
        })
        .catch((e) => {
            console.error(e);
        });
    
    return {
        cars,
        tariffsList
    };
}