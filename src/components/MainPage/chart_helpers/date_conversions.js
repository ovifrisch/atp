

// "20100517" => "2010-05-17"
export function convert1(date) {
    return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8)
}

// {yr: 2010, mo: 5, day: 17} => "2010-05-17"
export function convert2(date) {
    var mo;
    var day;
    var yr = date['yr']
    if (date['mo'] < 10) {
        mo = "0" + date['mo'].toString()
    } else{
        mo = date['mo'].toString()
    }
    if (date['day'] < 10){
        day = "0" + date['day'].toString()
    } else {
        day = date['day'].toString()
    }
    return yr + "-" + mo + "-" + day
}

// "2010-05-17" => {yr: 2010, mo: 5, day: 17}
export function convert3(data) {
    if (typeof data === 'string' || data instanceof String) {
        var x = data.split("-")
        var yr = parseInt(x[0])
        var mo = parseInt(x[1])
        var day = parseInt(x[2])

        return {yr: yr, mo:mo, day:day}
    }
    return data
}



export function convert_rank(x) {
    Object.keys(x).map(function(key, index) {
        if (key == 'rankingDate') {
            x[key] = convert3(x[key])
        }
    })
    return x
}