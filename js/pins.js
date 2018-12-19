export function drawPins (data, isActive) {
  // var PinLabelClass =
  var cehIconClass = {
    'Великий Новгород': 'pin-vn',
    Пролетарий: 'pin-pr',
    Боровичи: 'pin-br',
    Залучье: 'pin-zl'
  }
  var activeClass = isActive ? 'active' : ''

  if (!isActive) {
    console.log('before clean pinsBrObject', pinsBrObject)
    // myMap.geoObjects.add(pinsBr)

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
      // console.log(pinsBr.getLength())
      // myMap.geoObjects.add(myPlacemark)
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
    console.log('before data pinsBrObject', pinsBrObject)
    console.log('pinsBrObject.objects', pinsBrObject.objects)
    console.log(
      'pinsBrObject.objects.getById',
      pinsBrObject.objects.getById('Боровичи').properties
    )
    console.log(
      'pinsBrObject.getObjectState',
      pinsBrObject.getObjectState('Боровичи')
    )
    myMap.geoObjects.add(pinsBrObject)
  } else {
    for (var pin of data) {
      console.log(pin)
      console.log(pinsBrObject.objects.getById(pin.name).properties)
      pinsBrObject.objects.getById(pin.name).properties.activeClass = activeClass
    }
    myMap.geoObjects.add(pinsBrObject)
  }
}
