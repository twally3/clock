function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
}

function draw() {
    background(51)

    // Make the clock the right way round
    translate(width/2, height/2)
    rotate(-HALF_PI)

    // Get time values
    let hours = hour()
    let mins = minute()
    let secs = second()

    // Curry drawRing() set showLine param to true
    drawRingC = drawRing.bind(null, true)

    drawRingC(1, 240, 239, map(hours % 12, 0, 12, 0, TWO_PI), height*50/100, height*10/100)
    drawRingC(153, 255, 0, map(mins, 0, 60, 0, TWO_PI), height*55/100, height*15/100)
    drawRingC(255, 15, 27, map(secs, 0, 60, 0, TWO_PI), height*60/100, height*20/100)
}

// Refactor Later
function drawRing(showLine, red, green, blue, angle, ringScale, lineScale) {
    strokeWeight(height*2/100)
    noFill()

    // Highlight Colour
    stroke(color(red, green, blue, 30))
    arc(0, 0, ringScale, ringScale, 0, TWO_PI);
    
    // Ring Colour
    stroke(red, green, blue)
    arc(0, 0, ringScale, ringScale, 0, angle);
    
    // Optional show normal clock hands
    if (!showLine) { return; }

    push()
    rotate(angle)
    line(0,0,lineScale,0)
    pop()
}