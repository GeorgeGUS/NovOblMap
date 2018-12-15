export function createRoutes (data, myMap) {
  // Получаем объект с координатами головных цехов
  var cehCoords = {}
  data.forEach(pin => {
    if (pin.ceh === pin.name) {
      cehCoords[pin.name] = [pin.lat, pin.len]
    }
  })

  // Проводим прямые линии от головных цехов до их пунктов
  // data.forEach((pin, i) => {
  //   var myPolyline = new ymaps.Polyline(
  //     [cehCoords[pin.ceh], [pin.lat, pin.len]],
  //     {},
  //     {
  //       strokeWidth: 3,
  //       strokeColor: '#2196f3'
  //     }
  //   )
  //   if (i < 1) {
  //     // console.log(myPolyline)
  //   }
  //   myMap.geoObjects.add(myPolyline)
  // })

  // Проводим маршруты от головных цехов до их пунктов
  data.forEach((pin, i) => {
    ymaps.route([cehCoords[pin.ceh], [pin.lat, pin.len]]).then(function (route) {
      var points = route.getWayPoints()
      var onlyRoute = route.getPaths()
      onlyRoute.options.set({
        strokeWidth: 7,
        strokeColor: '#87cefa'
      })
      if (i < 1) {
        // console.dir(points.get(1).properties.set())
        // console.log(onlyRoute)
      }
      myMap.geoObjects.add(onlyRoute)
    })
  })

  return cehCoords
}
