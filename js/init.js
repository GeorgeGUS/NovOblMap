import '../style.css'
import { data } from './data'
import { drawArea } from './area'
import { drawPins } from './pins'
import { DMoroz } from './dmoroz'

ymaps.ready(init)
function init () {
  var myMap = new ymaps.Map(
    'map',
    {
      center: [58.19421684348514, 32.92976749999997],
      controls: [], // убрать все элементы управления
      zoom: 8.23
    },
    {
      avoidFractionalZoom: false // Разрешает дробное значение зума
    }
  )
  // Запретить манипуляции с картой
  myMap.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom'])

  // Рисует Новгородскую область
  drawArea(myMap)

  // Рисует объекты ЦТВ
  drawPins(myMap, data)

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

  var isDedWalking = false

  // Вставляем гуляющего по карте Деда Мороза
  function onEnterPress (evt) {
    if (evt.key === 'Enter' && !isDedWalking) {
      isDedWalking = true
      DMoroz(ceh, myMap)
    }
  }

  window.addEventListener('keydown', onEnterPress)
}
