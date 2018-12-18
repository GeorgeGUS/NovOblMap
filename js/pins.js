export function drawPins (data, isActive) {
  var PinLabelClass = ymaps.templateLayoutFactory.createClass(
    `<div class="pin $[properties.iconClass] $[properties.mainClass] $[properties.activeClass]">     
      {{ properties.pinLabel }}
    </div>`
  )
  var cehIconClass = {
    'Великий Новгород': 'pin-vn',
    Пролетарий: 'pin-pr',
    Боровичи: 'pin-br',
    Залучье: 'pin-zl'
  }
  var activeClass = isActive ? 'active' : ''

  for (var pin of data) {
    var iconClass = cehIconClass[pin.ceh]
    var mainClass = pin.ceh === pin.name ? 'pin-main' : ''
    var myPlacemark = new ymaps.Placemark(
      [pin.lat, pin.len],
      {
        iconClass: iconClass,
        mainClass: mainClass,
        activeClass: activeClass,
        pinLabel: pin.name
      },
      {
        iconLayout: PinLabelClass
      }
    )
    myMap.geoObjects.add(myPlacemark)
  }
}
