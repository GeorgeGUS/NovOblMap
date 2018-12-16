export function drawRoutes (ceh, cehName) {
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
  ceh[cehName].pins.forEach((pin, i) => {
    ymaps.route([ceh[cehName].coords, [pin.lat, pin.len]]).then(function (route) {
      var onlyRoute = route.getPaths()
      onlyRoute.options.set({
        strokeWidth: 6,
        strokeColor: '#87cefa'
      })

      myMap.geoObjects.add(onlyRoute)
    })
  })
}
