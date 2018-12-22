import { utils } from './utils'
export class Routes {
  constructor (cehs) {
    this._cehs = cehs
    this._object = {}
    // На случай, если понадобятся разные цвета маршрутов
    this._colors = {
      'Великий Новгород': '#3c05',
      Залучье: '#ff980055',
      Пролетарий: '#673ab755',
      Боровичи: '#f44336'
    }

    // Проводим маршруты от головных цехов до их пунктов
    for (let cehName in this._cehs) {
      let collection = new ymaps.GeoObjectCollection()
      utils.serialAsyncMap(this._cehs[cehName].pins, function (pin) {
        return ymaps.route([cehs[cehName].coords, [pin.lat, pin.len]]).then(route => {
          var path = route.getPaths()
          path.id = pin.name
          path.options.set({
            strokeWidth: 6,
            strokeColor: 'rgba(0,0,0,0)'
          })
          return path
        })
      }).then(paths => {
        paths.forEach(path => collection.add(path))
        myMap.geoObjects.add(collection)
        this._object[cehName] = collection
      })
    }
  }

  

  drawCehRoutes (cehName) {
    this._object[cehName].each(path => {
      path.options.set({
        strokeColor: '#87cefa'
        // На случай, если понадобятся разные цвета маршрутов
        // strokeColor: this._colors[cehName]
      })
    })
  }
}
