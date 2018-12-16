import { data } from './data'
import { drawPins } from './pins'
import { DMoroz } from './dmoroz'

ymaps.ready(init)
function init () {
  var myMap = new ymaps.Map(
    'map',
    {
      center: [58.19460497, 32.9240815],
      controls: [], // убрать все элементы управления
      zoom: 8.23
    },
    {
      avoidFractionalZoom: false // Разрешает дробное значение зума
    }
  )
  // Запретить манипуляции с картой
  myMap.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom'])

  

  drawPins(myMap, data)

  // Рисует Новгородскую область
  ymaps.borders.load('RU', { quality: 2 }).then(
    function (geojson) {
      const NOV_OBL_INDEX = 32
      // console.dir(geojson.features[NOV_OBL_INDEX])
      // console.dir(geojson.features.map(f => f.properties))

      var objectManager = new ymaps.ObjectManager()
      var feature = geojson.features[NOV_OBL_INDEX]
      feature.id = feature.properties.iso3166
      feature.options = {
        strokeWidth: 4,
        strokeColor: '#ff4500',
        strokeOpacity: 0.6,
        fillColor: '#ffd530',
        fillOpacity: 0.4,
        openHintOnHover: false
      }
      objectManager.add(feature)
      myMap.geoObjects.add(objectManager)
    },
    function (e) {
      console.log(e)
    }
  )

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

  var isDedWalking = false;

  // Вставляем гуляющего по карте Деда Мороза
  function onEnterPress(evt) {
    if(evt.key === 'Enter' && !isDedWalking) {
      isDedWalking = true;
      DMoroz(ceh, myMap)
    }
  }

  window.addEventListener('keydown', onEnterPress)
}
