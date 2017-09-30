let clock

// function setup() {
//     createCanvas(window.innerWidth, window.innerHeight)
//     loadClock('clock').then(data => {
//         clock = data
//     })
// }

function draw() {
    background(51)

    // Make the clock the right way round
    translate(width/2, height/2)
    
    // Curry drawRing() set showLine param to true
    drawRingC = drawRing.bind(null, true)
    
    if (clock) {
        let times = getTime(false)
        
        for (let i = clock.length - 1; i >= 0; i--) {
            // console.log((times[clock[i].name]))
            drawRingC(clock[i].red, clock[i].green, clock[i].blue, map(times[clock[i].name].time, times[clock[i].name].min, times[clock[i].name].max, 3 * PI / 2, 7 * PI / 2), height * clock[i].ringScale, height * clock[i].handScale)
        }

        for (let i = 0; i < clock.length; i++) {
            push()
            strokeWeight(0)
            if (mouseX >= 5 && mouseX <= 105 && mouseY >= i * 35 + 5 && mouseY <= i * 35 + 35) {
                fill(100)
            } else {
                fill(125)
            }
            rect(-width/2 + 5, -height/2 + 5 + (i * (30 + 5)), 100, 30)
            fill(255)
            textAlign(CENTER);
            text(clock[i].name, -width/2 + 5, -height/2 + 5 + (i * 35) + 30 /4, 100, 30)
            pop()
        }
    }

}

function loadClock(name) {
    return fetch(`/faces/${name}.json`)
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

    return {
        milliseconds: {
            time: mills,
            min: 0,
            max: 1000
        },
        seconds: {
            time: secs,
            min: 0,
            max: 60
        },
        minutes: {
            time: mins,
            min: 0,
            max: 60
        },
        hours: {
            time: hours,
            min: 0,
            max: 12
        },
        days: {
            time: days,
            min: 0,
            max: 6
        },
        date: {
            time: date,
            min: 1,
            max: 31
        },
        months: {
            time: month,
            min: 0,
            max: 11
        }
    }
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
    // arc(0, 0, ringScale, ringScale, -PI/2, angle);
    arc(0, 0, ringScale, ringScale, 3 * PI / 2, angle)
    
    // Optional show normal clock hands
    if (!showLine) { return; }

    push()
    rotate(angle)
    line(0,0,lineScale,0)
    pop()
}