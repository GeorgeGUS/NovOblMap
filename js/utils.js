export const utils = {
  convertCoords: function (coords) {
    var projection = myMap.options.get('projection')
    return myMap.converter.globalToPage(projection.toGlobalPixels(coords, myMap.getZoom()))
  },
  convertPixels: function (pixels) {
    var projection = myMap.options.get('projection')
    return projection.fromGlobalPixels(myMap.converter.pageToGlobal(pixels), myMap.getZoom())
  },
  delay: function (fn, ms) {
    return function () {
      setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  },
  serialAsyncMap: function (collection, fn) {
    let results = []
    let promise = Promise.resolve()

    for (let item of collection) {
      promise = promise.then(() => fn(item)).then(result => results.push(result))
    }

    return promise.then(() => results)
  }
}
