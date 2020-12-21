class Motor {
    constructor(isOn = false) {
        this.isOn = isOn
    }

    turnOn() {
        console.log("Motor is turned on")
        this.isOn = true
    }
    turnOff() {
        console.log("Motor is turned off")
        this.isOn = false
    }
}

module.exports = Motor