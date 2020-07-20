

const days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb']
const daysLimit = {
    Jan: 31,
    Feb: 28,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 31,
    Sep: 30,
    Oct: 31,
    Nov: 30,
    Dec: 31
}

const nextMonth = (month) => {
    let stopNext = false
    for (const [key, value] of Object.entries(daysLimit)) {
        if (stopNext) {
            month = key
            break
        }
        if (key === month) stopNext = true
    }
    return month
}

const timeConverter = (time) => {
    let day, date, month, year, clock, hour, minSec
    [day, date, month, year, clock] = time.split(' ').slice(0, -1)
    console.log(day, date, month, year, clock)
    day = day.slice(0, -1)
    hour = parseInt(clock.slice(0, 2))
    date = parseInt(date)
    minSec = clock.slice(2, clock.length)

    // handeling passing day
    if (hour + 3 > 24) {
        hour = hour + 3 - 24
        if (days.indexOf(day) === days.length -1) {
            day = days[0]
        } else {
            day = days[days.indexOf(day) + 1]
        }
        console.log(date)
        console.log(daysLimit[month])
        if (date === daysLimit[month]) {
            if (month === 'Dec') {
                month = 'Jan'
                year++
            } else {
                month = nextMonth(month)
            }
            date = 1
        } else {
            date++
        }
    } else {
        hour += 3
    }
    hour = hour.toString(10)
    hour = hour.length > 1 ? hour : '0' + hour
    clock = hour + minSec
    console.log(day, date, month, year, clock)

    return `${day}, ${date} ${month} ${year}, ${clock} (Israel time)`

}

module.exports = timeConverter