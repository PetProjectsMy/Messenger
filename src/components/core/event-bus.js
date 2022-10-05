"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    static instance = null;
    listeners = {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    static getInstance() {
        let { instance } = EventBus;
        if (!instance) {
            instance = new EventBus();
        }
        return instance;
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }
    emit(event, ...args) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
exports.default = EventBus;
