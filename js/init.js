import '../style.css'
import { data } from './data'
import { drawArea } from './area'
import { drawPins } from './pins'
import { drawDed } from './Ded'
import { DMoroz } from './dmoroz'

ymaps.ready(init)
function init () {
  global.myMap = new ymaps.Map(
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
  drawArea()

  // Рисует объекты ЦТВ
  drawPins(data)

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

  drawDed([59, 29.7], true)

  DMoroz(ceh)
}
