export function drawDed (coords, isBig) {
  var dedLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="ded ded-$[properties.size]"></div>'
  )
  var sizeClass = isBig ? 'big' : ''
  var myPlacemark = new ymaps.Placemark(
      coords,
    {
      // iconCaption: coords
    },
    {
      size: sizeClass,
      iconLayout: dedLayout
    }
  )
  myMap.geoObjects.add(myPlacemark)
}
