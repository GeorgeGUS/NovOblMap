import { Car } from './car'

export function DMoroz (routePoints, map, ymaps) {
  var ded = new Car({
    iconLayout: ymaps.templateLayoutFactory.createClass(
      '<div class="ded ded-$[properties.direction]"></div>'
    )
  })
  map.geoObjects.add(ded)

  var points = [
    routePoints['Великий Новгород'],
    {
      type: 'viaPoint',
      point: routePoints['Залучье']
    },
    {
      type: 'viaPoint',
      point: routePoints['Пролетарий']
    },
    routePoints['Боровичи']
  ]

  var points1 = [routePoints['Великий Новгород'], routePoints['Пролетарий']]

  var points2 = [routePoints['Пролетарий'], routePoints['Великий Новгород']]

  function delay (fn, ms) {
    return function () {
      var saveThis = this
      var saveArgs = arguments

      setTimeout(function () {
        fn.apply(saveThis, saveArgs)
      }, ms)
    }
  }
  var firstRoute = delay(addDedRoute, 5000)
  var secondRoute = delay(addDedRoute, 1500)

  function stopJumping(geoObject) {
    geoObject.properties.set('direction', '')
  }

  var stopDed = delay(stopJumping, 1000)

  function addDedRoute (points, cb, cbAttr) {
    ymaps.route(points).then(function (route) {
      map.geoObjects.add(route.getPaths())
      ded.moveTo(
        route
          .getPaths()
          .get(0)
          .getSegments(),
        {
          speed: 3000,
          directions: 8
        },
        function (geoObject, coords, direction) {
          geoObject.geometry.setCoordinates(coords)
          geoObject.properties.set('direction', direction.t)
        },
        function (geoObject) {
          geoObject.properties.set('direction', 'jump')
          stopDed(geoObject)
          
          if (cb) {
            cb(cbAttr)
          }
        }
      )
    })
  }

  firstRoute(points1, secondRoute, points2)
}
