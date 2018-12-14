import { data } from './data'
import { createRoutes } from './routes'
import {DMoroz} from './dmoroz'


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

  var PinLabelClass = ymaps.templateLayoutFactory.createClass(
    `<div class="pin">{{ properties.iconCaption }}</div>`
  )

  for (var pin of data) {
    var myPlacemark = new ymaps.Placemark(
      [pin.lat, pin.len],
      {
        iconCaption: pin.name
      },
      // {
      //   iconLayout: 'default#image',
      //   iconImageHref: PIN_ON,
      //   iconImageSize: [32, 42],
      //   iconImageOffset: [-17, -38],
      //   iconShadow: true,
      //   iconShadowImageHref: PIN_OFF,
      //   iconShadowImageSize: [32, 42],
      //   iconShadowImageOffset: [-17, -36]
      // }
      {
        iconLayout: PinLabelClass
      }
    )
    myMap.geoObjects.add(myPlacemark)
  }
  // Рисуем маршруты (линии) от цехов до пунктов
  var cehCoords = createRoutes(data, myMap)

  DMoroz(cehCoords, myMap, ymaps)

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
        strokeWidth: 3,
        strokeColor: '#ff4500',
        strokeOpacity: 0.6,
        fillColor: '#ffd500',
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
}
