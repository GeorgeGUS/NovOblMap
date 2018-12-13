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
  var myMap = new ymaps.Map('map', {
    center: [58.19460497, 32.9240815],
    controls: [], // убрать все элементы управления
    zoom: 8
  })

  // Получаем данные по пунктам вещания ЦТВ
  $.getJSON(DATA_URL, function (data) {
    console.log(data)

    for (pin of data) {
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

    // Получаем объект с координатами головных цехов
    var cehCoords = {}
    data.forEach(pin => {
      if (pin[ceh] === pin.name) {
        cehCoords[pin.name] = [pin.lat, pin.len]
      }
    })

    // Проводим линии от головных цехов до их пунктов
    data.forEach(pin => {
      var myPolyline = new ymaps.Polyline([
        cehCoords[pin[ceh]],
        [pin.lat, pin.len]
      ])
      myMap.geoObjects.add(myPolyline)
    })
  })

  const NOV_OBL_INDEX = 32

  ymaps.borders.load('RU', { quality: 2 }).then(
    function (geojson) {
      console.dir(geojson.features[NOV_OBL_INDEX])
      console.dir(geojson.features.map(f => f.properties))
      var objectManager = new ymaps.ObjectManager()
      var features = geojson.features.map(function (feature) {
        feature.id = feature.properties.iso3166
        feature.options = {
          strokeWidth: 3,
          strokeColor: '#607D8B',
          strokeOpacity: 0.7,
          fillColor: '#9e9e9e',
          fillOpacity: 0.5
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
