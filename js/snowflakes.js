/*! Snowflakes | © 2018 Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */
'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var animationPrefix = '';

if (typeof window !== 'undefined') {
  animationPrefix = Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join(',').search(/,animation/) > -1 ? '' : 'Webkit';
}

/**
 * Set inline style.
 *
 * @param {DOMElement} dom
 * @param {Object} props
 */


function setStyle(dom, props) {
  Object.keys(props).forEach(function (originalKey) {
    var key = originalKey;

    if (animationPrefix && originalKey.search('animation') > -1) {
      key = animationPrefix + originalKey[0].toUpperCase() + originalKey.substr(1);
    }

    dom.style[key] = props[originalKey];
  });
}

/**
 * Show DOM element.
 *
 * @param {DOMElement} dom
 */

function showElement(dom) {
  setStyle(dom, {
    display: 'block'
  });
}

/**
 * Hide DOM element.
 *
 * @param {DOMElement} dom
 */

function hideElement(dom) {
  setStyle(dom, {
    display: 'none'
  });
}

/**
 * Get random number.
 *
 * @param {number} from
 * @param {number} max
 *
 * @returns {number}
 */

function getRandom(from, max) {
  return from + Math.floor(Math.random() * (max - from));
}

/**
 * Linear interpolation.
 *
 * @param {number} x
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 *
 * @returns {number}
 */

function interpolation(x, x1, x2, y1, y2) {
  return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
}

var Flake =
    /*#__PURE__*/
    function () {
      /**
       * @constructor
       *
       * @param {DOMElement} container
       * @param {number} containerHeight
       * @param {Object} params
       * @param {number} [params.count]
       * @param {number} [params.speed]
       * @param {boolean} [params.rotation]
       * @param {number} [params.minOpacity]
       * @param {number} [params.maxOpacity]
       * @param {number} [params.minSize]
       * @param {number} [params.maxSize]
       * @param {number} [params.types]
       * @param {number} [params.wind]
       * @param {number} [params.zIndex]
       */
      function Flake(container, containerHeight, params) {
        _classCallCheck(this, Flake);

        var isEqual = params.minSize === params.maxSize;
        this.innerSize = isEqual ? 0 : getRandom(0, Flake.maxInnerSize);
        this.size = Flake.calcSize(this.innerSize, params);
        var flake = document.createElement('div'),
            innerFlake = document.createElement('div'),
            animationProps = this.getAnimationProps(containerHeight, params),
            styleProps = {
              animationDelay: animationProps.animationDelay,
              animationDuration: animationProps.animationDuration,
              left: Math.random() * 99 + '%',
              marginTop: -Math.sqrt(2) * this.size + 'px',
              width: this.size + 'px',
              height: this.size + 'px'
            };

        if (!isEqual) {
          styleProps.zIndex = params.zIndex + this.size * 10;
          styleProps.opacity = interpolation(this.size, params.minSize, params.maxSize, params.minOpacity, params.maxOpacity);
        }

        setStyle(flake, styleProps);
        setStyle(innerFlake, {
          animationName: 'snowflake_x_' + this.innerSize,
          animationDelay: Math.random() + 's'
        });
        flake.classList.add('snowflake');
        innerFlake.classList.add('snowflake__inner');

        if (params.types) {
          innerFlake.classList.add('snowflake__inner_type_' + getRandom(0, params.types));
        }

        if (params.wind) {
          innerFlake.classList.add('snowflake__inner_wind');
        }

        if (params.rotation) {
          innerFlake.classList.add('snowflake__inner_rotation' + (Math.random() > 0.5 ? '' : '_reverse'));
        }

        flake.appendChild(innerFlake);
        this._elem = flake;
        container.appendChild(flake);
      }

      /**
       * Calc size.
       *
       * @param {number} innerSize
       * @param {Object} params
       *
       * @returns {number}
       */


      _createClass(Flake, [{
        key: "getAnimationProps",

        /**
         * Get animation properties.
         *
         * @param {number} containerHeight
         * @param {Object} params
         *
         * @returns {Object}
         */
        value: function getAnimationProps(containerHeight, params) {
          var speedMax = containerHeight / 50 / params.speed,
              speedMin = speedMax / 3;
          return {
            animationDelay: Math.random() * speedMax + 's',
            animationDuration: interpolation(this.size, params.minSize, params.maxSize, speedMax, speedMin) + 's'
          };
        }
        /**
         * Resize a flake.
         *
         * @param {number} containerHeight
         * @param {Object} params
         */

      }, {
        key: "resize",
        value: function resize(containerHeight, params) {
          var props = this.getAnimationProps(containerHeight, params);
          setStyle(this._elem, props);
        }
        /**
         * Destroy a flake.
         */

      }, {
        key: "destroy",
        value: function destroy() {
          delete this._elem;
        }
      }], [{
        key: "calcSize",
        value: function calcSize(innerSize, params) {
          return Math.floor(interpolation(innerSize, 0, Flake.maxInnerSize, params.minSize, params.maxSize));
        }
      }]);

      return Flake;
    }();

_defineProperty(Flake, "maxInnerSize", 20);

var mainStyle = '.snowflakes_paused .snowflake,.snowflakes_paused .snowflake__inner,.snowflakes_paused .snowflake__inner:before{-webkit-animation-play-state:paused;animation-play-state:paused}.snowflakes_body{position:fixed;left:0;top:0;width:100%}.snowflake{position:absolute;-webkit-animation:snowflake_y 10s infinite linear;animation:snowflake_y 10s infinite linear;will-change:transform;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}.snowflake__inner{position:absolute;left:0;right:0;top:0;bottom:0}.snowflake__inner:before{position:absolute;left:0;right:0;top:0;bottom:0;content:\'\';background-size:100% 100%}.snowflake__inner_wind{-webkit-animation:snowflake_x_8 1s infinite alternate ease-in-out;animation:snowflake_x_8 1s infinite alternate ease-in-out}.snowflake__inner_rotation:before{-webkit-animation:snowflake_rotation 2s infinite linear;animation:snowflake_rotation 2s infinite linear}.snowflake__inner_rotation_reverse:before{-webkit-animation:snowflake_rotation_reverse 2s infinite linear;animation:snowflake_rotation_reverse 2s infinite linear}@-webkit-keyframes snowflake_rotation{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes snowflake_rotation{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes snowflake_rotation_reverse{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes snowflake_rotation_reverse{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}';

var snowflakeBGImages = {
  0: `%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2236.283%22%20height%3D%2236.283%22%3E%3Cpath%20d%3D%22M35.531%2017.391h-3.09l.845-1.464a.748.748%200%201%200-1.297-.75l-1.276%202.214H28.61l2.515-4.354a.751.751%200%200%200-.272-1.024.75.75%200%200%200-1.024.274l-2.948%205.104h-2.023a6.751%206.751%200%200%200-2.713-4.684l1.019-1.76%205.896-.002a.75.75%200%200%200%200-1.5l-5.029.002%201.051-1.82%202.557.002a.75.75%200%200%200%200-1.5l-1.689-.002%201.545-2.676a.75.75%200%201%200-1.302-.75l-1.547%202.676-.844-1.463a.749.749%200%201%200-1.297.75l1.278%202.213-1.051%201.818-2.514-4.354a.75.75%200%200%200-1.298.75l2.946%205.104-1.016%201.758a6.692%206.692%200%200%200-2.706-.57%206.74%206.74%200%200%200-2.707.568l-1.013-1.754%202.946-5.105a.75.75%200%200%200-1.298-.75L13.56%208.697l-1.05-1.818%201.278-2.217a.749.749%200%200%200-1.298-.75l-.845%201.465-1.551-2.678a.75.75%200%200%200-1.024-.273.748.748%200%200%200-.274%201.023l1.545%202.678H8.652a.75.75%200%200%200%200%201.5h2.556l1.05%201.818H7.231a.75.75%200%200%200%200%201.5h5.894l1.017%201.762a6.755%206.755%200%200%200-2.712%204.684H9.406l-2.95-5.104a.75.75%200%201%200-1.299.75l2.516%204.354H5.569l-1.277-2.213a.75.75%200%200%200-1.298.75l.845%201.463H.75a.75.75%200%200%200%200%201.5h3.09l-.845%201.465a.747.747%200%200%200%20.275%201.022.75.75%200%200%200%20.374.103.75.75%200%200%200%20.65-.375l1.277-2.215h2.103l-2.516%204.354a.75.75%200%200%200%201.299.75l2.949-5.104h2.024a6.761%206.761%200%200%200%202.712%204.685l-1.017%201.762H7.232a.75.75%200%200%200%200%201.5h5.026l-1.05%201.818H8.651a.75.75%200%200%200%200%201.5h1.69l-1.545%202.676a.75.75%200%200%200%201.299.75l1.546-2.676.846%201.465a.755.755%200%200%200%20.65.375.737.737%200%200%200%20.375-.103.747.747%200%200%200%20.274-1.022l-1.279-2.215%201.05-1.82%202.515%204.354a.75.75%200%200%200%201.299-.75l-2.947-5.104%201.013-1.756a6.72%206.72%200%200%200%205.415%200l1.014%201.756-2.947%205.104a.75.75%200%200%200%201.298.75l2.515-4.354%201.053%201.82-1.277%202.213a.75.75%200%200%200%201.298.75l.844-1.463%201.545%202.678c.141.24.393.375.65.375a.75.75%200%200%200%20.649-1.125l-1.548-2.678h1.689a.75.75%200%200%200%200-1.5h-2.557l-1.051-1.82%205.029.002a.75.75%200%200%200%200-1.5l-5.896-.002-1.019-1.76a6.75%206.75%200%200%200%202.711-4.685h2.023l2.947%205.104a.753.753%200%200%200%201.025.273.749.749%200%200%200%20.272-1.023l-2.515-4.354h2.104l1.279%202.215a.75.75%200%200%200%20.649.375c.127%200%20.256-.03.375-.103a.748.748%200%200%200%20.273-1.022l-.848-1.465h3.092a.75.75%200%200%200%20.003-1.5zm-12.136.75c0%20.257-.041.502-.076.75a5.223%205.223%200%200%201-1.943%203.358%205.242%205.242%200%200%201-1.291.766%205.224%205.224%200%200%201-1.949.384%205.157%205.157%200%200%201-3.239-1.15%205.22%205.22%200%200%201-1.943-3.358c-.036-.247-.076-.493-.076-.75s.04-.503.076-.75a5.22%205.22%200%200%201%201.944-3.359c.393-.312.82-.576%201.291-.765a5.219%205.219%200%200%201%201.948-.384c.69%200%201.344.142%201.948.384.471.188.898.454%201.291.765a5.222%205.222%200%200%201%201.943%203.359c.035.247.076.493.076.75z%22%20fill%3D%22%7Bcolor%7D%22%2F%3E%3C%2Fsvg%3E%0A`,
  1: `%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232.813%22%20height%3D%2232.813%22%3E%3Cpath%20d%3D%22M29.106%2024.424a.781.781%200%200%201-.781.781h-3.119v3.119a.782.782%200%200%201-1.562%200v-4.682h4.682c.43.001.78.351.78.782zM4.673%209.352h4.682V4.671a.781.781%200%200%200-1.563%200V7.79H4.673a.781.781%200%200%200%200%201.562zM3.708%2024.24c0%20.431.35.781.781.781H7.61v3.12a.78.78%200%201%200%201.562%200v-4.683H4.489a.782.782%200%200%200-.781.782zM28.923%208.39a.78.78%200%200%200-.781-.781h-3.121V4.488a.781.781%200%200%200-1.562%200v4.684h4.684a.783.783%200%200%200%20.78-.782zm3.889%208.017c0%20.431-.35.781-.781.781h-3.426l1.876%201.873a.784.784%200%200%201%200%201.107.791.791%200%200%201-.554.228.773.773%200%200%201-.55-.228l-2.979-2.98h-2.995a6.995%206.995%200%200%201-1.728%203.875h5.609a.781.781%200%200%201%200%201.562h-4.666v4.667a.782.782%200%200%201-1.562%200v-5.61a7%207%200%200%201-3.866%201.719v2.995l2.978%202.98c.306.305.306.8%200%201.104a.78.78%200%200%201-1.104%200l-1.874-1.876v3.427a.781.781%200%200%201-1.562%200v-3.427l-1.875%201.876a.78.78%200%201%201-1.105-1.104l2.979-2.98v-2.995a7.016%207.016%200%200%201-3.865-1.717v5.608a.781.781%200%200%201-1.562%200v-4.667H5.535a.781.781%200%200%201%200-1.562h5.607a7.022%207.022%200%200%201-1.728-3.875H6.417l-2.979%202.979a.784.784%200%200%201-1.104%200%20.781.781%200%200%201%200-1.106l1.874-1.873H.782a.78.78%200%201%201-.001-1.563h3.426L2.333%2013.75a.783.783%200%200%201%201.105-1.106l2.979%202.979h2.995a6.996%206.996%200%200%201%201.72-3.866H5.533a.781.781%200%200%201%200-1.562h4.666V5.528a.781.781%200%200%201%201.562%200v5.599a6.995%206.995%200%200%201%203.865-1.717V6.415l-2.978-2.979a.782.782%200%200%201%201.105-1.105l1.874%201.875V.781a.78.78%200%201%201%201.562%200v3.426l1.875-1.875a.777.777%200%200%201%201.104%200%20.78.78%200%200%201%200%201.105l-2.978%202.98v2.996a7.021%207.021%200%200%201%203.866%201.718V5.532a.78.78%200%201%201%201.562%200v4.666h4.666a.78.78%200%201%201%200%201.562h-5.599a7%207%200%200%201%201.718%203.866h2.995l2.979-2.979a.783.783%200%200%201%201.106%201.106l-1.876%201.874h3.427a.777.777%200%200%201%20.778.78zm-11.006-.782a5.457%205.457%200%200%200-4.618-4.617c-.257-.037-.514-.079-.781-.079-.268%200-.524.042-.781.079a5.458%205.458%200%200%200-4.618%204.617c-.038.257-.079.514-.079.781s.041.522.079.781a5.455%205.455%200%200%200%204.618%204.616c.257.036.514.079.781.079s.524-.043.781-.079a5.457%205.457%200%200%200%204.618-4.616c.037-.259.079-.515.079-.781s-.043-.524-.079-.781z%22%20fill%3D%22%7Bcolor%7D%22%2F%3E%3C%2Fsvg%3E`,
  2: `%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2235.79%22%20height%3D%2235.79%22%3E%3Cpath%20d%3D%22M7.161%2022.223l.026-.047.865.5-.026.047a.503.503%200%200%201-.434.25c-.019%200-.034-.013-.053-.016l-.355-.205a.493.493%200%200%201-.023-.529zM9.969%208.988l2.785.001%201.393-2.414a.502.502%200%200%200-.869-.499l-1.103%201.913-2.208-.001a.5.5%200%201%200%20.002%201zm15.854%2017.813h-2.785l-1.393%202.411a.499.499%200%200%200%20.436.75c.172%200%20.34-.09.434-.25l1.104-1.911h2.207c.274%200%20.5-.224.5-.5a.505.505%200%200%200-.503-.5zM23.038%208.99h2.785a.5.5%200%200%200%200-1h-2.207l-1.105-1.913a.5.5%200%200%200-.868.5l1.395%202.413zM12.754%2026.801H9.967a.5.5%200%200%200%200%201h2.209l1.105%201.912a.496.496%200%200%200%20.682.184.5.5%200%200%200%20.184-.684l-1.393-2.412zm-7.218-6.309a.502.502%200%200%200%20.685-.184l1.391-2.413-1.394-2.413a.5.5%200%200%200-.867.5l1.104%201.913-1.104%201.913a.5.5%200%200%200%20.185.684zM30.254%2015.3a.505.505%200%200%200-.685.183l-1.392%202.412%201.395%202.414a.501.501%200%200%200%20.867-.5l-1.104-1.914%201.104-1.912a.5.5%200%200%200-.185-.683zm3.138%2011.542a.501.501%200%200%201-.683.184l-.98-.565-2.137%201.231a.516.516%200%200%201-.5%200l-2.385-1.377a.502.502%200%200%201-.25-.433v-.854h-4.441l-2.225%203.852.736.428c.154.088.25.254.25.432l.001%202.755a.5.5%200%200%201-.25.433l-2.133%201.229v1.136c0%20.274-.225.5-.5.5s-.5-.226-.5-.5v-1.136l-2.136-1.23a.5.5%200%200%201-.25-.433l.001-2.755c0-.178.096-.344.25-.432l.738-.427-2.224-3.849H9.332l.002.851a.505.505%200%200%201-.25.435l-2.387%201.377a.5.5%200%200%201-.5%200L4.06%2026.46l-.982.567a.5.5%200%200%201-.5-.867l.982-.567.001-2.465c0-.179.097-.344.25-.434l2.388-1.377a.497.497%200%200%201%20.5%200l.736.426%202.221-3.848-2.222-3.849-.737.426a.51.51%200%200%201-.5%200l-2.386-1.377a.5.5%200%200%201-.25-.434l.002-2.464-.983-.567a.501.501%200%200%201-.184-.683.502.502%200%200%201%20.684-.183l.983.568%202.134-1.233a.5.5%200%200%201%20.5%200l2.385%201.379c.156.089.25.255.25.433v.85h4.443l2.223-3.846-.74-.427a.501.501%200%200%201-.25-.434l.002-2.755c0-.178.096-.343.25-.433l2.135-1.233V.5a.5.5%200%200%201%201%200v1.135l2.134%201.231c.154.089.25.254.25.434l-.002%202.755a.503.503%200%200%201-.25.433l-.733.425%202.224%203.849h4.44l-.002-.851c0-.179.096-.344.25-.434l2.388-1.378a.502.502%200%200%201%20.5%200l2.136%201.233.982-.568a.5.5%200%201%201%20.5.866l-.983.568v2.464a.503.503%200%200%201-.25.433l-2.388%201.378a.5.5%200%200%201-.5%200l-.735-.426-2.222%203.849%202.223%203.849.734-.425a.506.506%200%200%201%20.5%200l2.389%201.375c.154.09.25.255.25.435l-.002%202.462.982.568c.24.137.321.444.182.682zm-2.165-1.828l.001-1.597-1.888-1.087-.734.424-.348.201-.301.173-.5.289v2.179l1.885%201.088%201.386-.802.498-.286.001-.582zm-3.736-11.467l-.531-.307-2.283%201.318-2.443%203.337%202.442%203.337%202.283%201.316.531-.306-2.514-4.348%202.515-4.347zm-7.712%2016.478l-.762-.438-.339-.194-.283-.166-.5-.289-.5.289-.279.162-.349.2-.757.437-.001%202.177%201.386.797.501.289.499-.287%201.386-.798-.002-2.179zM16.008%205.767l.736.425.371.214.279.16.5.288.5-.289.281-.163.367-.212.732-.424.002-2.178-1.381-.797-.502-.289-.498.287-1.385.8-.002%202.178zm6.52%2014.227l-1.535-2.099%201.535-2.098.732-1-1.232.134-2.585.281-1.048-2.379-.5-1.133-.5%201.134-1.049%202.379-2.585-.281-1.232-.134.732%201%201.536%202.097-1.536%202.098-.732%201%201.232-.134%202.585-.281%201.049%202.379.5%201.134.5-1.134%201.048-2.379%202.585.281%201.232.134-.732-.999zm8.2-10.084l-1.386-.8-1.887%201.089v1.279l.002.32v.577l.5.289.28.163.367.213.732.424%201.888-1.089v-2.178l-.496-.287zM18.927%207.413l-.532.307v2.637l1.667%203.784%204.111-.447%202.283-1.317-.002-.613h-5.02l-2.507-4.351zm-9.594%204.348v.614l2.283%201.318%204.111.447%201.668-3.785V7.719l-.531-.306-2.509%204.347-5.022.001zm-2.15%201.279l.37-.213.279-.162.5-.289V10.2L6.446%209.11l-1.384.8-.499.289v.578l-.002%201.599%201.885%201.088.737-.424zm1.119%209.205l.53.306%202.281-1.316%202.443-3.339-2.442-3.337-2.281-1.317-.531.307%202.511%204.348-2.511%204.348zm-1.115-.069l-.026.047a.493.493%200%200%200%20.023.529l-.734-.424-1.887%201.089-.001%201.599v.578l.5.288%201.386.8%201.887-1.088v-1.278l-.002-.321v-.577l-.5-.289-.293-.169c.02.002.035.017.055.017a.5.5%200%200%200%20.433-.25l.026-.047-.867-.504zm9.679%206.202l.529-.306v-2.637l-1.668-3.785-4.111.447-2.283%201.316.002.611%205.021.002%202.51%204.352zm9.591-4.349v-.612L24.174%2022.1l-4.111-.447-1.667%203.783v2.639l.531.307%202.512-4.352h5.018v-.001z%22%20fill%3D%22%7Bcolor%7D%22%2F%3E%3C%2Fsvg%3E`,
  3: `%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232.815%22%20height%3D%2232.815%22%3E%3Cpath%20d%3D%22M4.581%2023.55h4.681v4.681a.78.78%200%201%201-1.562%200v-3.118H4.581a.781.781%200%200%201%200-1.563zM29.016%208.481a.781.781%200%200%200-.781-.781h-3.119V4.582a.781.781%200%200%200-1.562%200v4.681h4.682c.429%200%20.78-.35.78-.782zm-24.252.598l4.683-.001V4.395a.781.781%200%200%200-1.562%200v3.121l-3.121.001a.781.781%200%200%200%200%201.562zm23.655%2014.287h-4.685l.002%204.684a.78.78%200%201%200%201.562%200l-.002-3.121h3.122a.781.781%200%200%200%20.001-1.563zm4.394-6.96a.78.78%200%200%201-.781.781h-3.426l1.876%201.875a.782.782%200%200%201-1.104%201.105l-2.979-2.979h-1.986L17.19%2024.41v1.987l2.977%202.979a.781.781%200%200%201-1.103%201.106l-1.874-1.875v3.426a.78.78%200%201%201-1.562%200v-3.426l-1.875%201.875a.782.782%200%200%201-1.105-1.105l2.978-2.979V24.41l-7.219-7.22H6.418l-2.98%202.98a.777.777%200%200%201-1.103%200%20.781.781%200%200%201%200-1.106L4.21%2017.19H.783a.78.78%200%201%201%200-1.562h3.426l-1.876-1.875a.782.782%200%201%201%201.106-1.105l2.979%202.979h1.989l7.219-7.218v-1.99L12.648%203.44a.782.782%200%201%201%201.106-1.105l1.874%201.874V.781a.782.782%200%200%201%201.563%200v3.426l1.875-1.875a.783.783%200%200%201%201.106%201.105l-2.979%202.979v1.99l7.216%207.218h1.992l2.979-2.979a.782.782%200%200%201%201.105%201.105l-1.876%201.874h3.427a.781.781%200%200%201%20.777.782zm-10.613.782l.778-.78-.781-.782-5.009-5.008-.781-.781-.781.781-5.01%205.008-.781.781.781.781%205.01%205.011.782.781.78-.779%205.012-5.013zm5.863%204.646a.782.782%200%200%200-.781-.781h-6.229v6.228a.78.78%200%201%200%201.562%200v-4.665h4.666a.782.782%200%200%200%20.782-.782zm-.001-10.855a.782.782%200%200%200-.781-.781h-4.664V5.532a.782.782%200%200%200-1.562%200v6.228h6.227a.78.78%200%200%200%20.78-.781zm-23.318%200c0%20.432.35.781.781.781h6.228V5.532a.781.781%200%200%200-1.562%200v4.666H5.525a.781.781%200%200%200-.781.781zm.002%2010.855c0%20.432.35.781.781.781h4.664v4.665a.78.78%200%201%200%201.562%200v-6.228H5.527a.783.783%200%200%200-.781.782z%22%20fill%3D%22%7Bcolor%7D%22%2F%3E%3C%2Fsvg%3E`,
  4: `%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2237.794%22%20height%3D%2237.794%22%3E%3Cpath%20d%3D%22M30.638%2017.313l-.914%201.584.915%201.585a.78.78%200%201%201-1.352.78l-1.366-2.366%201.366-2.365a.782.782%200%200%201%201.067-.286c.372.215.5.692.284%201.068zM11.65%2011.08l2.733.002%201.367-2.367a.78.78%200%200%200-1.352-.781l-.915%201.585-1.831-.002h-.001a.78.78%200%200%200-.001%201.563zm14.491%2015.633h-2.733l-1.365%202.365a.78.78%200%201%200%201.352.78l.914-1.584h1.831a.781.781%200%200%200%20.001-1.561zm-4.1-17.998l1.367%202.367h2.733a.78.78%200%201%200%200-1.562h-1.833l-.915-1.585a.78.78%200%200%200-1.352.78zM15.75%2029.08l-1.368-2.366h-2.733a.781.781%200%200%200%200%201.562h1.832l.917%201.585c.146.25.409.391.677.391a.779.779%200%200%200%20.675-1.172zm-8.313-7.531a.78.78%200%200%200%201.067-.284L9.87%2018.9l-1.367-2.368a.781.781%200%200%200-1.351.781l.916%201.587-.914%201.584a.776.776%200%200%200%20.283%201.065zm27.827%206.798a.784.784%200%200%201-1.067.285l-.89-.515-2.096%201.209a.793.793%200%200%201-.391.105.762.762%200%200%201-.391-.105l-2.484-1.435a.78.78%200%200%201-.391-.676l-.002-2.417-2.408-1.392a7.714%207.714%200%200%201-5.467%203.168v2.773l2.093%201.208a.78.78%200%200%201%20.391.676l.001%202.868c0%20.28-.149.537-.392.676l-2.093%201.205v1.032a.781.781%200%200%201-1.562%200V35.98l-2.095-1.207a.78.78%200%200%201-.391-.676l.001-2.868c0-.28.15-.537.391-.676l2.094-1.206v-2.773a7.718%207.718%200%200%201-5.468-3.168l-2.408%201.392.002%202.415c0%20.281-.15.539-.391.676l-2.487%201.437a.785.785%200%200%201-.782%200l-2.095-1.209-.893.518a.782.782%200%200%201-.782-1.354l.893-.517.001-2.414a.78.78%200%200%201%20.391-.677l2.487-1.434a.774.774%200%200%201%20.781%200l2.093%201.208%202.407-1.39a7.655%207.655%200%200%201%200-6.317l-2.406-1.39-2.096%201.209a.772.772%200%200%201-.782%200l-2.485-1.434a.786.786%200%200%201-.391-.676l.002-2.416-.894-.517a.78.78%200%200%201-.285-1.066.788.788%200%200%201%201.07-.283l.893.514%202.093-1.208a.774.774%200%200%201%20.781%200L9.851%209.91c.24.14.391.398.391.675L10.24%2013l2.408%201.392a7.712%207.712%200%200%201%205.468-3.167V8.45L16.02%207.242a.78.78%200%200%201-.391-.676l.002-2.87c0-.279.15-.538.391-.675l2.094-1.208V.781a.781.781%200%200%201%201.562%200v1.032l2.093%201.206a.785.785%200%200%201%20.391.677l-.002%202.87c0%20.28-.149.536-.391.674l-2.091%201.208v2.772a7.708%207.708%200%200%201%205.467%203.167l2.409-1.392-.002-2.416c0-.28.149-.539.391-.676l2.487-1.436c.24-.14.539-.14.781%200l2.095%201.208.894-.514a.78.78%200%201%201%20.781%201.352l-.894.516v2.417c0%20.279-.15.538-.391.675l-2.487%201.436a.785.785%200%200%201-.782%200l-2.092-1.209-2.408%201.39c.436.967.684%202.032.684%203.158a7.65%207.65%200%200%201-.684%203.158l2.408%201.391%202.091-1.206a.782.782%200%200%201%20.78%200l2.488%201.432c.24.141.392.398.392.677l-.002%202.414.893.517a.783.783%200%200%201%20.287%201.068zm-6.147-16.251l.001.9.78.453.921.531%201.706-.982v-1.965l-.78-.451-.923-.533-1.707.983.002%201.064zm-20.443-.002l.002-1.063-1.706-.985-.922.535-.778.451-.001.902-.001%201.063%201.703.982.924-.533.779-.451v-.901zm0%2013.604l-.001-.899-.781-.451-.919-.533-1.706.982-.001%201.064v.901l.781.451.923.533%201.707-.982-.003-1.066zm15.109-3.076c.315-.413.586-.864.789-1.351a6.121%206.121%200%200%200%200-4.748%206.175%206.175%200%200%200-.789-1.35%206.158%206.158%200%200%200-4.106-2.375%206.48%206.48%200%200%200-.781-.056c-.266%200-.525.022-.781.056a6.149%206.149%200%200%200-4.106%202.375%206.128%206.128%200%200%200-.789%201.35%206.104%206.104%200%200%200-.479%202.374%206.1%206.1%200%200%200%201.268%203.725%206.15%206.15%200%200%200%204.106%202.374c.256.031.516.056.781.056s.525-.022.781-.056a6.142%206.142%200%200%200%204.106-2.374zM17.19%206.113l.924.531.781.452.781-.452.919-.531.002-1.968-.921-.531-.784-.452-.779.451-.922.532-.001%201.968zm3.408%2025.57l-.921-.532-.781-.452-.781.452-.922.532-.001%201.966.923.531.782.451.78-.449.922-.533-.001-1.966zm11.925-5.819l.001-1.063-1.707-.981-.919.529-.782.451v.901l.001%201.065%201.702.981.924-.533.778-.449.002-.901z%22%20fill%3D%22%7Bcolor%7D%22%2F%3E%3C%2Fsvg%3E`,
  5: `%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2231.25%22%20height%3D%2231.25%22%3E%3Cpath%20d%3D%22M20.581%201.176l-3.914%203.915V0h1.041v2.576L19.845.439l.736.737zm-1.615%209.069l.351.217%206.623-6.625-.736-.737-6.048%206.051a7.141%207.141%200%200%200-1.449-.6v-.082l5.082-5.082-.737-.737-5.387%205.388v1.33l.402.093a6.213%206.213%200%200%201%201.899.784zm2.041%202.043c.368.585.63%201.224.786%201.893l.094.403h1.028l5.171-5.173-.736-.737-4.699%204.701a7.523%207.523%200%200%200-.549-1.28l6.048-6.05-.737-.735-6.622%206.625.216.353zm7.368%201.254l1.921-1.923-.736-.735-3.699%203.7h5.39v-1.042h-2.876zm1.185%206.826l.736-.736-1.923-1.923h2.877v-1.042h-5.389l3.699%203.701zm-6.915-2.498l4.705%204.707.736-.736-5.171-5.174h-1.03l-.096.4a6.24%206.24%200%200%201-.795%201.883l-.22.353%206.639%206.641.736-.736-6.061-6.062c.227-.414.414-.84.557-1.276zm-3.7%203.125a6.241%206.241%200%200%201-1.88.794l-.399.096v1.33l5.387%205.387.736-.736-5.082-5.082v-.089a7.322%207.322%200%200%200%201.434-.605l6.061%206.062.736-.736-6.641-6.641-.352.22zM16.667%2031.25h1.041v-2.576l2.137%202.137.736-.737-3.914-3.914v5.09zm-5.26-.439l2.134-2.137v2.576h1.042v-5.093l-3.913%203.916.737.738zm.897-9.816l-.352-.222-6.642%206.641.736.736%206.062-6.062c.456.254.937.456%201.433.605v.089l-5.08%205.082.736.736%205.387-5.387v-1.33l-.4-.096a6.175%206.175%200%200%201-1.88-.792zm-2.046-2.047a6.315%206.315%200%200%201-.798-1.883l-.096-.4H8.335l-5.172%205.174.737.736%204.706-4.71c.145.441.329.865.556%201.276L3.1%2025.202l.736.736%206.643-6.643-.221-.347zM0%2016.667v1.042h2.876L.954%2019.632l.736.736%203.698-3.701H0zm1.69-5.783l-.736.735%201.921%201.923H0v1.042h5.39l-3.7-3.7zm6.916%202.498L3.9%208.674l-.736.737%205.172%205.173h1.029l.096-.4a6.15%206.15%200%200%201%20.798-1.881l.222-.352L3.837%205.31l-.736.736%206.062%206.06a7.268%207.268%200%200%200-.557%201.276zm-.145-9.996l5.08%205.082v.088c-.497.15-.977.352-1.433.606L6.047%203.101l-.736.737%206.643%206.643.352-.222a6.223%206.223%200%200%201%201.88-.797l.4-.095v-1.33L9.2%202.649l-.739.737zm5.081-.81L11.408.439l-.736.737%203.913%203.917V0h-1.042v2.576zm-1.757%2014.831a4.2%204.2%200%200%200%202.06%202.058l.739.338v-3.136h-3.138l.339.74zm0-3.562l-.337.738h3.135v-3.136l-.739.338a4.223%204.223%200%200%200-2.059%202.06zm7.679%203.561l.338-.739h-3.135v3.136l.738-.338a4.204%204.204%200%200%200%202.059-2.059zm0-3.561a4.198%204.198%200%200%200-2.059-2.06l-.738-.34v3.138h3.135l-.338-.738z%22%20fill%3D%22%7Bcolor%7D%22%2F%3E%3C%2Fsvg%3E`,
  6: `%3Csvg xmlns='http://www.w3.org/2000/svg' height='147.7' width='267.4' viewBox='0 0 267.4 147.7'%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath d='M870.8 439.3c0-4.8-4-9-8.9-9l-137 .1a9 9 0 0 0-8.8 9v79a9 9 0 0 0 8.8 8.7h137c4.9 0 8.9-4 8.9-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='b' spreadMethod='pad' gradientTransform='matrix(618.148 0 0 -618.148 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='c'%3E%3Cpath d='M754.7 245.8c0-4.8-4-9-8.9-9l-137 .1a9 9 0 0 0-8.9 9v79c0 4.8 4 8.7 9 8.7h136.9a9 9 0 0 0 8.9-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='d' spreadMethod='pad' gradientTransform='matrix(618.133 0 0 -618.133 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='e'%3E%3Cpath d='M890.1 129.8c0-4.9-4-9-8.8-9l-137 .1c-4.9 0-8.8 4-8.8 8.9v79c0 4.8 4 8.8 8.8 8.8h137c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='f' spreadMethod='pad' gradientTransform='matrix(617.99 0 0 -617.99 635.2 570.4)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='g'%3E%3Cpath d='M445 168.3c0-4.8-4-9-8.8-9l-137 .2a9 9 0 0 0-8.9 8.8v79c0 4.9 4 8.8 8.9 8.8h137c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='h' spreadMethod='pad' gradientTransform='matrix(618.093 0 0 -618.093 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='i'%3E%3Cpath d='M270.9 323.2c0-4.9-4-9-8.9-9l-137 .1a9 9 0 0 0-8.8 8.9v79c0 4.8 4 8.8 8.9 8.8h137c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='j' spreadMethod='pad' gradientTransform='matrix(618.089 0 0 -618.089 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='k'%3E%3Cpath d='M580.5 594.1c0-4.8-4-9-8.8-9l-137 .1a9 9 0 0 0-8.9 9v79c0 4.8 4 8.7 8.9 8.7h137c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='l' spreadMethod='pad' gradientTransform='matrix(618.213 0 0 -618.213 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='m'%3E%3Cpath d='M445 710.2c0-4.8-4-9-8.8-9l-137 .2a9 9 0 0 0-8.9 8.8v79a9 9 0 0 0 8.9 8.9h137c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='n' spreadMethod='pad' gradientTransform='matrix(618.159 0 0 -618.159 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='o'%3E%3Cpath d='M270.9 865a9 9 0 0 0-8.9-8.9H125a9 9 0 0 0-8.8 9v79c0 4.8 4 8.8 8.9 8.8h137c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='p' spreadMethod='pad' gradientTransform='matrix(618.101 0 0 -618.101 635 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='q'%3E%3Cpath d='M270.9 129.8c0-4.9-4-9-8.9-9l-137 .1a9 9 0 0 0-8.8 8.9v79c0 4.8 4 8.8 8.9 8.8h137c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='r' spreadMethod='pad' gradientTransform='matrix(618.013 0 0 -618.013 635.1 570.4)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='s'%3E%3Cpath d='M890.2 710a9 9 0 0 0-8.8-8.8h-79.2a9 9 0 0 0-8.8 8.9v40.4c0 4.9 4 8.9 8.8 8.9h79.2c4.8 0 8.8-4 8.8-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='t' spreadMethod='pad' gradientTransform='matrix(618.118 0 0 -618.118 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='u'%3E%3Cpath d='M774.1 555.3c0-4.9-4-8.9-8.8-8.9H686c-4.8 0-8.8 4-8.8 8.9v40.4c0 4.8 4 8.8 8.8 8.8h79.2c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='v' spreadMethod='pad' gradientTransform='matrix(618.174 0 0 -618.174 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='w'%3E%3Cpath d='M987 477.9c0-4.9-4-8.9-8.8-8.9H899a9 9 0 0 0-8.8 8.9v40.4a9 9 0 0 0 8.8 8.9h79.2a9 9 0 0 0 8.8-9z'/%3E%3C/clipPath%3E%3CradialGradient id='x' spreadMethod='pad' gradientTransform='matrix(618.195 0 0 -618.195 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='y'%3E%3Cpath d='M716 361.8c0-4.9-4-8.9-8.8-8.9h-79.1a9 9 0 0 0-8.8 8.9v40.4a9 9 0 0 0 8.8 8.9h79.1c4.9 0 8.8-4 8.8-9z'/%3E%3C/clipPath%3E%3CradialGradient id='z' spreadMethod='pad' gradientTransform='matrix(618.272 0 0 -618.272 635.1 570.6)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='A'%3E%3Cpath d='M716 168.4c0-4.9-4-8.9-8.8-8.9h-79.1a9 9 0 0 0-8.8 8.9v40.4c0 4.8 4 8.8 8.8 8.8h79.1c4.9 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='B' spreadMethod='pad' gradientTransform='matrix(617.888 0 0 -617.888 635.1 570.4)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='C'%3E%3Cpath d='M271 245.7a9 9 0 0 0-8.8-8.9H183a9 9 0 0 0-8.8 8.9v40.4c0 4.9 4 8.9 8.8 8.9h79.2c4.8 0 8.8-4 8.8-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='D' spreadMethod='pad' gradientTransform='matrix(618.104 0 0 -618.104 635 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='E'%3E%3Cpath d='M600 516.6a9 9 0 0 0-8.9-8.9h-79c-5 0-9 4-9 8.9V557c0 4.9 4 8.8 9 8.8h79c4.9 0 8.9-4 8.9-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='F' spreadMethod='pad' gradientTransform='matrix(618.111 0 0 -618.111 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='G'%3E%3Cpath d='M600 439.2a9 9 0 0 0-8.9-8.9h-79c-5 0-9 4-9 8.9v40.4a9 9 0 0 0 9 8.8h79c4.9 0 8.9-4 8.9-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='H' spreadMethod='pad' gradientTransform='matrix(618.041 0 0 -618.041 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='I'%3E%3Cpath d='M483.9 439.2c0-4.9-4-8.9-8.8-8.9h-79.2a9 9 0 0 0-8.8 8.9v40.4c0 4.8 4 8.8 8.8 8.8h79.2c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='J' spreadMethod='pad' gradientTransform='matrix(618.123 0 0 -618.123 635.2 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='K'%3E%3Cpath d='M367.7 439.2c0-4.9-4-8.9-8.8-8.9h-79.1a9 9 0 0 0-8.9 8.9v40.4a9 9 0 0 0 8.9 8.8h79.1c4.9 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='L' spreadMethod='pad' gradientTransform='matrix(618.18 0 0 -618.18 635.2 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='M'%3E%3Cpath d='M154.9 632.7c0-4.9-4-8.9-8.8-8.9H66.9a9 9 0 0 0-8.8 8.9V673c0 4.9 4 8.8 8.8 8.8h79.2c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='N' spreadMethod='pad' gradientTransform='matrix(618.182 0 0 -618.182 635.2 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='O'%3E%3Cpath d='M387 826.2c0-4.8-3.9-8.9-8.7-8.9H299a9 9 0 0 0-8.8 9v40.3a9 9 0 0 0 8.8 8.9h79.2c4.8 0 8.8-4 8.8-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='P' spreadMethod='pad' gradientTransform='matrix(618.211 0 0 -618.211 635.2 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='Q'%3E%3Cpath d='M213 981a9 9 0 0 0-9-8.8h-79a9 9 0 0 0-8.9 8.9v40.4c0 4.8 4 8.8 8.9 8.8h79c5 0 9-4 9-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='R' spreadMethod='pad' gradientTransform='matrix(618.161 0 0 -618.161 635 570.4)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='S'%3E%3Cpath d='M154.9 245.7a9 9 0 0 0-8.8-8.9H66.9a9 9 0 0 0-8.8 8.9v40.4c0 4.9 4 8.9 8.8 8.9h79.2c4.8 0 8.8-4 8.8-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='T' spreadMethod='pad' gradientTransform='matrix(618.175 0 0 -618.175 635.2 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='U'%3E%3Cpath d='M832.2 361.8a9 9 0 0 0-8.9-8.9h-79a9 9 0 0 0-9 8.9v40.4a9 9 0 0 0 9 8.9h79c5 0 8.9-4 8.9-9z'/%3E%3C/clipPath%3E%3CradialGradient id='V' spreadMethod='pad' gradientTransform='matrix(618.193 0 0 -618.193 635.1 570.6)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='W'%3E%3Cpath d='M909.5 361.8c0-4.9-4-8.8-8.8-8.8h-40.4c-4.8 0-8.8 4-8.8 8.8v21c0 5 4 8.9 8.8 8.9h40.4c4.9 0 8.8-4 8.8-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='X' spreadMethod='pad' gradientTransform='matrix(618.139 0 0 -618.139 635.2 570.6)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='Y'%3E%3Cpath d='M793.4 71.6c0-5-4-9-8.8-9h-40.4c-4.9 0-8.8 4-8.8 9v21c0 4.9 4 8.8 8.8 8.8h40.4c4.9 0 8.8-4 8.8-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='Z' spreadMethod='pad' gradientTransform='matrix(618.798 0 0 -618.798 635.2 571)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='aa'%3E%3Cpath d='M696.7 439.2c0-4.9-4-8.8-8.9-8.8h-40.3c-5 0-8.9 4-8.9 8.8v21c0 5 4 8.9 8.9 8.9h40.3c5 0 8.9-4 8.9-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='ab' spreadMethod='pad' gradientTransform='matrix(618.257 0 0 -618.257 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='ac'%3E%3Cpath d='M696.7 497.3c0-5-4-8.9-8.9-8.9h-40.3c-5 0-8.9 4-8.9 8.9v21c0 4.9 4 8.8 8.9 8.8h40.3c5 0 8.9-4 8.9-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='ad' spreadMethod='pad' gradientTransform='matrix(618.26 0 0 -618.26 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='ae'%3E%3Cpath d='M774.1 632.8c0-5-4-8.9-8.9-8.9H725c-4.9 0-8.8 4-8.8 8.9v21c0 4.8 4 8.8 8.8 8.8h40.3c5 0 8.9-4 8.9-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='af' spreadMethod='pad' gradientTransform='matrix(618.097 0 0 -618.097 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='ag'%3E%3Cpath d='M522.5 710.2c0-5-4-8.9-8.8-8.9h-40.4c-4.9 0-8.8 4-8.8 8.9v21c0 4.8 4 8.8 8.8 8.8h40.4c4.8 0 8.8-4 8.8-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='ah' spreadMethod='pad' gradientTransform='matrix(618.281 0 0 -618.281 635.2 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='ai'%3E%3Cpath d='M348.3 903.7c0-5-4-8.9-8.8-8.9H299c-4.8 0-8.8 4-8.8 8.9v21c0 4.9 4 8.8 8.8 8.8h40.4c4.9 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='aj' spreadMethod='pad' gradientTransform='matrix(618.068 0 0 -618.068 635.2 570.6)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='ak'%3E%3Cpath d='M483.8 536c0-5-4-8.8-8.8-8.8h-40.4a8.7 8.7 0 0 0-8.8 8.8v21c0 4.9 4 8.8 8.8 8.8H475c4.9 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='al' spreadMethod='pad' gradientTransform='matrix(617.984 0 0 -617.984 635 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='am'%3E%3Cpath d='M251.6 439.2c0-4.9-4-8.8-8.9-8.8h-40.3c-4.9 0-8.8 4-8.8 8.8v21c0 5 4 8.9 8.8 8.9h40.3c5 0 8.9-4 8.9-8.9z'/%3E%3C/clipPath%3E%3CradialGradient id='an' spreadMethod='pad' gradientTransform='matrix(618.188 0 0 -618.188 635.2 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='ao'%3E%3Cpath d='M522.5 226.4c0-5-4-8.9-8.8-8.9h-40.4c-4.9 0-8.8 4-8.8 8.9v21c0 4.9 4 8.8 8.8 8.8h40.4c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='ap' spreadMethod='pad' gradientTransform='matrix(618.208 0 0 -618.208 635.2 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='aq'%3E%3Cpath d='M600 381.1c0-4.8-4-8.8-8.8-8.8h-40.4c-4.9 0-8.8 4-8.8 8.8v21c0 5 4 9 8.8 9h40.4c4.9 0 8.8-4 8.8-9z'/%3E%3C/clipPath%3E%3CradialGradient id='ar' spreadMethod='pad' gradientTransform='matrix(618.252 0 0 -618.252 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='as'%3E%3Cpath d='M1064.3 710.2c0-4.8-4-9-8.8-9l-137 .2a9 9 0 0 0-8.9 8.8v79a9 9 0 0 0 9 8.9h136.9c4.8 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='at' spreadMethod='pad' gradientTransform='matrix(618.152 0 0 -618.152 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='au'%3E%3Cpath d='M928.9 245.7c0-4.8-4-8.8-8.8-8.8H783c-5 0-8.9 4-8.9 8.8v79.1c0 4.9 4 8.8 8.9 8.8h137c5 0 8.9-4 8.9-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='av' spreadMethod='pad' gradientTransform='matrix(618.169 0 0 -618.169 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='aw'%3E%3Cpath d='M1025.7 555.4c0-5-4-8.9-8.9-8.9H802.3c-4.9 0-8.8 4-8.8 8.9V673c0 4.9 4 8.8 8.8 8.8h214.5c4.9 0 8.9-4 8.9-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='ax' spreadMethod='pad' gradientTransform='matrix(618.15 0 0 -618.15 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='ay'%3E%3Cpath d='M522.5 284.4c0-4.8-4-8.8-8.8-8.8H299.2c-4.9 0-8.9 4-8.9 8.8v117.8c0 4.8 4 8.8 8.9 8.8h214.5c4.9 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='az' spreadMethod='pad' gradientTransform='matrix(618.052 0 0 -618.052 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='aA'%3E%3Cpath d='M406.4 555.4c0-5-4-8.9-8.8-8.9H183a9 9 0 0 0-8.9 8.9V673c0 4.9 4 8.8 8.9 8.8h214.5c4.9 0 8.8-4 8.8-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='aB' spreadMethod='pad' gradientTransform='matrix(618.174 0 0 -618.174 635.2 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3CclipPath id='aC'%3E%3Cpath d='M271 710.2c0-4.9-4-9-8.9-9H47.6a9 9 0 0 0-8.8 9v117.7c0 4.9 4 8.8 8.8 8.8h214.5c5 0 8.9-4 8.9-8.8z'/%3E%3C/clipPath%3E%3CradialGradient id='aD' spreadMethod='pad' gradientTransform='matrix(618.118 0 0 -618.118 635.1 570.5)' gradientUnits='userSpaceOnUse' r='1' cy='0' cx='0' fy='0' fx='0'%3E%3Cstop offset='0' stop-color='%2354c5f2'/%3E%3Cstop offset='1' stop-color='%2325468c'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg clip-path='url(%23a)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M870.8 439.3c0-4.8-4-9-8.9-9l-137 .1a9 9 0 0 0-8.8 9v79a9 9 0 0 0 8.8 8.7h137c4.9 0 8.9-4 8.9-8.8v-79' fill='url(%23b)'/%3E%3C/g%3E%3Cg clip-path='url(%23c)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M754.7 245.8c0-4.8-4-9-8.9-9l-137 .1a9 9 0 0 0-8.9 9v79c0 4.8 4 8.7 9 8.7h136.9a9 9 0 0 0 8.9-8.8v-79' fill='url(%23d)'/%3E%3C/g%3E%3Cg clip-path='url(%23e)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M890.1 129.8c0-4.9-4-9-8.8-9l-137 .1c-4.9 0-8.8 4-8.8 8.9v79c0 4.8 4 8.8 8.8 8.8h137c4.8 0 8.8-4 8.8-8.8v-79' fill='url(%23f)'/%3E%3C/g%3E%3Cg clip-path='url(%23g)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M445 168.3c0-4.8-4-9-8.8-9l-137 .2a9 9 0 0 0-8.9 8.8v79c0 4.9 4 8.8 8.9 8.8h137c4.8 0 8.8-4 8.8-8.8v-79' fill='url(%23h)'/%3E%3C/g%3E%3Cg clip-path='url(%23i)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M270.9 323.2c0-4.9-4-9-8.9-9l-137 .1a9 9 0 0 0-8.8 8.9v79c0 4.8 4 8.8 8.9 8.8h137c4.8 0 8.8-4 8.8-8.8v-79' fill='url(%23j)'/%3E%3C/g%3E%3Cg clip-path='url(%23k)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M580.5 594.1c0-4.8-4-9-8.8-9l-137 .1a9 9 0 0 0-8.9 9v79c0 4.8 4 8.7 8.9 8.7h137c4.8 0 8.8-4 8.8-8.8v-79' fill='url(%23l)'/%3E%3C/g%3E%3Cg clip-path='url(%23m)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M445 710.2c0-4.8-4-9-8.8-9l-137 .2a9 9 0 0 0-8.9 8.8v79a9 9 0 0 0 8.9 8.9h137c4.8 0 8.8-4 8.8-8.8v-79' fill='url(%23n)'/%3E%3C/g%3E%3Cg clip-path='url(%23o)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M270.9 865a9 9 0 0 0-8.9-8.9H125a9 9 0 0 0-8.8 9v79c0 4.8 4 8.8 8.9 8.8h137c4.8 0 8.8-4 8.8-8.8v-79' fill='url(%23p)'/%3E%3C/g%3E%3Cg clip-path='url(%23q)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M270.9 129.8c0-4.9-4-9-8.9-9l-137 .1a9 9 0 0 0-8.8 8.9v79c0 4.8 4 8.8 8.9 8.8h137c4.8 0 8.8-4 8.8-8.8v-79' fill='url(%23r)'/%3E%3C/g%3E%3Cpath d='M157.4 53c0 .7-.5 1.2-1.2 1.2h-10.5c-.7 0-1.2-.5-1.2-1.2v-5.4c0-.6.5-1.2 1.2-1.2h10.5c.7 0 1.2.6 1.2 1.2V53m-5.2 10.3c0 .7-.5 1.2-1.1 1.2h-10.6c-.6 0-1.2-.5-1.2-1.2V58c0-.6.6-1.1 1.2-1.1h10.6c.6 0 1.1.5 1.1 1.1v5.4' fill='%23eb1d27'/%3E%3Cg clip-path='url(%23s)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M890.2 710a9 9 0 0 0-8.8-8.8h-79.2a9 9 0 0 0-8.8 8.9v40.4c0 4.9 4 8.9 8.8 8.9h79.2c4.8 0 8.8-4 8.8-8.9v-40.4' fill='url(%23t)'/%3E%3C/g%3E%3Cg clip-path='url(%23u)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M774.1 555.3c0-4.9-4-8.9-8.8-8.9H686c-4.8 0-8.8 4-8.8 8.9v40.4c0 4.8 4 8.8 8.8 8.8h79.2c4.8 0 8.8-4 8.8-8.8v-40.4' fill='url(%23v)'/%3E%3C/g%3E%3Cg clip-path='url(%23w)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M987 477.9c0-4.9-4-8.9-8.8-8.9H899a9 9 0 0 0-8.8 8.9v40.4a9 9 0 0 0 8.8 8.9h79.2a9 9 0 0 0 8.8-9V478' fill='url(%23x)'/%3E%3C/g%3E%3Cg clip-path='url(%23y)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M716 361.8c0-4.9-4-8.9-8.8-8.9h-79.1a9 9 0 0 0-8.8 8.9v40.4a9 9 0 0 0 8.8 8.9h79.1c4.9 0 8.8-4 8.8-9v-40.3' fill='url(%23z)'/%3E%3C/g%3E%3Cg clip-path='url(%23A)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M716 168.4c0-4.9-4-8.9-8.8-8.9h-79.1a9 9 0 0 0-8.8 8.9v40.4c0 4.8 4 8.8 8.8 8.8h79.1c4.9 0 8.8-4 8.8-8.8v-40.4' fill='url(%23B)'/%3E%3C/g%3E%3Cpath d='M51.6 135.6c0 .6-.5 1.2-1.2 1.2H40c-.7 0-1.2-.6-1.2-1.2v-5.4c0-.7.5-1.2 1.2-1.2h10.5c.7 0 1.2.5 1.2 1.2v5.4' fill='%23eb1d27'/%3E%3Cg clip-path='url(%23C)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M271 245.7a9 9 0 0 0-8.8-8.9H183a9 9 0 0 0-8.8 8.9v40.4c0 4.9 4 8.9 8.8 8.9h79.2c4.8 0 8.8-4 8.8-8.9v-40.4' fill='url(%23D)'/%3E%3C/g%3E%3Cg clip-path='url(%23E)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M600 516.6a9 9 0 0 0-8.9-8.9h-79c-5 0-9 4-9 8.9V557c0 4.9 4 8.8 9 8.8h79c4.9 0 8.9-4 8.9-8.8v-40.4' fill='url(%23F)'/%3E%3C/g%3E%3Cg clip-path='url(%23G)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M600 439.2a9 9 0 0 0-8.9-8.9h-79c-5 0-9 4-9 8.9v40.4a9 9 0 0 0 9 8.8h79c4.9 0 8.9-4 8.9-8.8v-40.4' fill='url(%23H)'/%3E%3C/g%3E%3Cg clip-path='url(%23I)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M483.9 439.2c0-4.9-4-8.9-8.8-8.9h-79.2a9 9 0 0 0-8.8 8.9v40.4c0 4.8 4 8.8 8.8 8.8h79.2c4.8 0 8.8-4 8.8-8.8v-40.4' fill='url(%23J)'/%3E%3C/g%3E%3Cg clip-path='url(%23K)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M367.7 439.2c0-4.9-4-8.9-8.8-8.9h-79.1a9 9 0 0 0-8.9 8.9v40.4a9 9 0 0 0 8.9 8.8h79.1c4.9 0 8.8-4 8.8-8.8v-40.4' fill='url(%23L)'/%3E%3C/g%3E%3Cg clip-path='url(%23M)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M154.9 632.7c0-4.9-4-8.9-8.8-8.9H66.9a9 9 0 0 0-8.8 8.9V673c0 4.9 4 8.8 8.8 8.8h79.2c4.8 0 8.8-4 8.8-8.8v-40.4' fill='url(%23N)'/%3E%3C/g%3E%3Cg clip-path='url(%23O)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M387 826.2c0-4.8-3.9-8.9-8.7-8.9H299a9 9 0 0 0-8.8 9v40.3a9 9 0 0 0 8.8 8.9h79.2c4.8 0 8.8-4 8.8-8.9v-40.4' fill='url(%23P)'/%3E%3C/g%3E%3Cpath d='M12.9 32.4c0 .6-.5 1.1-1.2 1.1H1.2C.5 33.5 0 33 0 32.4V27c0-.7.5-1.2 1.2-1.2h10.5c.7 0 1.2.5 1.2 1.2v5.4' fill='%23eb1d27'/%3E%3Cg clip-path='url(%23Q)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M213 981a9 9 0 0 0-9-8.8h-79a9 9 0 0 0-8.9 8.9v40.4c0 4.8 4 8.8 8.9 8.8h79c5 0 9-4 9-8.8V981' fill='url(%23R)'/%3E%3C/g%3E%3Cpath d='M12.9 14.3c0 .7-.5 1.2-1.2 1.2H1.2C.5 15.5 0 15 0 14.3V9c0-.6.5-1.2 1.2-1.2h10.5c.7 0 1.2.6 1.2 1.2v5.4' fill='%23eb1d27'/%3E%3Cg clip-path='url(%23S)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M154.9 245.7a9 9 0 0 0-8.8-8.9H66.9a9 9 0 0 0-8.8 8.9v40.4c0 4.9 4 8.9 8.8 8.9h79.2c4.8 0 8.8-4 8.8-8.9v-40.4' fill='url(%23T)'/%3E%3C/g%3E%3Cpath d='M95.5 135.6c0 .6-.6 1.2-1.2 1.2H83.7c-.6 0-1.1-.6-1.1-1.2v-5.4c0-.7.5-1.2 1.1-1.2h10.6c.6 0 1.2.5 1.2 1.2v5.4' fill='%23eb1d27'/%3E%3Cg clip-path='url(%23U)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M832.2 361.8a9 9 0 0 0-8.9-8.9h-79a9 9 0 0 0-9 8.9v40.4a9 9 0 0 0 9 8.9h79c5 0 8.9-4 8.9-9v-40.3' fill='url(%23V)'/%3E%3C/g%3E%3Cpath d='M162.6 42.7c0 .6-.6 1.2-1.2 1.2H156c-.7 0-1.2-.6-1.2-1.2v-2.8c0-.7.5-1.2 1.2-1.2h5.4c.6 0 1.2.5 1.2 1.2v2.8m-10.4 0c0 .6-.5 1.2-1.2 1.2h-5.3c-.7 0-1.2-.6-1.2-1.2v-2.8c0-.7.5-1.2 1.2-1.2h5.3c.7 0 1.2.5 1.2 1.2v2.8M147 71c0 .7-.5 1.2-1.1 1.2h-5.4c-.6 0-1.2-.5-1.2-1.1v-2.8c0-.7.6-1.2 1.2-1.2h5.4c.6 0 1.2.5 1.2 1.2V71' fill='%23eb1d27'/%3E%3Cg clip-path='url(%23W)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M909.5 361.8c0-4.9-4-8.8-8.8-8.8h-40.4c-4.8 0-8.8 4-8.8 8.8v21c0 5 4 8.9 8.8 8.9h40.4c4.9 0 8.8-4 8.8-8.9v-21' fill='url(%23X)'/%3E%3C/g%3E%3Cg clip-path='url(%23Y)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M793.4 71.6c0-5-4-9-8.8-9h-40.4c-4.9 0-8.8 4-8.8 9v21c0 4.9 4 8.8 8.8 8.8h40.4c4.9 0 8.8-4 8.8-8.9v-21' fill='url(%23Z)'/%3E%3C/g%3E%3Cpath d='M95.5 143.3c0 .7-.6 1.2-1.2 1.2h-5.4c-.6 0-1.2-.5-1.2-1.2v-2.8c0-.6.6-1.2 1.2-1.2h5.4c.6 0 1.2.6 1.2 1.2v2.8' fill='%23eb1d27'/%3E%3Cg clip-path='url(%23aa)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M696.7 439.2c0-4.9-4-8.8-8.9-8.8h-40.3c-5 0-8.9 4-8.9 8.8v21c0 5 4 8.9 8.9 8.9h40.3c5 0 8.9-4 8.9-8.9v-21' fill='url(%23ab)'/%3E%3C/g%3E%3Cg clip-path='url(%23ac)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M696.7 497.3c0-5-4-8.9-8.9-8.9h-40.3c-5 0-8.9 4-8.9 8.9v21c0 4.9 4 8.8 8.9 8.8h40.3c5 0 8.9-4 8.9-8.8v-21' fill='url(%23ad)'/%3E%3C/g%3E%3Cg clip-path='url(%23ae)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M774.1 632.8c0-5-4-8.9-8.9-8.9H725c-4.9 0-8.8 4-8.8 8.9v21c0 4.8 4 8.8 8.8 8.8h40.3c5 0 8.9-4 8.9-8.9v-21' fill='url(%23af)'/%3E%3C/g%3E%3Cg clip-path='url(%23ag)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M522.5 710.2c0-5-4-8.9-8.8-8.9h-40.4c-4.9 0-8.8 4-8.8 8.9v21c0 4.8 4 8.8 8.8 8.8h40.4c4.8 0 8.8-4 8.8-8.9v-21' fill='url(%23ah)'/%3E%3C/g%3E%3Cg clip-path='url(%23ai)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M348.3 903.7c0-5-4-8.9-8.8-8.9H299c-4.8 0-8.8 4-8.8 8.9v21c0 4.9 4 8.8 8.8 8.8h40.4c4.9 0 8.8-4 8.8-8.8v-21' fill='url(%23aj)'/%3E%3C/g%3E%3Cpath d='M12.9 22c0 .7-.5 1.2-1.2 1.2H6.3c-.6 0-1.1-.5-1.1-1.2v-2.8c0-.6.5-1.1 1.1-1.1h5.4c.7 0 1.2.5 1.2 1.1V22M7.7 4c0 .6-.5 1.2-1.1 1.2H1.2C.5 5.2 0 4.6 0 4V1.2C0 .5.5 0 1.2 0h5.4c.6 0 1.1.5 1.1 1.2V4' fill='%23eb1d27'/%3E%3Cg clip-path='url(%23ak)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M483.8 536c0-5-4-8.8-8.8-8.8h-40.4a8.7 8.7 0 0 0-8.8 8.8v21c0 4.9 4 8.8 8.8 8.8H475c4.9 0 8.8-4 8.8-8.8v-21' fill='url(%23al)'/%3E%3C/g%3E%3Cg clip-path='url(%23am)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M251.6 439.2c0-4.9-4-8.8-8.9-8.8h-40.3c-4.9 0-8.8 4-8.8 8.8v21c0 5 4 8.9 8.8 8.9h40.3c5 0 8.9-4 8.9-8.9v-21' fill='url(%23an)'/%3E%3C/g%3E%3Cpath d='M36.1 138.1c0 .7-.5 1.2-1.2 1.2h-5.3c-.7 0-1.2-.5-1.2-1.2v-2.7c0-.7.5-1.2 1.2-1.2h5.3c.7 0 1.2.5 1.2 1.2v2.7' fill='%23eb1d27'/%3E%3Cg clip-path='url(%23ao)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M522.5 226.4c0-5-4-8.9-8.8-8.9h-40.4c-4.9 0-8.8 4-8.8 8.9v21c0 4.9 4 8.8 8.8 8.8h40.4c4.8 0 8.8-4 8.8-8.8v-21' fill='url(%23ap)'/%3E%3C/g%3E%3Cg clip-path='url(%23aq)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M600 381.1c0-4.8-4-8.8-8.8-8.8h-40.4c-4.9 0-8.8 4-8.8 8.8v21c0 5 4 9 8.8 9h40.4c4.9 0 8.8-4 8.8-9v-21' fill='url(%23ar)'/%3E%3C/g%3E%3Cg clip-path='url(%23as)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M1064.3 710.2c0-4.8-4-9-8.8-9l-137 .2a9 9 0 0 0-8.9 8.8v79a9 9 0 0 0 9 8.9h136.9c4.8 0 8.8-4 8.8-8.8v-79' fill='url(%23at)'/%3E%3C/g%3E%3Cg clip-path='url(%23au)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M928.9 245.7c0-4.8-4-8.8-8.8-8.8H783c-5 0-8.9 4-8.9 8.8v79.1c0 4.9 4 8.8 8.9 8.8h137c5 0 8.9-4 8.9-8.8v-79' fill='url(%23av)'/%3E%3C/g%3E%3Cg clip-path='url(%23aw)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M1025.7 555.4c0-5-4-8.9-8.9-8.9H802.3c-4.9 0-8.8 4-8.8 8.9V673c0 4.9 4 8.8 8.8 8.8h214.5c4.9 0 8.9-4 8.9-8.8V555.4' fill='url(%23ax)'/%3E%3C/g%3E%3Cg clip-path='url(%23ay)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M522.5 284.4c0-4.8-4-8.8-8.8-8.8H299.2c-4.9 0-8.9 4-8.9 8.8v117.8c0 4.8 4 8.8 8.9 8.8h214.5c4.9 0 8.8-4 8.8-8.8V284.4' fill='url(%23az)'/%3E%3C/g%3E%3Cg clip-path='url(%23aA)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M406.4 555.4c0-5-4-8.9-8.8-8.9H183a9 9 0 0 0-8.9 8.9V673c0 4.9 4 8.8 8.9 8.8h214.5c4.9 0 8.8-4 8.8-8.8V555.4' fill='url(%23aB)'/%3E%3C/g%3E%3Cg clip-path='url(%23aC)' transform='matrix(.13333 0 0 -.13333 0 147.7)'%3E%3Cpath d='M271 710.2c0-4.9-4-9-8.9-9H47.6a9 9 0 0 0-8.8 9v117.7c0 4.9 4 8.8 8.8 8.8h214.5c5 0 8.9-4 8.9-8.8V710.2' fill='url(%23aD)'/%3E%3C/g%3E%3C/svg%3E`,
  7: ``,
};

var imagesStyle = `
      .snowflake__inner_type_0:before{background-image:url("data:image/svg+xml,${snowflakeBGImages[0]}")}
      .snowflake__inner_type_1:before{background-image:url("data:image/svg+xml,${snowflakeBGImages[2]}")}
      .snowflake__inner_type_2:before{background-image:url("data:image/svg+xml,${snowflakeBGImages[4]}")}
      .snowflake__inner_type_3:before{background-image:url("data:image/svg+xml,${snowflakeBGImages[6]}")}
      .snowflake__inner_type_4:before{background-image:url("data:image/svg+xml,${snowflakeBGImages[5]}")}
      .snowflake__inner_type_5:before{background-image:url("data:image/svg+xml,${snowflakeBGImages[6]}")}`;

export var Snowflakes =
    /*#__PURE__*/
    function () {
      /**
       * @constructor
       *
       * @param {Object} params
       *
       * @param {DOMElem} [params.container=document.body]
       * @param {number} [params.count=50]
       * @param {number} [params.color="#5ECDEF"]
       * @param {number} [params.minOpacity=0.6]
       * @param {number} [params.maxOpacity=1]
       * @param {number} [params.minSize=8]
       * @param {number} [params.maxSize=18]
       * @param {boolean} [params.rotation=true]
       * @param {number} [params.speed=1]
       * @param {boolean} [params.stop=false]
       * @param {number} [params.types=6]
       * @param {number} [params.width=width of container]
       * @param {number} [params.height=height of container]
       * @param {boolean} [params.wind=true]
       * @param {number} [params.zIndex=9999]
       */
      function Snowflakes(params) {
        var _this = this;

        _classCallCheck(this, Snowflakes);

        this.params = this._setParams(params);
        this._flakes = [];
        this._isBody = this.params.container === document.body;
        var container = this._container = document.createElement('div');
        container.classList.add('snowflakes');
        this._isBody && container.classList.add('snowflakes_body');
        setStyle(container, {
          zIndex: this.params.zIndex
        });
        this.params.container.appendChild(container);

        if (this.params.stop) {
          this.stop();
        }

        if (!Snowflakes._mainStyleNode) {
          Snowflakes._mainStyleNode = this._injectStyle(mainStyle);
          Snowflakes._count = (Snowflakes._count || 0) + 1;
        }

        this._winHeight = this._getWindowHeight();

        this._onResize = function () {
          _this._winHeight = _this._getWindowHeight();

          var height = _this._height();

          hideElement(container);

          _this._flakes.forEach(function (flake) {
            return flake.resize(height, _this.params);
          });

          _this._updateAnimationStyle();

          showElement(container);
        };

        if (imagesStyle) {
          this._imagesStyleNode = this._injectStyle(imagesStyle.replace(/%7Bcolor%7D/g, encodeURIComponent(this.params.color)));
        }

        this._animationStyleNode = this._injectStyle(this._getAnimationStyle());
        window.addEventListener('resize', this._onResize, false);

        for (var i = 0; i < this.params.count; i++) {
          this._flakes.push(new Flake(container, this._height(), this.params));
        }
      }

      /**
       * Destroy flakes.
       */


      _createClass(Snowflakes, [{
        key: "destroy",
        value: function destroy() {
          this._removeStyle();

          this._container && this._container.parentNode.removeChild(this._container);
          delete this._container;
          window.removeEventListener('resize', this._onResize, false);

          this._flakes.forEach(function (flake) {
            return flake.destroy();
          });

          delete this._flakes;
          delete this.params;
        }
        /**
         * Start CSS animation.
         */

      }, {
        key: "start",
        value: function start() {
          this._container.classList.remove('snowflakes_paused');
        }
        /**
         * Stop CSS animation.
         */

      }, {
        key: "stop",
        value: function stop() {
          this._container.classList.add('snowflakes_paused');
        }
      }, {
        key: "_setParams",
        value: function _setParams(params) {
          params = params || {};
          var result = {};
          [['color', '#5ECDEF'], ['container', document.body], ['count', 50], ['speed', 1], ['stop', false], ['rotation', true], ['minOpacity', 0.6], ['maxOpacity', 1], ['minSize', 8], ['maxSize', 18], ['types', 6], ['width'], ['height'], ['wind', true], ['zIndex', 9999]].forEach(function (item) {
            var _item = _slicedToArray(item, 2),
                name = _item[0],
                defaultValue = _item[1];

            if (typeof defaultValue === 'boolean') {
              result[name] = name in params ? params[name] : defaultValue;
            } else {
              result[name] = params[name] || defaultValue;
            }
          });
          return result;
        }
      }, {
        key: "_getAnimationStyle",
        value: function _getAnimationStyle() {
          var height = this._height() + this.params.maxSize + 'px';
          var css = "@-webkit-keyframes snowflake_y{from{-webkit-transform:translateY(0px)}to{-webkit-transform:translateY(".concat(height, ");}}\n@keyframes snowflake_y{from{transform:translateY(0px)}to{transform:translateY(").concat(height, ")}}");

          for (var i = 0; i <= Flake.maxInnerSize; i++) {
            var left = (Flake.calcSize(i, this.params) - this.params.minSize) * 4 + 'px';
            css += "@-webkit-keyframes snowflake_x_".concat(i, "{from{-webkit-transform:translateX(0px)}to{-webkit-transform:translateX(").concat(left, ");}}\n@keyframes snowflake_x_").concat(i, "{from{transform:translateX(0px)}to{transform:translateX(").concat(left, ")}}");
          }

          return css;
        }
      }, {
        key: "_updateAnimationStyle",
        value: function _updateAnimationStyle() {
          this._injectStyle(this._getAnimationStyle(), this._animationStyleNode);
        }
      }, {
        key: "_injectStyle",
        value: function _injectStyle(style, styleNode) {
          if (!styleNode) {
            styleNode = document.createElement('style');
            document.body.appendChild(styleNode);
          }

          if (styleNode.styleSheet) {
            // IE
            styleNode.styleSheet.cssText = style;
          } else if ('textContent' in styleNode) {
            styleNode.textContent = style;
          } else {
            styleNode.innerHTML = style;
          }

          return styleNode;
        }
      }, {
        key: "_removeStyle",
        value: function _removeStyle() {
          Snowflakes._count--;

          if (Snowflakes._count <= 0) {
            Snowflakes._count = 0;

            if (Snowflakes._mainStyleNode) {
              Snowflakes._mainStyleNode.parentNode.removeChild(Snowflakes._mainStyleNode);

              delete Snowflakes._mainStyleNode;
            }
          }

          if (this._animationStyleNode) {
            this._animationStyleNode.parentNode.removeChild(this._animationStyleNode);

            delete this._animationStyleNode;
          }

          if (this._imagesStyleNode) {
            this._imagesStyleNode.parentNode.removeChild(this._imagesStyleNode);

            delete this._imagesStyleNode;
          }
        }
      }, {
        key: "_height",
        value: function _height() {
          return this.params.height || (this._isBody ? this._winHeight : this.params.container.offsetHeight + this.params.maxSize);
        }
      }, {
        key: "_getWindowHeight",
        value: function _getWindowHeight() {
          var body = document.body,
              docElement = document.documentElement;
          var height;

          if (window.innerHeight) {
            height = window.innerHeight;
          } else if (docElement && docElement.clientHeight) {
            height = docElement.clientHeight;
          } else if (body) {
            height = body.clientHeight;
          }

          return height;
        }
      }]);

      return Snowflakes;
    }();
