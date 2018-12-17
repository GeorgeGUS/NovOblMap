export const utils = {
  converterCoords: function (coords) {
    var projection = myMap.options.get('projection')
    return myMap.converter.globalToPage(
      projection.toGlobalPixels(coords, myMap.getZoom())
    )
  },
  delay: function (fn, ms) {
    return function () {
      setTimeout(() => {
        fn.apply(this, arguments)
      }, ms)
    }
  }
}
