const Enum = require('enum');
const ovenStates = new Enum({ "INITIAL": 0, "READY": 1, "PREPARING": 2, "STOPPED": 3 });

const MIN_OVEN_TEMP = 20;
const HEATING_OVEN_STEP = 5;
const KEEP_OVEN_TEMP = MIN_OVEN_TEMP - 5;
const COOL_DOWN_OVEN_STEP = 2;
const MAX_OVEN_TEMP = 40;

class Oven {
    constructor(emitter) {
        this.emitter = emitter;
        this.temperature = 0
        this.isHeating = false;
        this.normaliseTempIntervalId = 0
        this.heatingOvenIntervalId = 0
        this.ovenState = ovenStates.INITIAL
    }

    heatOvenForUse() {
        // In case user stops the machine and immediately starts it
        clearInterval(this.normaliseTempIntervalId)
        clearInterval(this.heatingOvenIntervalId)

        this.isHeating = true
        this.ovenState = ovenStates.PREPARING
        this.turnOnHeating()
    }

    turnOnHeating() {
        this.heatingOvenIntervalId = setInterval(() => {
            if (this.isHeating && this.temperature < MIN_OVEN_TEMP) {
                this.emitter.emit('temperature', this.temperature)
                this.temperature += HEATING_OVEN_STEP
            }
            if (this.temperature >= MIN_OVEN_TEMP) {
                this.isHeating = false
            }
        }, 1000);
    }

    normaliseTemp() {
        this.normaliseTempIntervalId = setInterval(() => {
            if (!this.isHeating) {
                if (this.temperature > 0) {
                    this.emitter.emit('temperature', this.temperature)
                    this.temperature -= COOL_DOWN_OVEN_STEP
                    if (this.temperature < KEEP_OVEN_TEMP && this.ovenState != ovenStates.STOPPED) {
                        this.emitter.emit("keepTemperatureHigh", true)
                    }
                } else {
                    this.temperature = 0;
                    this.emitter.emit('temperature', this.temperature)
                    clearInterval(this.normaliseTempIntervalId)
                }
            }
        }, 2000);
    }

    keepTempHigh() {
        this.emitter.on("keepTemperatureHigh", status => {
            if (!status) {
                clearInterval(this.heatingOvenIntervalId)
            }
            this.isHeating = status
        })
    }

    observeTemperature() {
        this.emitter.on("temperature", changedTemperature => {
            if (this.ovenState == ovenStates.PREPARING && changedTemperature >= MIN_OVEN_TEMP && changedTemperature < MAX_OVEN_TEMP) {
                this.ovenState = ovenStates.READY
                this.emitter.emit("ovenState", ovenStates.READY.key)
            }
        });
    }

    turnOffHeating() {
        this.ovenState = ovenStates.STOPPED
        this.emitter.emit("keepTemperatureHigh", false)
        clearInterval(this.heatingOvenIntervalId)
    }

    plugOut() {
        clearInterval(this.heatingOvenIntervalId)
        clearInterval(this.normaliseTempIntervalId)
    }

}

module.exports = Oven