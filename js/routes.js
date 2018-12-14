export function createRoutes(data, myMap) {
    // Получаем объект с координатами головных цехов
    var cehCoords = {}
    data.forEach(pin => {
      if (pin.ceh === pin.name) {
        cehCoords[pin.name] = [pin.lat, pin.len]
      }
    })

    // Проводим прямые линии от головных цехов до их пунктов
    data.forEach((pin, i) => {
      var myPolyline = new ymaps.Polyline(
        [cehCoords[pin.ceh], [pin.lat, pin.len]],
        {},
        {
          strokeWidth: 3,
          strokeColor: '#2196f3'
        }
      )
      if (i < 1) {
        console.log(myPolyline)
      }
      myMap.geoObjects.add(myPolyline)
    })

    // Проводим маршруты от головных цехов до их пунктов
    // data.forEach((pin, i) => {
    //   var route = new ymaps.multiRouter.MultiRoute(
    //     {
    //       referencePoints: [cehCoords[pin[ceh]], [pin.lat, pin.len]]
    //     },
    //     {
    //       wayPointVisible: false,
    //       // Внешний вид линии активного маршрута.
    //       routeActiveStrokeWidth: 5,
    //       routeActiveStrokeStyle: 'solid',
    //       routeActiveStrokeColor: '#2196f3',
    //       // Внешний вид линий альтернативных маршрутов.
    //       routeStrokeStyle: 'dot',
    //       routeStrokeColor: '#0000',
    //       routeStrokeWidth: 1
    //     }
    //   )
    //   if (i < 1) {
    //     console.log(route)
    //   }
    //   myMap.geoObjects.add(route)
    // })

    // Set the route.
    // A driving route is created by default.
    // var multiRoute = new ymaps.multiRouter.MultiRoute(
    //   {
    //     // Route points. Points can be set as coordinates or addresses.
    //     referencePoints: [
    //       'Smolenskaya metro station, Moscow',
    //       'Arbatskaya metro station, Moscow',
    //       [55.734876, 37.59308] // Lva Tolstogo street
    //     ]
    //   },
    //   {
    //     // |Automatically set the map viewport so that
    //     // the entire route is visible.
    //     boundsAutoApply: true
    //   }
    // )

    // Add the route to the map.
    // myMap.geoObjects.add(multiRoute)
  }