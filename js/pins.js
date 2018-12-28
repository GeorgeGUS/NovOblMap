export class Pins {
  constructor(data) {
    this._pinsObject = new ymaps.ObjectManager()

    this._cehIconClass = {
      'Великий Новгород': 'pin-vn',
      Залучье: 'pin-zl',
      Пролетарий: 'pin-pr',
      Боровичи: 'pin-br'
    }

    this._pinsCollection = {
      type: 'FeatureCollection',
      features: []
    }

    for (var pin of data) {
      var iconClass = this._cehIconClass[pin.ceh]
      var mainClass = pin.ceh === pin.name ? 'pin-main' : ''
      this._pinsCollection.features.push({
        type: 'Feature',
        id: pin.name,
        geometry: {
          type: 'Point',
          coordinates: [pin.lat, pin.len]
        },
        properties: {
          activeClass: '',
          iconClass: iconClass,
          mainClass: mainClass,
          pinLabel: pin.name
        }
      })
    }
    this._pinsObject.add(this._pinsCollection)
    this._pinsObject.objects.options.set({
      mainClass: mainClass,
      iconLayout: ymaps.templateLayoutFactory.createClass(
        `<div class="pin $[properties.iconClass] $[properties.mainClass] $[properties.activeClass]">
          {{ properties.pinLabel }}
        </div>`
      )
    })
    myMap.geoObjects.add(this._pinsObject)
    console.log('Метки загружены')
  }

  drawPins(data) {
    for (var pin of data) {
      this._pinsObject.objects.getById(pin.name).properties.activeClass = 'active'
    }
    myMap.geoObjects.add(this._pinsObject)
  }
}
