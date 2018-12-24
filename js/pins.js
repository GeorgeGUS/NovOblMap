export function drawPins (data, isActive) {
  var cehIconClass = {
    'Великий Новгород': 'pin-vn',
    Залучье: 'pin-zl',
    Пролетарий: 'pin-pr',
    Боровичи: 'pin-br'
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
    pinsObject.add(pinsCollection)
    pinsObject.objects.options.set({
      mainClass: mainClass,
      iconLayout: ymaps.templateLayoutFactory.createClass(
        `<div class="pin $[properties.iconClass] $[properties.mainClass] $[properties.activeClass]">
          {{ properties.pinLabel }}
        </div>`
      )
    })
    myMap.geoObjects.add(pinsObject)
    console.log('Метки загружены')
  } else {
    for (var pin of data) {
      pinsObject.objects.getById(pin.name).properties.activeClass = activeClass
    }
    myMap.geoObjects.add(pinsObject)
  }
}
