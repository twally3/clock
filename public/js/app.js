let clock

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    loadClock('clock').then(data => {
        clock = data
    })
}

function draw() {
    background(51)

    // Make the clock the right way round
    translate(width/2, height/2)
    rotate(-HALF_PI)
    
    // Curry drawRing() set showLine param to true
    drawRingC = drawRing.bind(null, true)
    
    if (clock) {
        let times = getTime(false)

        for (let i = clock.length - 1; i >= 0; i--) {
            drawRingC(clock[i].red, clock[i].green, clock[i].blue, map(times[i], clock[i].min, clock[i].max, 0, TWO_PI), height * clock[i].ringScale, height * clock[i].handScale)
        }
    }

}

function loadClock(name) {
    return fetch(`/faces/clock.json`)
        .then(r => r.json())
}

function getTime(smooth) {
    let today = new Date()
    let mills = today.getMilliseconds()
    let secs = today.getSeconds()
    let mins = today.getMinutes()
    let hours = today.getHours() % 12
    let days = today.getDay() == 0 ? 6 : today.getDay() - 1
    let date = today.getDate()
    let month = today.getMonth()

    if ([3,5,8,10].indexOf(month) != -1) {
        date = map(date, 1, 30, 1, 31)
    } else if (month == 2) {
        date = map(date, 1, 29, 1, 31)
    }
    
    if (smooth) {
        secs += mills / 1000
        mins += secs / 60
        hours += mins / 60
        days += hours / 24
    }

    return [mills, secs, mins, hours, days, date, month]
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