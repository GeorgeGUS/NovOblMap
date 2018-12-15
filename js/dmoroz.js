import { Car } from './car'

export function DMoroz (routePoints, map, ymaps) {
  var ded = new Car({
    iconLayout: ymaps.templateLayoutFactory.createClass(
      '<div class="ded ded-$[properties.direction]"></div>'
    )
  })
  map.geoObjects.add(ded)

  var points = [
    [routePoints['Великий Новгород'], routePoints['Залучье']],
    [routePoints['Залучье'], routePoints['Пролетарий']],
    [routePoints['Пролетарий'], routePoints['Боровичи']]
  ]

  function delay (fn, ms) {
    return function () {
      var saveThis = this
      var saveArgs = arguments

      setTimeout(function () {
        fn.apply(saveThis, saveArgs)
      }, ms)
    }
  }

  function stopJumping (geoObject) {
    geoObject.properties.set('direction', '')
  }
  var stopDed = delay(stopJumping, 1000)

  // Добавляем рекурсивную функцию перемещения по точкам
  function addDedRoute (points) {
    if (points.length == 0) {
      return null
    } else {
      ymaps.route(points.shift()).then(function (route) {
        ded.moveTo(
          route
            .getPaths()
            .get(0)
            .getSegments(),
          {
            speed: 3000,
            directions: 8
          },
          function (geoObject, coords, direction) {
            geoObject.geometry.setCoordinates(coords)
            geoObject.properties.set('direction', direction.t)
          },
          function (geoObject) {
            geoObject.properties.set('direction', 'jump')
            stopDed(geoObject)

            var nextCall = delay(addDedRoute, 1500)
            nextCall(points)
          }
        )
      })
    }
  }

  var startDedWalking = delay(addDedRoute, 5000)

  //Запускаем Деда Мороза гулять через 5 секунд.
  startDedWalking(points)
}
