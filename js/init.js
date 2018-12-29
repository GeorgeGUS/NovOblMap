import '../style.css'
import { data } from './data'
import { Area } from './area'
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

  // Заплатка под логотип РТРС (тупо, но зато работает)
  var patch = new ymaps.Rectangle([[59, 35.61], [58.9,36.845]], {}, {
    strokeWidth: 0,
    fillColor: '#fff'
  });
  myMap.geoObjects.add(patch);

  // Рисуем Новгородскую область
  new Area();

  // Инициируем Деда Мороза только после пересчёта координат
  window.addEventListener('updateZoom', function () {
    dedTween(data)
  })
}
