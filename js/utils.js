export const utils = {
  converterCoords: function (coords) {
    var projection = myMap.options.get('projection')
    return myMap.converter.globalToPage(
      projection.toGlobalPixels(coords, myMap.getZoom())
    )
  }
}
