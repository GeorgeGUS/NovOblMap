import { Car } from './car'

export function DMoroz (routePoints, map, ymaps) {
  var ded = new Car({
    iconLayout: ymaps.templateLayoutFactory.createClass(
      '<div class="ded ded-$[properties.direction]"></div>'
    )
  })

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

  ymaps.route(points).then(function (route) {
    map.geoObjects.add(ded)
    console.log(
      route
        .getPaths()
        .get(0)
        .getSegments()
    )
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
      }
    )
  })
}
