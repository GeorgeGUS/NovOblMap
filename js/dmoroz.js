import { Car } from './car'
import { drawRoutes } from './routes'
import { drawPins } from './pins'

export function DMoroz (ceh, map) {
  var ded = new Car({
    iconLayout: ymaps.templateLayoutFactory.createClass(
      '<div class="ded ded-$[properties.direction]"></div>'
    )
  })
  map.geoObjects.add(ded)

  var points = [
    [[58.5228, 31.2699], ceh['Великий Новгород'].coords],
    [ceh['Великий Новгород'].coords, ceh['Залучье'].coords],
    [ceh['Залучье'].coords, ceh['Пролетарий'].coords],
    [ceh['Пролетарий'].coords, ceh['Боровичи'].coords]
  ]

  var targetCehs = ['Великий Новгород', 'Залучье', 'Пролетарий', 'Боровичи']

  function delay (fn, ms) {
    return function () {
      setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  }

  var launchCehs = delay(function (geoObject, i) {
    //Останавливаем скачущего Деда
    geoObject.properties.set('direction', '')

    // Рисуем маршруты (линии) от цехов до пунктов
    drawRoutes(ceh, targetCehs[i], map)

    // Рисуем активные пины поверх старых
    drawPins(map, ceh[targetCehs[i]].pins, true)

    // Добавляем нового Деда, чтобы он был сверху
    map.geoObjects.add(ded)
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

  var i = 0

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
            launchCehs(geoObject, i++)

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
