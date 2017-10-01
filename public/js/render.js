import { stroke, strokeWeight, arc, line } from './canvas.js'

// Refactor Later
export function drawRing(context, showLine, red, green, blue, angle, ringScale, lineScale) {
    strokeWeight(context, window.innerHeight*2/100)
    
    // Highlight Colour
    stroke(context, red, green, blue, 0.15)
    arc(context, window.innerWidth/2, window.innerHeight/2, ringScale, 0, 2 * Math.PI);
    
    // Ring Colour
    stroke(context, red, green, blue, 1)
    arc(context, window.innerWidth/2, window.innerHeight/2, ringScale, 3 * Math.PI / 2, angle, true)
    
    // Optional show normal clock hands
    if (!showLine) { return; }
    line(context, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2 + lineScale * Math.cos(angle), window.innerHeight/2 + lineScale * Math.sin(angle), true)
}
