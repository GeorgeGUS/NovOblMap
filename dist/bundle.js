/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/init.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/car.js":
/*!*******************!*\
  !*** ./js/car.js ***!
  \*******************/
/*! exports provided: Car */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Car\", function() { return Car; });\n/**\n * fileOverview Класс анимированной машинки\n * @see http://ymlib.narod.ru/1.1/demos/animate.html\n * Версия для АПИ 2.0\n * @author <a href=\"mailto:qfox@ya.ru\">Alex Yaroshevich</a>\n */\nvar Car = function Car() {\n  \"use strict\"; // делаем заготовку для кол-ва направлений. 4, 8 или 16 (+, x, *)\n\n  var directionsVariants = {\n    classes: {\n      16: ['w', 'sww', 'sw', 'ssw', 's', 'sse', 'se', 'see', 'e', 'nee', 'ne', 'nne', 'n', 'nnw', 'nw', 'nww'],\n      8: ['w', 'sw', 's', 'se', 'e', 'ne', 'n', 'nw'],\n      4: ['w', 's', 'e', 'n']\n    },\n    n: function n(x, y, _n) {\n      _n = _n || 8;\n      var n2 = _n >> 1; // half of n\n\n      var number = (Math.floor(Math.atan2(x, y) / Math.PI * n2 + 1 / _n) + n2) % _n; // seems like there is a little bug here\n\n\n      return {\n        n: number,\n        t: directionsVariants.classes[_n][number]\n      };\n    },\n    16: function _(x, y) {\n      // -> values in range [0, 16]\n      return directionsVariants.n(x, y, 16);\n    },\n    8: function _(x, y) {\n      // -> values in range [0, 8]\n      return directionsVariants.n(x, y, 8);\n    },\n    4: function _(x, y) {\n      // -> values in range [0, 4]\n      return directionsVariants.n(x, y, 4);\n    }\n  };\n\n  var defaultMovingCallback = function defaultMovingCallback(geoObject, coords, direction) {\n    // действие по умолчанию\n    // перемещаем машинку\n    geoObject.geometry.setCoordinates(coords); // ставим машинке правильное направление - в данном случае меняем ей текст\n\n    geoObject.properties.set('iconContent', direction.t);\n  },\n      defaultCompleteCallback = function defaultCompleteCallback(geoObject) {\n    // действие по умолчанию\n    // приехали\n    geoObject.properties.set('iconContent', \"Приехали!\");\n  }; // нормализуем в один массив точек сегметны из ymaps\n\n\n  var makeWayPointsFromSegments = function makeWayPointsFromSegments(segments, options) {\n    options = options || {};\n    options.directions = [4, 8, 16].indexOf(options.directions) >= 0 ? options.directions : 8; // must be 4, 8, or 16\n\n    options.speed = options.speed || 6;\n    var points,\n        street,\n        wayList = [],\n        // вспомогательные\n    i,\n        j,\n        k,\n        l,\n        prev,\n        cur,\n        direction,\n        getDirection = directionsVariants[options.directions],\n        coordSystem = options.coordSystem; // открываю массив с точками\n\n    points = []; // выполняю операцию для всех сегментов\n\n    for (i = 0, l = segments.length; i < l; i++) {\n      // беру координаты начала и конца сегмента\n      street = segments[i].getCoordinates(); // и добавляю КАЖДУЮ ИЗ НИХ в массив, чтобы получить полный список точек\n\n      for (j = 0, k = street.length; j < k; j++) {\n        cur = street[j]; // пропускаем дубли\n\n        if (prev && prev[0].toPrecision(10) === cur[0].toPrecision(10) && prev[1].toPrecision(10) === cur[1].toPrecision(10)) {\n          continue;\n        }\n\n        points.push(cur);\n        prev = cur;\n      }\n    } // строим путь. берем 1 единицу расстояния, возвращаемого distance, за пройденный путь в единицу времени. в 1 единица времени - будет 1 смещение геоточки. ни разу не оптимальный, но наглядный алгоритм\n\n\n    for (i = 0, l = points.length - 1; l; --l, ++i) {\n      var from = points[i],\n          to = points[i + 1],\n          diff = [to[0] - from[0], to[1] - from[1]];\n      direction = getDirection(diff[0], diff[1]); // каждую шестую, а то слишком медленно двигается. чрезмерно большая точность\n\n      for (j = 0, k = Math.round(coordSystem.distance(from, to)); j < k; j += options.speed) {\n        wayList.push({\n          coords: [from[0] + diff[0] * j / k, from[1] + diff[1] * j / k],\n          direction: direction,\n          vector: diff\n        });\n      }\n    }\n\n    return wayList;\n  };\n  /**\n   * Класс машинки.\n   * TODO: make it a geoObject with right interface.\n   * @class\n   * @name Car\n   * @param {Object} [options] Опции машики.\n   */\n\n\n  var Car = function Car(options) {\n    var properties = {\n      // Описываем геометрию типа \"Точка\".\n      geometry: {\n        type: \"Point\",\n        coordinates: [55.75062, 37.62561]\n      }\n    };\n    options = options || {};\n    options.preset = options.preset || 'twirl#greenStretchyIcon';\n    var result = new ymaps.GeoObject(properties, options);\n    result.coordSystem = options.coordSystem;\n    result.waypoints = [];\n\n    result.stop = function () {\n      // чистим старый маршрут\n      this.waypoints.length = 0;\n    };\n    /**\n     * Метод анимации движения машики по марщруту.\n     * @function\n     * @name Car.moveTo\n     * @param {Array} segments Массив сегментов маршрута.\n     * @param {Object} [options] Опции анимации.\n     * @param {Function} movingCallback Функция обратного вызова по-сегментам маршрута.\n     * @param {Function} completeCallback Функция обратного вызова завершения анимации.\n     */\n\n\n    result.moveTo = function (segments, options, movingCallback, completeCallback) {\n      if (!segments) return;\n      options = options || {}; // ищем систему координат\n\n      options.coordSystem = options.coordSystem || this.coordSystem || this.getMap().options.get('projection').getCoordSystem(); // считаем скорость базируясь на текущем зуме: very dirty but works pretty cute\n\n      options.speed = options.speed || Math.round(80 / this.getMap().getZoom()); // Получаем точечки\n\n      this.waypoints = makeWayPointsFromSegments(segments, options); // Запуск анимации\n\n      var that = this,\n          timer = setInterval(function () {\n        // если точек больше нет - значит приехали\n        if (that.waypoints.length === 0) {\n          (completeCallback || defaultCompleteCallback)(that);\n          return clearTimeout(timer);\n        } // берем следующую точку\n\n\n        var nextPoint = that.waypoints.shift(); // и отправляем в пользовательский callback\n\n        (movingCallback || defaultMovingCallback)(that, nextPoint.coords, nextPoint.direction);\n      }, 42);\n    };\n\n    return result;\n  };\n\n  return Car;\n};\n\n//# sourceURL=webpack:///./js/car.js?");

/***/ }),

/***/ "./js/data.js":
/*!********************!*\
  !*** ./js/data.js ***!
  \********************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"data\", function() { return data; });\nvar data = [{\n  ceh: 'Боровичи',\n  name: 'Анциферово',\n  lat: 58.966335,\n  len: 34.024697,\n  ch1mux: 26,\n  ch2mux: 46\n}, {\n  ceh: 'Великий Новгород',\n  name: 'Батецкий',\n  lat: 58.64474,\n  len: 30.301729,\n  ch1mux: 43,\n  ch2mux: 44\n}, {\n  ceh: 'Боровичи',\n  name: 'Ближнее Заполье',\n  lat: 59.104938,\n  len: 33.30397,\n  ch1mux: 26,\n  ch2mux: 46\n}, {\n  ceh: 'Боровичи',\n  name: 'Боровичи',\n  lat: 58.388219,\n  len: 33.914025,\n  ch1mux: 26,\n  ch2mux: 46\n}, {\n  ceh: 'Пролетарий',\n  name: 'Валдай',\n  lat: 57.980199,\n  len: 33.246667,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Великий Новгород',\n  name: 'Великий Новгород',\n  lat: 58.52281,\n  len: 31.269915,\n  ch1mux: 30,\n  ch2mux: 58\n}, {\n  ceh: 'Боровичи',\n  name: 'Висленев Остров',\n  lat: 58.701964,\n  len: 33.08559,\n  ch1mux: 26,\n  ch2mux: 46\n}, {\n  ceh: 'Великий Новгород',\n  name: 'Волот',\n  lat: 57.927807,\n  len: 30.70677,\n  ch1mux: 40,\n  ch2mux: 29\n}, {\n  ceh: 'Великий Новгород',\n  name: 'Воронино',\n  lat: 58.565688,\n  len: 30.597032,\n  ch1mux: 43,\n  ch2mux: 44\n}, {\n  ceh: 'Боровичи',\n  name: 'Глухачи',\n  lat: 58.614241,\n  len: 35.422108,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Залучье',\n  name: 'Залучье',\n  lat: 57.667865,\n  len: 31.765021,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Залучье',\n  name: 'Ильина Гора',\n  lat: 57.581332,\n  len: 32.652665,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Боровичи',\n  name: 'Кабожа',\n  lat: 58.803774,\n  len: 35.028403,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Боровичи',\n  name: 'Калитино',\n  lat: 58.93598,\n  len: 33.411031,\n  ch1mux: 26,\n  ch2mux: 46\n}, {\n  ceh: 'Боровичи',\n  name: 'Лубенское',\n  lat: 58.629409,\n  len: 35.108937,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Залучье',\n  name: 'Лычково',\n  lat: 57.921493374063736,\n  len: 32.423002282538064,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Боровичи',\n  name: 'Любытино',\n  lat: 58.815748,\n  len: 33.393892,\n  ch1mux: 26,\n  ch2mux: 46\n}, {\n  ceh: 'Пролетарий',\n  name: 'Малая Вишера',\n  lat: 58.845758,\n  len: 32.217664,\n  ch1mux: 30,\n  ch2mux: 58\n}, {\n  ceh: 'Пролетарий',\n  name: 'Мелехово',\n  lat: 59.098917,\n  len: 31.935737,\n  ch1mux: 30,\n  ch2mux: 58\n}, {\n  ceh: 'Пролетарий',\n  name: 'Мокрый Остров',\n  lat: 58.187197,\n  len: 32.487518,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Боровичи',\n  name: 'Мошенское',\n  lat: 58.511464,\n  len: 34.593187,\n  ch1mux: 26,\n  ch2mux: 46\n}, {\n  ceh: 'Пролетарий',\n  name: 'Новинка',\n  lat: 57.801658,\n  len: 33.082419,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Великий Новгород',\n  name: 'Новое Овсино',\n  lat: 58.491838,\n  len: 30.28935,\n  ch1mux: 43,\n  ch2mux: 44\n}, {\n  ceh: 'Залучье',\n  name: 'Переходы',\n  lat: 57.665208,\n  len: 30.867281,\n  ch1mux: 40,\n  ch2mux: 29\n}, {\n  ceh: 'Боровичи',\n  name: 'Пестово',\n  lat: 58.595347,\n  len: 35.800685,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Залучье',\n  name: 'Полново',\n  lat: 57.534352,\n  len: 32.948273,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Пролетарий',\n  name: 'Пролетарий',\n  lat: 58.437358,\n  len: 31.708167,\n  ch1mux: 30,\n  ch2mux: 58\n}, {\n  ceh: 'Великий Новгород',\n  name: 'Старая Каменка',\n  lat: 58.208834,\n  len: 30.093733,\n  ch1mux: 40,\n  ch2mux: 29\n}, {\n  ceh: 'Залучье',\n  name: 'Старая Русса',\n  lat: 58.00852713133914,\n  len: 31.359131990765995,\n  ch1mux: 51,\n  ch2mux: 57\n}, {\n  ceh: 'Великий Новгород',\n  name: 'Тёсовский',\n  lat: 58.791396,\n  len: 30.875761,\n  ch1mux: 30,\n  ch2mux: 58\n}, {\n  ceh: 'Залучье',\n  name: 'Тугино',\n  lat: 57.409961,\n  len: 31.048947,\n  ch1mux: 23,\n  ch2mux: 24\n}, {\n  ceh: 'Боровичи',\n  name: 'Угловка',\n  lat: 58.214007,\n  len: 33.517688,\n  ch1mux: 26,\n  ch2mux: 46\n}, {\n  ceh: 'Боровичи',\n  name: 'Хвойная',\n  lat: 58.896645,\n  len: 34.491507,\n  ch1mux: 26,\n  ch2mux: 46\n}, {\n  ceh: 'Залучье',\n  name: 'Холм',\n  lat: 57.145202,\n  len: 31.178781,\n  ch1mux: 23,\n  ch2mux: 24\n}, {\n  ceh: 'Пролетарий',\n  name: 'Яжелбицы',\n  lat: 58.036126,\n  len: 32.959888,\n  ch1mux: 51,\n  ch2mux: 57\n}];\n\n//# sourceURL=webpack:///./js/data.js?");

/***/ }),

/***/ "./js/dmoroz.js":
/*!**********************!*\
  !*** ./js/dmoroz.js ***!
  \**********************/
/*! exports provided: DMoroz */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DMoroz\", function() { return DMoroz; });\n/* harmony import */ var _car__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./car */ \"./js/car.js\");\n\nfunction DMoroz(routePoints, map) {\n  var car = new _car__WEBPACK_IMPORTED_MODULE_0__[\"Car\"]({\n    iconLayout: ymaps.templateLayoutFactory.createClass('<div class=\"ded ded-$[properties.direction]\"></div>')\n  });\n  var points = [routePoints['Великий Новгород'], {\n    type: 'viaPoint',\n    point: routePoints['Залучье']\n  }, {\n    type: 'viaPoint',\n    point: routePoints['Пролетарий']\n  }, routePoints['Боровичи']];\n  console.log(points); //Маршрут Деда Мороза\n\n  ymaps.route(points).then(function (route) {\n    // Добавление маршрута на карту\n    map.geoObjects.add(route); // И \"Деда\" туда же\n\n    map.geoObjects.add(car);\n  });\n}\n\n//# sourceURL=webpack:///./js/dmoroz.js?");

/***/ }),

/***/ "./js/init.js":
/*!********************!*\
  !*** ./js/init.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./js/data.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ \"./js/routes.js\");\n/* harmony import */ var _dmoroz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dmoroz */ \"./js/dmoroz.js\");\n\n\n\nymaps.ready(init);\n\nfunction init() {\n  var myMap = new ymaps.Map('map', {\n    center: [58.19460497, 32.9240815],\n    controls: [],\n    // убрать все элементы управления\n    zoom: 8.23\n  }, {\n    avoidFractionalZoom: false // Разрешает дробное значение зума\n\n  }); // Запретить манипуляции с картой\n\n  myMap.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom']);\n  var PinLabelClass = ymaps.templateLayoutFactory.createClass(\"<div class=\\\"pin\\\">{{ properties.iconCaption }}</div>\");\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var pin = _step.value;\n      var myPlacemark = new ymaps.Placemark([pin.lat, pin.len], {\n        iconCaption: pin.name\n      }, // {\n      //   iconLayout: 'default#image',\n      //   iconImageHref: PIN_ON,\n      //   iconImageSize: [32, 42],\n      //   iconImageOffset: [-17, -38],\n      //   iconShadow: true,\n      //   iconShadowImageHref: PIN_OFF,\n      //   iconShadowImageSize: [32, 42],\n      //   iconShadowImageOffset: [-17, -36]\n      // }\n      {\n        iconLayout: PinLabelClass\n      });\n      myMap.geoObjects.add(myPlacemark);\n    } // Рисуем маршруты (линии) от цехов до пунктов\n\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator.return != null) {\n        _iterator.return();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  var cehCoords = Object(_routes__WEBPACK_IMPORTED_MODULE_1__[\"createRoutes\"])(_data__WEBPACK_IMPORTED_MODULE_0__[\"data\"], myMap);\n  Object(_dmoroz__WEBPACK_IMPORTED_MODULE_2__[\"DMoroz\"])(cehCoords, myMap); // Рисует Новгородскую область\n\n  ymaps.borders.load('RU', {\n    quality: 2\n  }).then(function (geojson) {\n    var NOV_OBL_INDEX = 32;\n    console.dir(geojson.features[NOV_OBL_INDEX]);\n    console.dir(geojson.features.map(function (f) {\n      return f.properties;\n    }));\n    var objectManager = new ymaps.ObjectManager();\n    var feature = geojson.features[NOV_OBL_INDEX];\n    feature.id = feature.properties.iso3166;\n    feature.options = {\n      strokeWidth: 3,\n      strokeColor: '#ff4500',\n      strokeOpacity: 0.6,\n      fillColor: '#ffd500',\n      fillOpacity: 0.4,\n      openHintOnHover: false\n    };\n    objectManager.add(feature);\n    myMap.geoObjects.add(objectManager);\n  }, function (e) {\n    console.log(e);\n  });\n}\n\n//# sourceURL=webpack:///./js/init.js?");

/***/ }),

/***/ "./js/routes.js":
/*!**********************!*\
  !*** ./js/routes.js ***!
  \**********************/
/*! exports provided: createRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createRoutes\", function() { return createRoutes; });\nfunction createRoutes(data, myMap) {\n  // Получаем объект с координатами головных цехов\n  var cehCoords = {};\n  data.forEach(function (pin) {\n    if (pin.ceh === pin.name) {\n      cehCoords[pin.name] = [pin.lat, pin.len];\n    }\n  }); // Проводим прямые линии от головных цехов до их пунктов\n\n  data.forEach(function (pin, i) {\n    var myPolyline = new ymaps.Polyline([cehCoords[pin.ceh], [pin.lat, pin.len]], {}, {\n      strokeWidth: 3,\n      strokeColor: '#2196f3'\n    });\n\n    if (i < 1) {// console.log(myPolyline)\n    }\n\n    myMap.geoObjects.add(myPolyline);\n  });\n  return cehCoords; // Проводим маршруты от головных цехов до их пунктов\n  // data.forEach((pin, i) => {\n  //   var route = new ymaps.multiRouter.MultiRoute(\n  //     {\n  //       referencePoints: [cehCoords[pin[ceh]], [pin.lat, pin.len]]\n  //     },\n  //     {\n  //       wayPointVisible: false,\n  //       // Внешний вид линии активного маршрута.\n  //       routeActiveStrokeWidth: 5,\n  //       routeActiveStrokeStyle: 'solid',\n  //       routeActiveStrokeColor: '#2196f3',\n  //       // Внешний вид линий альтернативных маршрутов.\n  //       routeStrokeStyle: 'dot',\n  //       routeStrokeColor: '#0000',\n  //       routeStrokeWidth: 1\n  //     }\n  //   )\n  //   if (i < 1) {\n  //     console.log(route)\n  //   }\n  //   myMap.geoObjects.add(route)\n  // })\n  // Set the route.\n  // A driving route is created by default.\n  // var multiRoute = new ymaps.multiRouter.MultiRoute(\n  //   {\n  //     // Route points. Points can be set as coordinates or addresses.\n  //     referencePoints: [\n  //       'Smolenskaya metro station, Moscow',\n  //       'Arbatskaya metro station, Moscow',\n  //       [55.734876, 37.59308] // Lva Tolstogo street\n  //     ]\n  //   },\n  //   {\n  //     // |Automatically set the map viewport so that\n  //     // the entire route is visible.\n  //     boundsAutoApply: true\n  //   }\n  // )\n  // Add the route to the map.\n  // myMap.geoObjects.add(multiRoute)\n}\n\n//# sourceURL=webpack:///./js/routes.js?");

/***/ })

/******/ });