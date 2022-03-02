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

    if (primes.length === 0) {
        return console.log("Empty");
    } else return primes;
}

function coloredNumbers(primes) {
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

let end = parseInt(process.argv[2]);
if (!Number.isNaN(end)) {
    coloredNumbers(getPrimes(end));
} else { console.log("Ошибка. Необходимо ввести число."); }