const DATA_URL =
  'https://cdn.jsdelivr.net/gh/GeorgeGUS/table-converter/src/data/points.json'

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
          iconLayout: 'default#image',
          iconImageHref: 'img/tower-off.png',
          iconImageSize: [32, 42],
          iconImageOffset: [-17, -42]
        }
      )
      myMap.geoObjects.add(myPlacemark)
    }
  })

  const NOV_OBL_INDEX = 32
  const NOV_ISO = 'RU-NGR'

  ymaps.borders.load('RU').then(
    function (geojson) {
      console.dir(geojson.features[NOV_OBL_INDEX])
      console.dir(geojson.features.map(f => f.properties))
    },
    function (e) {
      console.log(e)
    }
  )

  //   ymaps.borders.load(NOV_ISO).then(
  //     function (geojson) {
  //       console.dir(geojson)
  //       //   console.dir(geojson.features[NOV_OBL_INDEX])
  //       //   console.dir(geojson.features.map(f => f.properties.name))
  //     },
  //     function (e) {
  //       console.log(e)
  //     }
  //   )

  ymaps.borders.load('RU', { quality: 2 }).then(
    function (geojson) {
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

  //   ymaps.borders.load('RU', { quality: 2 }).then(function (geojson) {
  //     var regions = ymaps.geoQuery(geojson)
  //     regions
  //       .search(`properties.iso3166 = "${NOV_ISO}"`)
  //       .setOptions('fillColor', '#ff001a')
  //     regions.addToMap(myMap)
  //   })
}
