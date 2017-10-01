export function Times(smooth) {
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
            min: 0,
            max: 31
        },
        months: {
            time: month,
            min: 0,
            max: 11
        }
    }
}