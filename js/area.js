import { dedTween } from './ded-tween'
export function drawArea (data) {
  ymaps.borders.load('RU', { quality: 2 }).then(
    function (geojson) {
      const NOV_OBL_INDEX = 32
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

      var objectManager = new ymaps.ObjectManager()
      objectManager.add(feature)
      myMap.geoObjects.add(objectManager)

      var areaCoords = feature.geometry.coordinates[0]
      var mapBounds = ymaps.util.bounds.fromPoints(areaCoords)

      // Находим оптимальный центр и уровень масштабирования карты.
      ymaps.util
        .requireCenterAndZoom(
          myMap.getType(),
          mapBounds,
          myMap.container.getSize(),
          {
            margin: 30,
            preciseZoom: true
          }
        )
        .then(function (result) {
          // Устанавливаем карте оптимальный центр и зум.
          myMap.setCenter(result.center, result.zoom)

          // Инициируем Деда Мороза
          dedTween(data)
        })
    },
    function (e) {
      console.log(e)
    }
  )
}
