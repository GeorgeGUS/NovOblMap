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
    console.log('before', pinsBr)
    console.log('before', pinsBrObject)
    // myMap.geoObjects.add(pinsBr)

    var data1 = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: 1,
          geometry: {
            type: 'Circle',
            coordinates: [56.2, 37.3],
            radius: 50000
          },
          properties: { hintContent: 'Текст' }
        },
        {
          type: 'Feature',
          id: 2,
          geometry: {
            type: 'Polygon',
            coordinates: [[[56.2, 37.2], [55.3, 37.7], [56.1, 37.9]], []]
          },
          properties: { hintContent: 'Текст' }
        },
        {
          type: 'Feature',
          id: 3,
          geometry: {
            type: 'LineString',
            coordinates: [[55.7, 37.1], [55.2, 37.6], [56.1, 38.4]]
          },
          properties: { hintContent: 'Текст' }
        }
      ]
    }

    var pins = []
    for (var pin of data) {
      var iconClass = cehIconClass[pin.ceh]
      var mainClass = pin.ceh === pin.name ? 'pin-main' : ''
      var myPlacemark = {
        type: 'Feature',
        id: pin.name,
        geometry: {
          type: 'Point',
          coordinates: [pin.lat, pin.len]
        },
        properties: {
          iconClass: iconClass,
          mainClass: mainClass,
          activeClass: activeClass,
          pinLabel: pin.name
        },
        options: {
          iconLayout: ymaps.templateLayoutFactory.createClass(
            `<div class="pin $[properties.iconClass] $[properties.mainClass] $[properties.activeClass]">     
              {{ properties.pinLabel }}
            </div>`
          )
        }
      }
      pins.push(myPlacemark)
      // console.log(pinsBr.getLength())
      // myMap.geoObjects.add(myPlacemark)
    }
    pinsBrObject.add(pins)
    console.log('myPlacemark', pinsBrObject)
    myMap.geoObjects.add(pinsBrObject)
  } else {
    console.log('after', pinsBr)
    // pinsBr.removeAll()
    // myMap.geoObjects.remove(pinsBr)
    // myMap.geoObjects.add(pinsBr)
  }
}
