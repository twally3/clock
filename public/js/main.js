import { background } from './canvas.js'
import { Times } from './Times.js'
import { map } from './maths.js'
import { loadClock } from './loaders.js'
import { drawRing } from './render.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

let drawRingC = drawRing.bind(null, context, true)

loadClock('clock').then(clock => {
    (function update() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        background(context, "#333333")
        
        let times = Times(false)

        for (let i = clock.length - 1; i >= 0; i--) {
            let angle = map(times[clock[i].name].time, times[clock[i].name].min, times[clock[i].name].max, 3 * Math.PI / 2, 7 * Math.PI / 2)
            drawRingC(clock[i].red, clock[i].green, clock[i].blue, angle, window.innerHeight * clock[i].ringScale, window.innerHeight * clock[i].handScale)
        }
    
        requestAnimationFrame(update)
    })()
})