export class Routes {
  constructor (cehs) {
    this._cehs = cehs
    this._object = {}

    // Проводим маршруты от головных цехов до их пунктов
    for (let cehName in this._cehs) {
      let collection = new ymaps.GeoObjectCollection()
      this.serialAsyncMap(this._cehs[cehName].pins, function (pin) {
        return ymaps.route([cehs[cehName].coords, [pin.lat, pin.len]]).then(route => {
          var path = route.getPaths()
          path.id = pin.name
          path.options.set({
            strokeWidth: 0,
            strokeColor: '#87cefa'
          })
          return path
        })
      }).then(paths => {
        paths.forEach(path => collection.add(path))
        myMap.geoObjects.add(collection)
        this._object[cehName] = collection
      })
    }
  }

  serialAsyncMap (collection, fn) {
    let results = []
    let promise = Promise.resolve()

    for (let item of collection) {
      promise = promise.then(() => fn(item)).then(result => results.push(result))
    }

    return promise.then(() => results)
  }

  drawCehRoutes (cehName) {
    this._object[cehName].each(path => {
      path.options.set({
        strokeWidth: 6
      })
    })
  }
}
