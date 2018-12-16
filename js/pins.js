export function drawPins (data, isActive) {
  var PinLabelClass = ymaps.templateLayoutFactory.createClass(
    '<div class="pin $[properties.balloonContent]">{{ properties.iconCaption }}</div>'
  )
  var activeClass = isActive ? 'active' : ''
  for (var pin of data) {
    var myPlacemark = new ymaps.Placemark(
      [pin.lat, pin.len],
      {
        balloonContent: activeClass,
        iconCaption: pin.name
      },
      {
        iconLayout: PinLabelClass
      }
    )
    myMap.geoObjects.add(myPlacemark)
  }
}
