import { Router } from "express";

export default class RouterMain {
    constructor() {
        this.Router = Router();
        this.init();
    }

    getRouter() {
        return this.Router;
    }

    init() {
    }

    get(path, ...callbacks) {
        this.Router.get(path, this.generateCustomResponse, ...this.applyCallbacks(callbacks));
    }

    post(path, ...callbacks) {
        this.Router.post(path, this.generateCustomResponse, ...this.applyCallbacks(callbacks));
    }

    delete(path, ...callbacks) {
        this.Router.delete(path, this.generateCustomResponse, ...this.applyCallbacks(callbacks));
    }

    put(path, ...callbacks) {
        this.Router.put(path, this.generateCustomResponse, ...this.applyCallbacks(callbacks));
    }


    // Otros métodos como put, delete, etc.

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error);
            }
        });
    }

    generateCustomResponse = (req, res, next) => {
        res.sendSuccess = (payload) => res.send({ status: "Success", payload });
        res.sendUserError = (error) =>  res.status(400).send({ status: "Error", error });
        next();
    }
}