import { Car } from './car'

export function DMoroz(routePoints, map, ymaps) {
    var ded = new Car({
        iconLayout: ymaps.templateLayoutFactory.createClass(
            '<div class="ded ded-$[properties.direction]"></div>'
        )
    });
    console.log(ded)

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

    //Маршрут Деда Мороза
    ymaps.route(points).then(function(route) {
        // Добавление маршрута на карту
        // map.geoObjects.add(route); //Можно оставить для отладки
        // И "Деда" туда же
        map.geoObjects.add(ded);
        // Отправляем машинку по полученному маршруту
        ded.moveTo(route.getPaths().get(0).getSegments(), {
            speed: 4000,
            directions: 8
        }, function (geoObject, coords, direction) { // тик движения
            // перемещаем машинку
            geoObject.geometry.setCoordinates(coords);
            // ставим машинке правильное направление - в данном случае меняем ей текст
            geoObject.properties.set('direction', direction.t);

        }, function (geoObject) { // приехали
            // geoObject.properties.set('balloonContent', "Приехали!");
            // geoObject.balloon.open();
            // ded.stop()
        });

        
    })
}