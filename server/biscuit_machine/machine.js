const Switch = require("./switch")
const Motor = require("./motor")
const Oven = require("./oven")
const EventEmitter = require("events").EventEmitter;

const BAKING_COOKIES_LIMIT = 4;

class Machine {
    constructor() {
        this.motor = new Motor();
        this.switch = new Switch();
        this.emitter = new EventEmitter();
        this.oven = new Oven(this.emitter);
        this.bakedCookies = 0;
        this.bakingCookies = 0;
        this.cookiesOnConveyorIntervalId = 0;
    }

    startMachine() {
        console.log("Attempting to start biscuit machine.");
        this.switch.turnOn();
        this.switch.unpause();
        if (this.oven.ovenState.value === 0) {
            this.oven.observeTemperature();
            this.oven.keepTempHigh();
            this.startBakingCookies();
        }
        this.emitter.emit("ovenState", "PREPARING");
        clearInterval(this.cookiesOnConveyorIntervalId)
        this.oven.heatOvenForUse();
        this.oven.normaliseTemp();
    }

    stopMachine() {
        console.log("Attempting to stop biscuit machine.");
        this.switch.turnOff();
        this.emitter.emit("ovenState", "STOPPED");
        this.oven.turnOffHeating();
    }

    pauseMachine() {
        console.log("Attempting to pause biscuit machine.");
        this.emitter.emit("ovenState", "PAUSED");
        this.switch.pause()
        this.motor.turnOff()
    }

    unpauseMachine() {
        console.log("Attempting to unpause biscuit machine.");
        this.emitter.emit("ovenState", "PREPARING");
        this.switch.unpause()
        this.motor.turnOn()
    }

    plugOutMachine() {
        console.log("Forced stop the machine!");
        this.oven.plugOut();
    }

    startBakingCookies() {
        this.emitter.on("ovenState", state => {
            if (state === "READY") {
                this.motor.turnOn()
                this.observeCookiesOnConveyor()
            }
        })
    }

    observeCookiesOnConveyor() {
        this.cookiesOnConveyorIntervalId = setInterval(() => {
            if (this.switch.isOn && !this.switch.isPaused) {
                if (this.bakingCookies < BAKING_COOKIES_LIMIT) {
                    this.bakingCookies++;
                    this.emitter.emit("bakingCookies", this.bakingCookies);
                } else {
                    this.bakedCookies++;
                    this.emitter.emit("bakedCookies", this.bakedCookies);
                }
            } else if (!this.switch.isOn) {
                if (this.bakingCookies > 0) {
                    this.bakingCookies--;
                    this.emitter.emit("bakingCookies", this.bakingCookies);
                    this.bakedCookies++;
                    this.emitter.emit("bakedCookies", this.bakedCookies);
                } else {
                    clearInterval(this.cookiesOnConveyorIntervalId)
                }
            }
        }, 1000);
    }
}

module.exports = Machine