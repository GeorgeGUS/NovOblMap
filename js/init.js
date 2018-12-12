var pins = [
  {
    lat: 58.966335,
    len: 34.024697,
    name: 'Анциферово'
  },
  {
    lat: 58.64474,
    len: 30.301729,
    name: 'Батецкий'
  },
  {
    lat: 59.104938,
    len: 33.30397,
    name: 'Ближнее Заполье'
  },
  {
    lat: 58.388219,
    len: 33.914025,
    name: 'Боровичи'
  },
  {
    lat: 57.980199,
    len: 33.246667,
    name: 'Валдай'
  },
  {
    lat: 58.52281,
    len: 31.269915,
    name: 'Великий Новгород'
  },
  {
    lat: 58.701964,
    len: 33.08559,
    name: 'Висленев Остров'
  },
  {
    lat: 57.927807,
    len: 30.70677,
    name: 'Волот'
  },
  {
    lat: 58.565688,
    len: 30.597032,
    name: 'Воронино'
  },
  {
    lat: 58.614241,
    len: 35.422108,
    name: 'Глухачи'
  },
  {
    lat: 57.667865,
    len: 31.765021,
    name: 'Залучье'
  },
  {
    lat: 57.581332,
    len: 32.652665,
    name: 'Ильина Гора'
  },
  {
    lat: 58.803774,
    len: 35.028403,
    name: 'Кабожа'
  },
  {
    lat: 58.93598,
    len: 33.411031,
    name: 'Калитино'
  },
  {
    lat: 58.629409,
    len: 35.108937,
    name: 'Лубенское'
  },
  {
    lat: 57.921493374063736,
    len: 32.423002282538064,
    name: 'Лычково'
  },
  {
    lat: 58.815748,
    len: 33.393892,
    name: 'Любытино'
  },
  {
    lat: 58.845758,
    len: 32.217664,
    name: 'Малая Вишера'
  },
  {
    lat: 59.098917,
    len: 31.935737,
    name: 'Мелехово'
  },
  {
    lat: 58.187197,
    len: 32.487518,
    name: 'Мокрый Остров'
  },
  {
    lat: 58.511464,
    len: 34.593187,
    name: 'Мошенское'
  },
  {
    lat: 57.801658,
    len: 33.082419,
    name: 'Новинка'
  },
  {
    lat: 58.491838,
    len: 30.28935,
    name: 'Новое Овсино'
  },
  {
    lat: 57.665208,
    len: 30.867281,
    name: 'Переходы'
  },
  {
    lat: 58.595347,
    len: 35.800685,
    name: 'Пестово'
  },
  {
    lat: 57.534352,
    len: 32.948273,
    name: 'Полново'
  },
  {
    lat: 58.437358,
    len: 31.708167,
    name: 'Пролетарий'
  },
  {
    lat: 58.208834,
    len: 30.093733,
    name: 'Старая Каменка'
  },
  {
    lat: 58.00852713133914,
    len: 31.359131990765995,
    name: 'Старая Русса'
  },
  {
    lat: 58.791396,
    len: 30.875761,
    name: 'Тёсовский'
  },
  {
    lat: 57.409961,
    len: 31.048947,
    name: 'Тугино'
  },
  {
    lat: 58.214007,
    len: 33.517688,
    name: 'Угловка'
  },
  {
    lat: 58.896645,
    len: 34.491507,
    name: 'Хвойная'
  },
  {
    lat: 57.145202,
    len: 31.178781,
    name: 'Холм'
  },
  {
    lat: 58.036126,
    len: 32.959888,
    name: 'Яжелбицы'
  }
]

ymaps.ready(init)
function init () {
  var myMap = new ymaps.Map('map', {
    center: [58.19460497, 32.9240815],
    controls: [], // убрать все элементы управления
    zoom: 8
  })

  for (pin of pins) {
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
