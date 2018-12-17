import { Car } from './car'
import { drawRoutes } from './routes'
import { drawPins } from './pins'
import { utils } from './utils'
import { dedTween } from './ded-tween'

export function DMoroz (ceh) {
  var ded = new Car({
    iconLayout: ymaps.templateLayoutFactory.createClass(
      '<div class="ded ded-$[properties.direction]"></div>'
    )
  })
  myMap.geoObjects.add(ded)

  var points = [
    [[58.5228, 31.2699], ceh['Великий Новгород'].coords],
    [ceh['Великий Новгород'].coords, ceh['Залучье'].coords],
    [ceh['Залучье'].coords, ceh['Пролетарий'].coords],
    [ceh['Пролетарий'].coords, ceh['Боровичи'].coords]
  ]

  // Преобразуем географические координаты в пиксели окна браузера
  var dedCoords = {
    start: utils.converterCoords(points[0][0]),
    end: utils.converterCoords(points[points.length - 1][1])
  }
  console.log(dedCoords.start, dedCoords.end)

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
      // Добавляем нового Деда, чтобы он был сверху
      myMap.geoObjects.add(ded)
    }, 200)

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

  var startDedWalking = utils.delay(addDedRoute, 1000)

  // Вставляем гуляющего по карте Деда Мороза
  global.isDedWalking = false
  function onEnterPress (evt) {
    if (evt.key === 'Enter' && !isDedWalking) {
      isDedWalking = true
      // Запускаем Деда Мороза гулять
      startDedWalking(points)
    }
  }

  function dedLaunch () {
    addDedRoute(points)
  }

  dedTween(dedCoords, dedLaunch)

  window.addEventListener('keydown', onEnterPress)
}
