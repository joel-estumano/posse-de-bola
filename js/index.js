class PosseTotal {
    time = new Date(0, 0, 0, 0);

    stopwatch1 = null;
    stopwatch2 = null;

    constructor(stopwatch1, stopwatch2) {
        this.stopwatch1 = stopwatch1;
        this.stopwatch2 = stopwatch2;
    }

    update() {
        this.time.setHours(
            this.stopwatch1.runningTime.getHours() +
            this.stopwatch2.runningTime.getHours()
        );
        this.time.setMinutes(
            this.stopwatch1.runningTime.getMinutes() +
            this.stopwatch2.runningTime.getMinutes()
        );
        this.time.setSeconds(
            this.stopwatch1.runningTime.getSeconds() +
            this.stopwatch2.runningTime.getSeconds()
        );
        this.time.setMilliseconds(
            this.stopwatch1.runningTime.getMilliseconds() +
            this.stopwatch2.runningTime.getMilliseconds()
        );
        this.updateView();
    }

    updateView() {
        const totalSegds =
            this.time.getSeconds() +
            this.time.getMinutes() * 60 +
            this.time.getHours() * 3600;
        const percent =
            100 *
            ((this.stopwatch1.runningTime.getSeconds() +
                this.stopwatch1.runningTime.getMinutes() * 60 +
                this.stopwatch1.runningTime.getHours() * 3600) /
                totalSegds);

        document.getElementById(`labelM`).innerText = displayTime(this.time);

        this.stopwatch1.labelRef.parentNode.style.background = `conic-gradient(var(--primary-color) ${percent.toFixed(0) * 3.6
            }deg, var(--dark-color) 0deg)`;
        this.stopwatch2.labelRef.parentNode.style.background = `conic-gradient(var(--secondary-color) ${(100 - percent.toFixed(0)) * 3.6
            }deg, var(--dark-color) 0deg)`;

        this.stopwatch1.playPauseRef.parentNode.firstElementChild.innerText = `${percent.toFixed(
            0
        )}%`;

        this.stopwatch2.playPauseRef.parentNode.lastElementChild.innerText = `${100 - percent.toFixed(0)
            }%`;
    }
}

class Stopwatch {
    on = undefined;
    runningTime = new Date(0, 0, 0, 0);
    stopwatchInterval;
    labelRef = null;
    playPauseRef = null;

    constructor(label, playPause) {
        this.labelRef = label;
        this.labelRef.innerText = "00:00:00";
        this.playPauseRef = playPause;
    }

    start() {
        this.setAnimation();
        let time = new Date();
        time.setHours(
            this.runningTime.getHours(),
            this.runningTime.getMinutes(),
            this.runningTime.getSeconds(),
            this.runningTime.getMilliseconds()
        );

        this.stopwatchInterval = setInterval(() => {
            time.setTime(time.getTime() + 1000);
            this.runningTime = time;
            this.labelRef.textContent = displayTime(time);
            posseTotal.update();
        }, 1000);
    }

    pause() {
        this.clearAnimation();
        this.on = false;
        clearInterval(this.stopwatchInterval);
    }

    reset() {
        this.clearAnimation();
        this.on = false;
        this.runningTime = new Date(0, 0, 0, 0);
        clearInterval(this.stopwatchInterval);
        this.labelRef.innerText = "00:00:00";
    }

    clearAnimation() {
        this.labelRef.parentNode.classList.remove("pulse");
        this.playPauseRef.classList.remove("active");
        this.playPauseRef.firstElementChild.classList.remove("fa-circle-play");
        this.playPauseRef.firstElementChild.classList.add("fa-circle-pause");
    }

    setAnimation() {
        this.labelRef.parentNode.classList.add("pulse");
        this.playPauseRef.classList.add("active");
        this.playPauseRef.firstElementChild.classList.add("fa-circle-play");
        this.playPauseRef.firstElementChild.classList.remove("fa-circle-pause");
    }
}

const playerA = new Stopwatch(
    document.getElementById(`labelA`),
    document.getElementById(`btnA`)
);
const playerB = new Stopwatch(
    document.getElementById(`labelB`),
    document.getElementById(`btnB`)
);

const posseTotal = new PosseTotal(playerA, playerB);
document.getElementById(`labelM`).innerText = displayTime(posseTotal.time);

function playPause(player) {
    switch (player) {
        case "playerA":
            if ((playerA.on = !playerA.on)) {
                playerB.pause();
                playerA.start();
            } else {
                playerA.pause();
            }
            break;
        case "playerB":
            if ((playerB.on = !playerB.on)) {
                playerA.pause();
                playerB.start();
            } else {
                playerB.pause();
            }
            break;
    }
}

function reset(player) {
    switch (player) {
        case "playerA":
            playerA.reset();
            break;
        case "playerB":
            playerB.reset();
            break;
    }
}
