import axios from 'axios';

const getData = async () => {
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
                    cars = sortCarsAsc(response.data.cars);
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
        tariffsList,
    };
}

const sortCarsAsc = (cars) => {
    return cars.sort((a, b) => {
        const first = `${a.mark.toLowerCase()} ${a.model.toLowerCase()}`;
        const second = `${b.mark.toLowerCase()} ${b.model.toLowerCase()}`;
        if (first > second) return 1;
        if (first < second) return -1;
    });
}

const sortCarsDesc = (cars) => {
    return cars.sort((a, b) => {
        const first = `${a.mark.toLowerCase()} ${a.model.toLowerCase()}`;
        const second = `${b.mark.toLowerCase()} ${b.model.toLowerCase()}`;
        if (first < second) return 1;
        if (first > second) return -1;
    });
}

export { getData, sortCarsAsc, sortCarsDesc };
