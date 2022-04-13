const process = require('process');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

class Handler {
    static handle(timer) {
        let dif = Math.floor((timer.stamp - Date.now()) / 1000);
        if (dif > 0) {
            let s = dif % 60;
            let m = Math.floor((dif - s) / 60) % 60;
            let h = Math.floor((Math.floor((dif - s) | 60) - m) / 60) % 24;
            let d = Math.floor((Math.floor((Math.floor((dif - s) / 60) - m) / 60) - h) / 24);
            console.log(`${d} days, ${h} hours, ${m} minutes, ${s} seconds until ${timer.str}.`);
        }
        else {
            console.log(`${timer.str} is in the past.`);
            timer.stop();
        }
    }
}

const clear = () => {
    console.clear()
}


emitter.on('tick', Handler.handle);
emitter.on('clear', clear);


class Timer {
    constructor(str) {
        this.str = str;
        let [hour, day, month, year] = str.split('-');
        this.stamp = new Date(year, month - 1, day, hour, 0, 0).getTime();
        this.interval = setInterval(() => { emitter.emit('tick', this) }, 1000);
    }

    stop = function () {
        clearInterval(this.interval);
    }
}

// let timer1 = new Timer('21-28-7-2022');
// let timer2 = new Timer('10-05-09-2022');

let timers = [];
for (let i = 2; i < process.argv.length; i++) {
    timers.push(process.argv[i]);

}

timers.forEach((item) => {
    new Timer(item);
});


const cleanUp = setInterval(() => { emitter.emit('clear') }, 999);