export const utils = {
  converterCoords: function (coords) {
    var projection = myMap.options.get('projection')
    return myMap.converter.globalToPage(
      projection.toGlobalPixels(coords, myMap.getZoom())
    )
  },
  convertPixels: function (pixels) {
    var projection = myMap.options.get('projection')
    return projection
      .fromGlobalPixels(myMap.converter.pageToGlobal(pixels), myMap.getZoom())
      .join(', ')
  },
  delay: function (fn, ms) {
    return function () {
      setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  }
}
