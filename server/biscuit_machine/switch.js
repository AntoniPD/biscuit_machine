class Switch {
    constructor(isOn = false, isPaused = false) {

        this.isOn = isOn;
        this.isPaused = isPaused;

    }

    turnOn() {
        this.isOn = true;
    }
    turnOff() {
        this.isOn = false;
    }
    pause() {
        this.isPaused = true;
    }
    unpause() {
        this.isPaused = false;
    }
}

module.exports = Switch
