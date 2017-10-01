export function background(context, colour) {
    context.save()
    context.fillStyle = colour
    context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    context.restore()
}

export function arc(context, x, y, r, angle1, angle2, curved=false) {
    if (angle1 == angle2) { [angle1, angle2] = [0, Math.PI * 2] } 
    
    context.beginPath()
    context.arc(x, y, r, angle1, angle2)
    context.stroke()

    if (curved) {
        addEndCurves(context, x + Math.cos(angle2) * r, y + Math.sin(angle2) * r)
        addEndCurves(context, x + Math.cos(angle1) * r, y + Math.sin(angle1) * r)
    }
    
}

let addEndCurves = (context, x, y) => {
    context.save()
    
    context.beginPath()
    context.arc(x, y, context.lineWidth/2.1, 0, Math.PI * 2)
    context.fillStyle = context.strokeStyle
    context.fill()
    
    context.restore()
}

export let line = (context, x, y, a, b, curved=true) => {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(a, b)
    context.stroke()

    if (curved) {
        addEndCurves(context, a, b)
        addEndCurves(context, x, y)
    }
}

export function strokeWeight(context, scale) {
    context.lineWidth = scale
}

export let stroke = (context, red, green, blue, alpha) => {
    context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export let push = context => context.save()
export let pop = context => context.restore()