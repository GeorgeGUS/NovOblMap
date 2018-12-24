import { utils } from './utils'
export class Routes {
  constructor (cehs) {
    this._canvas = document.getElementById('canvas')
    this._cehs = cehs
    this._cehNames = Object.keys(cehs)
    this._cehDone = []
    this._object = {}
    this._isReady = false
    // На случай, если понадобятся разные цвета маршрутов
    this._colors = {
      'Великий Новгород': '#3c0',
      Залучье: '#ff9800',
      Пролетарий: '#673ab7',
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
        return cehName
      }).then(cehName => {
        console.log(`Маршруты цеха ${cehName} построены`)
        this._cehDone.push(cehName)
        if (this._cehDone.length ==this._cehNames.length) {
          console.log('Маршруты всех цехов построены, выпускайте Кракена!')
          this._canvas.classList.remove('loading')
          this._isReady = true
        }
      }).catch(err => {
        console.log(err)
        this._canvas.classList.remove('loading')
        this._canvas.classList.add('error')
      })
    }
  }

  get isReady () {
    return this._isReady
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
