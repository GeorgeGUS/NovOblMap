export function drawPins (data, isActive) {
  var PinLabelClass = ymaps.templateLayoutFactory.createClass(
    '<div class="pin $[properties.mainClass] $[properties.activeClass]">{{ properties.pinLabel }}</div>'
  )
  var activeClass = isActive ? 'active' : ''
  for (var pin of data) {
    var mainClass = pin.ceh === pin.name ? 'pin-main' : ''
    var myPlacemark = new ymaps.Placemark(
      [pin.lat, pin.len],
      {
        mainClass: mainClass,
        activeClass: activeClass,
        pinLabel: pin.name,
      },
      {
        iconLayout: PinLabelClass,
      }
    )
    myMap.geoObjects.add(myPlacemark)
  }
}
