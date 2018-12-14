import { Car } from './car'

export function DMoroz(routePoints, map) {
    var car = new Car({
        iconLayout: ymaps.templateLayoutFactory.createClass(
            '<div class="ded ded-$[properties.direction]"></div>'
        )
    });

    var points = [
        routePoints['Великий Новгород'],
        {
            type: 'viaPoint',
            point: routePoints['Залучье'],
        },
        {
            type: 'viaPoint',
            point: routePoints['Пролетарий'],
        },
        routePoints['Боровичи']
    ]

    console.log(points)

    //Маршрут Деда Мороза
    ymaps.route(points).then(function(route) {
        // Добавление маршрута на карту
        map.geoObjects.add(route);
        // И "Деда" туда же
        map.geoObjects.add(car);
    })
}