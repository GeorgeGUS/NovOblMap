export class Area {
  constructor() {
    this._areaObject = new ymaps.ObjectManager();
    this._borders = ymaps.borders.load('RU', {quality: 2});
    this._borders.then((geojson) => this.setAreaParameters(geojson))
        .then((feature) => this.setMapCenter(feature))
        .catch((e) => console.log(e))
  }

  setAreaParameters(geojson) {
    const NOV_OBL_INDEX = 32;
    const feature = geojson.features[NOV_OBL_INDEX];
    console.log(geojson.features.map(f=>f.properties.name))
    feature.id = feature.properties.iso3166;
    feature.options = {
      strokeWidth: 4,
      strokeColor: '#ff4500',
      strokeOpacity: 0.6,
      fillColor: '#ffd530',
      fillOpacity: 0.4,
      openHintOnHover: false
    };

    this._areaObject.add(feature);
    myMap.geoObjects.add(this._areaObject);

    return feature;
  }

  setMapCenter(feature) {
    const areaCoords = feature.geometry.coordinates[0];
    const mapBounds = ymaps.util.bounds.fromPoints(areaCoords);
    // Находим оптимальный центр и уровень масштабирования карты.
    ymaps.util.requireCenterAndZoom(
        myMap.getType(),
        mapBounds,
        myMap.container.getSize(),
        {
          margin: 5,
          preciseZoom: true
        }
    )
        .then((result) => {
          // Устанавливаем карте оптимальный центр и зум.
          myMap.setCenter(result.center, result.zoom);

          // создаём событие для обновления зума и координат
          const evt = new Event('updateZoom');
          window.dispatchEvent(evt);
          console.log('Карта области загружена');
        })
  }

}
