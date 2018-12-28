import { Car } from './car'
import { utils } from './utils'

export function DMoroz (ceh, routes, pins) {
  var ded = new Car({
    iconLayout: ymaps.templateLayoutFactory.createClass(
      '<div class="ded ded-$[properties.direction]"></div>'
    )
  })
  myMap.geoObjects.add(ded)

  function coordsShift(coords) {
    return [coords[0] - 0.00005, coords[1] - 0.00005]
  }

  // Задаём точки маршрута Деда Мороза
  global.points = [
    [coordsShift(ceh['Боровичи'].coords), ceh['Боровичи'].coords],
    [ceh['Боровичи'].coords, ceh['Залучье'].coords],
    [ceh['Залучье'].coords, ceh['Пролетарий'].coords],
    [ceh['Пролетарий'].coords, ceh['Великий Новгород'].coords]
  ]

  var targetCehs = ['Боровичи', 'Залучье', 'Пролетарий', 'Великий Новгород']

  var i = 0
  // Запускаем цеха через 1 секунду после начала прыжков
  var launchCehs = utils.delay(function (geoObject, i) {
    // Останавливаем скачущего Деда
    geoObject.properties.set('direction', '')

    // Рисуем маршруты (линии) от цехов до пунктов
    routes.drawCehRoutes(targetCehs[i])

    // Рисуем активные пины поверх старых
    // (с небольшой задержкой на отрисовку маршрутов)
    var drawPinsAndDed = utils.delay(function (i) {
      

      // Если ещё есть цеха, добавляем нового Деда
      if (i + 1 < targetCehs.length) {
        myMap.geoObjects.add(ded)
      } else {
        console.log('Карта запущена')
        myMap.geoObjects.remove(ded)
        // Если все цеха запущены, отправляем событие 
        var evt = new Event('launchLeaving')
        window.dispatchEvent(evt)
      }
    }, 20)

    pins.drawPins(ceh[targetCehs[i]].pins)
    drawPinsAndDed(i)
  }, 1000)

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
            directions: 2
          },
          function (geoObject, coords, direction) {
            geoObject.geometry.setCoordinates(coords)
            geoObject.properties.set('direction', direction.t)
          },
          function (geoObject) {
            geoObject.properties.set('direction', 'jump')
            launchCehs(geoObject, i++)

            // Делаем паузу в 1.5 секунды на запуск цеха
            var nextCall = utils.delay(addDedRoute, 1500)
            nextCall(points)
          }
        )
      })
    }
  }

  return function () {
    addDedRoute(points)
  }
}
