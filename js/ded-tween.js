import { DMoroz } from './dmoroz'
import { Routes } from './routes'
import { utils } from './utils'

export function dedTween (data) {
  var tlComing = new TimelineLite({ paused: true })
  var tlLeaving = new TimelineLite({ paused: true })
  var DED_PARASUITE_CLASS = '.ded-parasuite'
  var DED_CLASS = '.ded-big'
  var DEER_CLASS = '.deer'
  var DED_ON_SLEIGH = [DEER_CLASS, DED_CLASS]
  // var dedLaunchBtn = document.getElementById('ded-launch-btn')

  // Получаем объект цехов с их координатами и принадлежащими пунктами
  var ceh = {}
  data.forEach(pin => {
    if (ceh.hasOwnProperty(pin.ceh)) {
      ceh[pin.ceh].pins.push(pin)
    } else {
      ceh[pin.ceh] = { pins: [pin] }
    }

    if (pin.ceh === pin.name) {
      ceh[pin.ceh].coords = [pin.lat, pin.len]
    }
  })

  var routes = new Routes(ceh)
  var dedLaunch = DMoroz(data, routes, ceh)
  var dedJumpTime = 1.2 //s
  var dedEase = SlowMo.ease.config(0.2, 0.4)

  // Преобразуем географические координаты в пиксели окна браузера
  var dedCoords = {
    start: utils.convertCoords(points[0][0]),
    end: utils.convertCoords(points[points.length - 1][1])
  }

  var dedMapStartPos = { x: dedCoords.start[0], y: dedCoords.start[1] }
  var dedMapEndPos = { x: dedCoords.end[0], y: dedCoords.end[1] }

  // function dedComingOnParasuite () {
  //   tlComing.set(DED_PARASUITE_CLASS, { x: 0, y: 0 })
  //   tlComing
  //     .to(DED_PARASUITE_CLASS, 2.7, {
  //       bezier: {
  //         values: [{ x: dedMapStartPos.x / 1.7, y: dedMapStartPos.y / 2.7 }, dedMapStartPos]
  //       },
  //       scale: 1,
  //       ease: Sine.easeOut
  //     })
  //     .set(DED_PARASUITE_CLASS, {
  //       visibility: 'hidden'
  //     })
  //     .eventCallback('onComplete', dedLaunch)
  // }

  function dedComingOnSleigh () {
    tlComing
      .set(DED_ON_SLEIGH, {
        // Начальная позиция деда на санях
        x: innerWidth - 30,
        y: innerHeight + 300,
        rotation: 60
      })
      .set(DED_CLASS, {
        // Задаём деду начальный масштаб и поворот
        scale: 1.5,
        rotationY: 180
      })
    tlComing
      .to(DED_ON_SLEIGH, 4, {
        // Въезжаем на карту
        bezier: {
          values: [
            { x: innerWidth - 420, y: innerHeight - 70 },
            { x: dedMapStartPos.x + 200, y: dedMapStartPos.y + 200 }
          ]
        },
        rotation: '-=60',
        visibility: 'visible'
      })
      .set(DEER_CLASS, {
        // Останавливаем оленя
        className: '+=deer-stay'
      })
      .to(DED_CLASS, 0.5, {
        // Приседаем перед прыжком
        x: dedMapStartPos.x + 200,
        y: dedMapStartPos.y + 205
      })
      .to(DED_CLASS, dedJumpTime, {
        // Прыгаем в начальную точку маршрута
        bezier: {
          values: [{ x: dedMapStartPos.x + 170, y: dedMapStartPos.y - 70 }, dedMapStartPos]
        },
        rotationY: '-=180',
        scale: 1,
        ease: dedEase,
        className: '+=ded-in-jump'
      })
      .set(DED_CLASS, {
        className: '-=ded-in-jump',
        visibility: 'hidden'
      })
      .eventCallback('onComplete', dedLaunch)
  }

  dedComingOnSleigh()

  // var deerStartPos = { x: innerWidth + 300, y: innerHeight / 2 + 200 }

  // tlDeer.set(DED_CLASS, dedMapEndPos)
  // tlDeer.set(DEER_CLASS, deerStartPos)

  // =============== Прыжок деда на сани ============
  // tlDed2.to(DED_CLASS, 2.7, {
  //   bezier: {
  //     values: [
  //       { x: dedMapEndPos.x + 170, y: dedMapEndPos.y - 70 },
  //       { x: dedMapEndPos.x + 300, y: dedMapEndPos.y + 230 }
  //     ]
  //   },
  //   rotation: '+=360',
  //   rotationY: 180,
  //   scale: 1.5,
  //   ease: Power2.easeInOut
  // })

  // ============ Подъезжание саней с остановкой перед дедом ============
  // tlDeer
  //   .to(DEER_CLASS, 2.7, {
  //     x: dedMapEndPos.x + 300,
  //     y: dedMapEndPos.y + 230,
  //     visibility: 'visible'
  //   })
  //   .set(DEER_CLASS, {
  //     className: '+=deer-stay'
  //   })
  //   .eventCallback('onComplete', function () {
  //     tlDed2.restart().eventCallback('onComplete', function () {
  //       tlLeaving.restart()
  //     })
  //   })

  tlLeaving
    .set(['#map', '#canvas'], {
      css: {
        backgroundColor: 'rba(255,255,255,0)',
        filter: 'blur(0)'
      }
    })
    .set(DED_CLASS, {
      // Проявляем деда в конечной точке
      x: dedMapEndPos.x,
      y: dedMapEndPos.y,
      visibility: 'visible'
    })
    .to(DEER_CLASS, 2.7, {
      // Перемещаем оленя к деду
      x: dedMapEndPos.x + 50,
      y: dedMapEndPos.y + 100,
      className: '-=deer-stay'
    })
    .set(DEER_CLASS, {
      // Останавливаем оленя
      className: '+=deer-stay'
    })
    .to(DED_CLASS, 0.5, {
      // Приседаем перед прыжком
      x: dedMapEndPos.x,
      y: dedMapEndPos.y + 5
    })
    .to(DED_CLASS, dedJumpTime, {
      // Дед прыгает на сани
      bezier: {
        values: [
          { x: dedMapEndPos.x + 25, y: dedMapEndPos.y - 75 },
          { x: dedMapEndPos.x + 50, y: dedMapEndPos.y + 100 }
        ]
      },
      rotationY: 180,
      scale: 1.5,
      ease: dedEase,
      className: '+=ded-in-jump'
    })
    .set(DED_CLASS, {
      className: '-=ded-in-jump'
    })
    .to(DED_ON_SLEIGH, 3, {
      // Уносимся в закат в сторону Пскова
      x: -50,
      y: dedMapEndPos.y + 190,
      className: '-=deer-stay',
      ease: Linear.easeNone
    })
    .to(['#map', '#canvas'], 0.5, {
      // Приглушем и слегка размываем карту
      css: {
        backgroundColor: 'rba(255,255,255,0.3)',
        filter: 'blur(1px)'
      }
    })
    .eventCallback('onComplete', function () {
      // Заускаем снежинки в конце
      new Snowflakes({
        color: 'lightskyblue',
        count: 100,
        minSize: 15,
        maxSize: 30,
        minOpacity: 0.6,
        maxOpacity: 0.9
      })
    })

  function launchLeaving () {
    // tlDeer.restart()
    tlLeaving.restart()
  }

  // Вставляем гуляющего по карте Деда Мороза
  var isDedWalking = false

  // dedLaunchBtn.addEventListener('click', function () {
  //   if (!isDedWalking) {
  //     isDedWalking = true
  //     tlComing.restart()
  //   }
  // })

  function onEnterPress (evt) {
    if (evt.key === 'Enter' && routes.isReady && !isDedWalking) {
      isDedWalking = true
      tlComing.restart()
    }
  }

  window.addEventListener('launchLeaving', launchLeaving)

  window.addEventListener('keydown', onEnterPress)
}
