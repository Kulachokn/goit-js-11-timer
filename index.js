'use strict'

class CountdownTimer {
    constructor({selector, targetDate}) {
        this.rootNode = document.querySelector(selector);
        this.refs = {
            daysRef: this.rootNode.querySelector('span[data-value="days"]'),
            hourRef: this.rootNode.querySelector('span[data-value="hours"]'),
            minsRef: this.rootNode.querySelector('span[data-value="mins"]'),
            secsRef: this.rootNode.querySelector('span[data-value="secs"]'),
        }
        this.targetDate = targetDate;
        this.intervalTime = null;
        this.isActive = false;
    }

    start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.intervalTime = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            if (deltaTime <= 0) {
                this.stop();
                return;
            }
            this._updateClock(deltaTime);
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalTime);
        this.isActive = false;
    }

    _updateClock(time) {
        const days = this._pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this._pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this._pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this._pad(Math.floor((time % (1000 * 60)) / 1000));

        this.refs.daysRef.textContent = days;
        this.refs.hourRef.textContent = hours;
        this.refs.minsRef.textContent = mins;
        this.refs.secsRef.textContent = secs;
    }

    _pad(value) {
        return String(value).padStart(2, '0');
    }
}

const newTimer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jan 25, 2021'),
});

newTimer.start();

