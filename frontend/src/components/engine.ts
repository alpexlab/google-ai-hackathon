import { makeAutoObservable } from "mobx";

export class Engine {
    constructor() {
        makeAutoObservable(this);
    }
}