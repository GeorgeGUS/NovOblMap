/**
 * fileOverview Класс анимированной машинки
 * @see http://ymlib.narod.ru/1.1/demos/animate.html
 * Версия для АПИ 2.0
 * @author <a href="mailto:qfox@ya.ru">Alex Yaroshevich</a>
 */

export var Car = (function () {
  'use strict'

  // делаем заготовку для кол-ва направлений. 4, 8 или 16 (+, x, *)
  var directionsVariants = {
    // стрелочки для разных направлений (нет стрелочек для 16)
    arrows: {
      w: '←',
      sw: '↙',
      s: '↓',
      se: '↘',
      e: '→',
      ne: '↗',
      n: '↑',
      nw: '↖'
    },
    // возможные направления для разной степени точности
    classes: {
      16: [
        'w',
        'sww',
        'sw',
        'ssw',
        's',
        'sse',
        'se',
        'see',
        'e',
        'nee',
        'ne',
        'nne',
        'n',
        'nnw',
        'nw',
        'nww'
      ],
      8: ['w', 'sw', 's', 'se', 'e', 'ne', 'n', 'nw'],
      4: ['w', 's', 'e', 'n'],
      2: ['w', 'e']
    },
    n: function (x, y, n) {
      //   n = n || 8
      var n2 = n >> 1 // half of n
      var number =
        (Math.floor((Math.atan2(x, y) / Math.PI) * n2 + 1 / n) + n2) % n // seems like there is a little bug here
      return { n: number, t: directionsVariants.classes[n][number] }
    },
    16: function (x, y) {
      // -> values in range [0, 16]
      return directionsVariants.n(x, y, 16)
    },
    8: function (x, y) {
      // -> values in range [0, 8]
      return directionsVariants.n(x, y, 8)
    },
    4: function (x, y) {
      // -> values in range [0, 4]
      return directionsVariants.n(x, y, 4)
    },
    2: function (x, y) {
      // -> values in range [0, 4]
      return directionsVariants.n(x, y, 2)
    }
  }

  // TODO: Оставить на всякий случай для примера
  var defaultMovingCallback = function (geoObject, coords, direction) {
    // действие по умолчанию
    // перемещаем машинку
    geoObject.geometry.setCoordinates(coords)
    // ставим машинке правильное направление - в данном случае меняем ей текст (если получится — на стрелочку)
    geoObject.properties.set(
      'iconContent',
      directionsVariants.arrows[direction.t] || direction.t
    )
  }

  var defaultCompleteCallback = function (geoObject) {
    // действие по умолчанию
    // приехали
    geoObject.properties.set('iconContent', 'Приехали!')
  }

  // нормализуем в один массив точек сегметны из ymaps
  var makeWayPointsFromSegments = function (segments, options) {
    options = options || {}
    options.directions =
      [2, 4, 8, 16].indexOf(options.directions) >= 0 ? options.directions : 8 // must be 4, 8, or 16
    options.speed = options.speed || 6

    var points

    var street

    var wayList = []

    // вспомогательные

    var i

    var j

    var k

    var l

    var prev

    var cur

    var direction

    var getDirection = directionsVariants[options.directions]

    var coordSystem = options.coordSystem

    // открываю массив с точками
    points = []

    // выполняю операцию для всех сегментов
    for (i = 0, l = segments.length; i < l; i++) {
      // беру координаты начала и конца сегмента
      street = segments[i].getCoordinates()
      // и добавляю КАЖДУЮ ИЗ НИХ в массив, чтобы получить полный список точек
      for (j = 0, k = street.length; j < k; j++) {
        cur = street[j]
        // пропускаем дубли
        if (
          prev &&
          prev[0].toPrecision(10) === cur[0].toPrecision(10) &&
          prev[1].toPrecision(10) === cur[1].toPrecision(10)
        ) {
          continue
        }
        points.push(cur)
        prev = cur
      }
    }

    // строим путь. берем 1 единицу расстояния, возвращаемого distance, за пройденный путь в единицу времени.
    // в 1 единица времени - будет 1 смещение геоточки. ни разу не оптимальный, но наглядный алгоритм
    for (i = 0, l = points.length - 1; l; --l, ++i) {
      var from = points[i]

      var to = points[i + 1]

      var diff = [to[0] - from[0], to[1] - from[1]]
      direction = getDirection(diff[0], diff[1])
      // каждую шестую, а то слишком медленно двигается. чрезмерно большая точность
      for (
        j = 0, k = Math.round(coordSystem.distance(from, to));
        j < k;
        j += options.speed
      ) {
        wayList.push({
          coords: [from[0] + (diff[0] * j) / k, from[1] + (diff[1] * j) / k],
          direction: direction,
          vector: diff
        })
      }
    }

    return wayList
  }

  /**
   * Класс машинки.
   * TODO: make it a geoObject with right interface.
   * @class
   * @name Car
   * @param {Object} [options] Опции машики.
   */
  var Car = function (options) {
    var properties = {
      // Описываем геометрию типа "Точка".
      geometry: {
        type: 'Point'
        // coordinates: [59.025, 29.58797]
      }
    }
    var result = new ymaps.GeoObject(properties, options)
    result.coordSystem = options.coordSystem
    result.waypoints = []

    result.stop = function () {
      // чистим старый маршрут
      this.waypoints.length = 0
    }
    /**
     * Метод анимации движения машики по марщруту.
     * @function
     * @name Car.moveTo
     * @param {Array} segments Массив сегментов маршрута.
     * @param {Object} [options] Опции анимации.
     * @param {Function} movingCallback Функция обратного вызова по-сегментам маршрута.
     * @param {Function} completeCallback Функция обратного вызова завершения анимации.
     */
    result.moveTo = function (
      segments,
      options,
      movingCallback,
      completeCallback
    ) {
      if (!segments) return
      options = options || {}
      // ищем систему координат
      options.coordSystem =
        options.coordSystem ||
        this.coordSystem ||
        this.getMap()
          .options.get('projection')
          .getCoordSystem()
      // считаем скорость базируясь на текущем зуме: very dirty but works pretty cute
      options.speed =
        options.speed || Math.round(1000 / this.getMap().getZoom())
      // Получаем точечки
      var waypoints = makeWayPointsFromSegments(segments, options)
      // =======================================================================================
      var buffer = []
      // Задаём значение, уменьшающее количество переключений направлений
      var MAX_BUFFER_LENGTH = 20

      this.waypoints = waypoints.map((point, i) => {
        buffer.push(point)

        if (
          buffer.length >= 2 &&
          point.direction.t !== buffer[buffer.length - 2].direction.t
        ) {
          if (buffer.length > MAX_BUFFER_LENGTH) {
            buffer = [point]
          } else {
            point.direction.t = buffer[buffer.length - 2].direction.t
            buffer.splice(buffer.length - 1, 1, point)
          }
        }

        return buffer[buffer.length - 1]
      })
      // =======================================================================================

      // НАСТОЯЩИЙ РЕГУЛЯТОР СОРОСТИ ДЕДА
      var INTERVAL = 8 // 8 - нормальное значение

      // Запуск анимации
      var timer = setInterval(() => {
        // если точек больше нет - значит приехали
        if (this.waypoints.length === 0) {
          completeCallback(this)
          return clearTimeout(timer)
        }
        // берем следующую точку
        var nextPoint = this.waypoints.shift()
        // и отправляем в пользовательский callback
        movingCallback(this, nextPoint.coords, nextPoint.direction)
      }, INTERVAL)
    }

    return result
  }

  return Car
})()
