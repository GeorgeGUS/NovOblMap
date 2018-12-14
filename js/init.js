import { createRoutes } from './routes'
import { Car } from './car'
import { data } from './data'

const DATA_URL =
  'https://cdn.jsdelivr.net/gh/GeorgeGUS/table-converter/src/data/points.json'
const PIN_ON = 'img/tower-on.gif'
const PIN_OFF = 'img/tower-off.png'
// const VN_COORDS = [58.52281, 31.269915]
const ceh = 'сeh'
const ch1mux = 'сh1mux'
const ch2mux = 'сh2mux'

ymaps.ready(init)
function init () {
  var myMap = new ymaps.Map(
    'map',
    {
      center: [58.19460497, 32.9240815],
      controls: [], // убрать все элементы управления
      zoom: 7.9
    },
    {
      avoidFractionalZoom: false // Разрешает дробное значение зума
    }
  )
  // Запретить манипуляции с картой
  myMap.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom'])

  // Получаем данные по пунктам вещания ЦТВ

  console.log(data)

  for (var pin of data) {
    var myPlacemark = new ymaps.Placemark(
      [pin.lat, pin.len],
      {
        iconCaption: pin.name
      },
      {
        iconLayout: 'default#imageWithContent',
        iconImageHref: PIN_ON,
        iconImageSize: [32, 42],
        iconImageOffset: [-17, -38],
        iconShadow: true,
        iconShadowImageHref: PIN_OFF,
        iconShadowImageSize: [32, 42],
        iconShadowImageOffset: [-17, -36]
      }
    )
    myMap.geoObjects.add(myPlacemark)
  }
  // Рисуем маршруты (линии) от цехов до пунктов
  createRoutes(data, myMap)

  // Рисует Новгородскую область
  ymaps.borders.load('RU', { quality: 2 }).then(
    function (geojson) {
      const NOV_OBL_INDEX = 32
      console.dir(geojson.features[NOV_OBL_INDEX])
      console.dir(geojson.features.map(f => f.properties))
      
      var objectManager = new ymaps.ObjectManager()
      var features = geojson.features.map(function (feature) {
        feature.id = feature.properties.iso3166
        feature.options = {
          strokeWidth: 3,
          strokeColor: '#ff4500',
          strokeOpacity: 0.6,
          fillColor: '#ffd500',
          fillOpacity: 0.4
        }
        return feature
      })
      objectManager.add(features[NOV_OBL_INDEX])
      myMap.geoObjects.add(objectManager)
    },
    function (e) {
      console.log(e)
    }
  )
}
