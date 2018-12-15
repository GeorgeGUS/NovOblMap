import { Car } from './car'

export function DMoroz (cehCoords, map) {
  var ded = new Car({
    iconLayout: ymaps.templateLayoutFactory.createClass(
      '<div class="ded ded-$[properties.direction]"></div>'
    )
  })
  map.geoObjects.add(ded)

  var points = [
    [cehCoords['Великий Новгород'], cehCoords['Залучье']],
    [cehCoords['Залучье'], cehCoords['Пролетарий']],
    [cehCoords['Пролетарий'], cehCoords['Боровичи']]
  ]

  function delay (fn, ms) {
    return function() {
      setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  }

  var stopJumping = delay(function (geoObject) {
    geoObject.properties.set('direction', '')
  }, 1000)

  // Для отладки дёргания Деда
  // var arrows = {
  //   w: '←',
  //   sw: '↙',
  //   s: '↓',
  //   se: '↘',
  //   e: '→',
  //   ne: '↗',
  //   n: '↑',
  //   nw: '↖'
  // }

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
            // console.log(arrows[direction.t])
            geoObject.geometry.setCoordinates(coords)
            geoObject.properties.set('direction', direction.t)
          },
          function (geoObject) {
            geoObject.properties.set('direction', 'jump')
            stopJumping(geoObject)

            var nextCall = delay(addDedRoute, 1500)
            nextCall(points)
          }
        )
      })
    }
  }

  var startDedWalking = delay(addDedRoute, 3000)

  // Запускаем Деда Мороза гулять через 5 секунд.
  startDedWalking(points)
}
