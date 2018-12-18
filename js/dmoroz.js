import { Car } from './car'
import { drawRoutes } from './routes'
import { drawPins } from './pins'
import { utils } from './utils'

export function DMoroz (data, dedNode) {
  var ded = new Car({
    iconLayout: ymaps.templateLayoutFactory.createClass(
      '<div class="ded ded-$[properties.direction]"></div>'
    )
  })
  myMap.geoObjects.add(ded)

  // Получаем объект цехов с их координатами и принадлежащими пунктами
  var ceh = {}
  data.forEach(pin => {
    if (ceh.hasOwnProperty(pin.ceh)) {
      ceh[pin.ceh].pins.push(pin)
    } else {
      ceh[pin.ceh] = { pins: [pin] }
    }

    if (pin.ceh === pin.name) {
      ceh[pin.ceh].coords = [pin.lat, pin.len]
    }
  })

  // Задаём точки маршрута Деда Мороза
  global.points = [
    [[58.5228, 31.2699], ceh['Великий Новгород'].coords],
    [ceh['Великий Новгород'].coords, ceh['Залучье'].coords],
    [ceh['Залучье'].coords, ceh['Пролетарий'].coords],
    [ceh['Пролетарий'].coords, ceh['Боровичи'].coords]
  ]

  var targetCehs = ['Великий Новгород', 'Залучье', 'Пролетарий', 'Боровичи']

  var i = 0
  // Запускаем цеха через 1 секунду после начала прыжков
  var launchCehs = utils.delay(function (geoObject, i) {
    // Останавливаем скачущего Деда
    geoObject.properties.set('direction', '')

    // Рисуем маршруты (линии) от цехов до пунктов
    drawRoutes(ceh, targetCehs[i])

    // Рисуем активные пины поверх старых
    // (с небольшой задержкой на отрисовку маршрутов)
    var drawPinsAndDed = utils.delay(function (i) {
      drawPins(ceh[targetCehs[i]].pins, true)

      // Если ещё есть цеха, добавляем нового Деда
      if (i + 1 < targetCehs.length) {
        myMap.geoObjects.add(ded)
      } else {
        console.log('Карта запущена')
        myMap.geoObjects.remove(ded)
        var evt = new Event('launchLeaving')
        dedNode.dispatchEvent(evt)
      }
    }, 200)

    drawPinsAndDed(i)

    // Если все цеха запущены, отправляем колбэк
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
