import '../style.css'
import { data } from './data'
import { drawArea } from './area'
import { drawPins } from './pins'
import { dedTween } from './ded-tween'

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

  // Рисует Новгородскую область и инициируем Деда Мороза
  drawArea()

  // Рисует объекты ЦТВ
  drawPins(data)

  // Инициируем Деда Мороза только после пересчёта координат
  window.addEventListener('updateZoom', function () {
    dedTween(data)
  })
}
