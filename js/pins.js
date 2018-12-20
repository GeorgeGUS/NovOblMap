export function drawPins (data, isActive) {
  var cehIconClass = {
    'Великий Новгород': 'pin-vn',
    Пролетарий: 'pin-pr',
    Боровичи: 'pin-br',
    Залучье: 'pin-zl'
  }
  var activeClass = isActive ? 'active' : ''

  if (!isActive) {
    var pinsCollection = {
      type: 'FeatureCollection',
      features: []
    }

    for (var pin of data) {
      var iconClass = cehIconClass[pin.ceh]
      var mainClass = pin.ceh === pin.name ? 'pin-main' : ''
      pinsCollection.features.push({
        type: 'Feature',
        id: pin.name,
        geometry: {
          type: 'Point',
          coordinates: [pin.lat, pin.len]
        },
        properties: {
          activeClass: activeClass,
          iconClass: iconClass,
          mainClass: mainClass,
          pinLabel: pin.name
        }
      })
    }
    pinsBrObject.add(pinsCollection)
    pinsBrObject.objects.options.set({
      mainClass: mainClass,
      iconLayout: ymaps.templateLayoutFactory.createClass(
        `<div class="pin $[properties.iconClass] $[properties.mainClass] $[properties.activeClass]">
          {{ properties.pinLabel }}
        </div>`
      )
    })
    myMap.geoObjects.add(pinsBrObject)
  } else {
    for (var pin of data) {
      pinsBrObject.objects.getById(pin.name).properties.activeClass = activeClass
    }
    myMap.geoObjects.add(pinsBrObject)
  }
}
