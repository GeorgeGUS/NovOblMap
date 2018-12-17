import { utils } from './utils'

export function dedTween (dedCoords, dedLaunch) {
  var tl = new TimelineLite({ paused: true })
  var DED_CLASS = '.ded-big'
  var canvas = document.getElementById('canvas')
  var btn1 = canvas.querySelector('#btn1')
  var dedStartPos = { x: 300, y: 0 }
  var dedMapStartPos = { x: dedCoords.start[0], y: dedCoords.start[1] }
  var dedMapEndPos = { x: dedCoords.end[0], y: dedCoords.end[1] }

  TweenLite.set(DED_CLASS, dedStartPos)

  tl.to(DED_CLASS, 1.2, {
    bezier: {
      values: [
        { x: dedMapStartPos.x - 150, y: dedMapStartPos.y - 250 },
        dedMapStartPos
      ]
    },
    scale: 1,
    ease: SlowMo.ease.config(0.2, 0.1, false)
  })
  tl.eventCallback('onComplete', launch)

  function launch () {
    TweenLite.to(DED_CLASS, 0.23, {
      display: 'none'
    })
    dedLaunch()
  }

  btn1.addEventListener('click', function () {
    if (!isDedWalking) {
      isDedWalking = true
      tl.restart()
    }
  })
}
