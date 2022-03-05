const colors = require("colors");

//решето Эратосфена
function getPrimes(ending) {
    const seive = [];
    const primes = [];

    for (let i = 2; i <= ending; i++) {
        if (!seive[i]) {
            primes.push(i)
            for (let j = i * i; j <= ending; j += i) {
                seive[j] = true;
            }
        }
    }


    return primes;
}

function coloredNumbers(primes) {
    if (primes.length === 0) {
        return console.log("В заданном диапазоне нет простых чисел.");
    } else {
        for (let i = 0; i < primes.length; i += 3) {
            if (primes[i]) {
                console.log(colors.green(primes[i]));
            }
            if (primes[i + 1]) {
                console.log(colors.yellow(primes[i + 1]));
            }
            if (primes[i + 2]) {
                console.log(colors.red(primes[i + 2]));
            }
        }
    }
}

let end = parseInt(process.argv[2]);
if (!Number.isNaN(end)) {
    coloredNumbers(getPrimes(end));
} else { console.log("Ошибка. Необходимо ввести число."); }





// let timer = [];
// const EventEmitter = require('events');
// for (let i = 2; i < process.argv.length; i++) {
//     timer.push(process.argv[i]);
// }


// for (let i = 0; i < timer.length; i++) {
//     let arg = timer[i].split('-',)
//     let hour = parseInt(arg[0]);
//     let day = parseInt(arg[1]);
//     let month = parseInt(arg[1]);
//     let year = parseInt(arg[1]);

// }



// console.log(timer);

// console.log(hour);
// console.log(day);
// console.log(month);
// console.log(year);