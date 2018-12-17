import { DMoroz } from './dmoroz'
import { utils } from './utils'

export function updateZoom (zoom) {
  console.log('up zoom', zoom)
}

export function dedTween (data) {
  var tl = new TimelineLite({ paused: true })
  var DED_CLASS = '.ded-big'
  var canvas = document.getElementById('canvas')
  var dedLaunchBtn = canvas.querySelector('#ded-launch-btn')
  var dedStartPos = { x: 0, y: 0 }
  TweenLite.set(DED_CLASS, dedStartPos)

  var dedLaunch = DMoroz(data)

  // Преобразуем географические координаты в пиксели окна браузера
  var dedCoords = {
    start: utils.converterCoords(points[0][0]),
    end: utils.converterCoords(points[points.length - 1][1])
  }

  var dedMapStartPos = { x: dedCoords.start[0], y: dedCoords.start[1] }
  var dedMapEndPos = { x: dedCoords.end[0], y: dedCoords.end[1] }

  tl.to(DED_CLASS, 2.7, {
    bezier: {
      values: [
        { x: dedMapStartPos.x / 1.7, y: dedMapStartPos.y / 2.7 },
        dedMapStartPos
      ]
    },
    scale: 1,
    ease: Sine.easeOut,
  })
  tl.eventCallback('onComplete', launchDed)

  var launch = utils.delay(dedLaunch, 900)

  function launchDed () {
    TweenLite.to(DED_CLASS, 1.1, {
      display: 'none'
    })
    launch()
  }

  // Вставляем гуляющего по карте Деда Мороза
  var isDedWalking = false

  dedLaunchBtn.addEventListener('click', function () {
    if (!isDedWalking) {
      isDedWalking = true
      tl.restart()
    }
  })

  function onEnterPress (evt) {
    if (evt.key === 'Enter' && !isDedWalking) {
      isDedWalking = true
      tl.restart()
    }
  }
  window.addEventListener('keydown', onEnterPress)
}
