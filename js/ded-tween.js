import { DMoroz } from './dmoroz'
import { utils } from './utils'

export function updateZoom (zoom) {
  console.log('up zoom', zoom)
}

export function dedTween (data) {
  var tlDed = new TimelineLite({ paused: true })
  var tlDed2 = new TimelineLite({ paused: true })
  var tlDeer = new TimelineLite({ paused: true })
  var DED_CLASS = '.ded-big'
  var DED_2_CLASS = '.ded-leaving'
  var DEER_CLASS = '.deer'
  var dedNode = document.querySelector(DED_CLASS)
  var canvas = document.getElementById('canvas')
  var dedLaunchBtn = canvas.querySelector('#ded-launch-btn')
  var dedStartPos = { x: 0, y: 0 }
  tlDed.set(DED_CLASS, dedStartPos)

  var dedLaunch = DMoroz(data, dedNode)

  // Преобразуем географические координаты в пиксели окна браузера
  var dedCoords = {
    start: utils.converterCoords(points[0][0]),
    end: utils.converterCoords(points[points.length - 1][1])
  }

  var dedMapStartPos = { x: dedCoords.start[0], y: dedCoords.start[1] }
  var dedMapEndPos = { x: dedCoords.end[0], y: dedCoords.end[1] }

  tlDed.to(DED_CLASS, 2.7, {
    bezier: {
      values: [
        { x: dedMapStartPos.x / 1.7, y: dedMapStartPos.y / 2.7 },
        dedMapStartPos
      ]
    },
    scale: 1,
    ease: Sine.easeOut
  })
  tlDed.eventCallback('onComplete', launchDed)

  function launchDed () {
    tlDed.to(DED_CLASS, 1.1, {
      visibility: 'hidden'
    })
    dedLaunch()
  }

  var deerStartPos = {x: innerWidth + 300, y: innerHeight / 2 + 200 }

  tlDeer.set(DED_2_CLASS, dedMapEndPos)
  tlDeer.set(DEER_CLASS, deerStartPos)
  tlDed2.to(DED_2_CLASS, 2.7, {
    x: dedMapEndPos.x + 300,
    y: dedMapEndPos.y + 230
  })

  tlDeer.to(DEER_CLASS, 2.7, {
    x: dedMapEndPos.x + 300,
    y: dedMapEndPos.y + 230,
    visibility: 'visible'
  })

  function launchDeer () {
    tlDeer.restart().eventCallback('onComplete', launchDedLeaving)
  }

  function launchDedLeaving () {
    tlDed2.restart()
  }

  // Вставляем гуляющего по карте Деда Мороза
  var isDedWalking = false

  dedLaunchBtn.addEventListener('click', function () {
    if (!isDedWalking) {
      isDedWalking = true
      tlDed.restart()
    }
  })

  function onEnterPress (evt) {
    if (evt.key === 'Enter' && !isDedWalking) {
      isDedWalking = true
      tlDed.restart()
    }
  }

  dedNode.addEventListener('click', launchDeer)

  window.addEventListener('keydown', onEnterPress)
}
