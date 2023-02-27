import {GeoguessrPage} from "./GeoguessrPage";

export interface Observer {
    onStateInitiated: (state: StateModel) => void,
    onStateChanged: (state: StateModel) => void
}

export interface StateModel {
    currentPage: GeoguessrPage
}

function defaultStateModel(): StateModel {
    return {
        currentPage: GeoguessrPage.OTHER
    };
}

export class Store {
    private readonly observers: Array<Observer>;
    private readonly stateModel: StateModel;
    private static instance: Store;

    private constructor() {
        this.observers = [];
        this.stateModel = defaultStateModel();
    }

    public static getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    public addObserver(observer: Observer) {
        this.observers.push(observer);
        observer.onStateInitiated(this.stateModel);
    }

    public set<K extends keyof StateModel>(key: K, value: StateModel[K]) {
        if (this.stateModel[key] === value) {
            return;
        }
        console.debug("[Store] set ", key, value);
        this.stateModel[key] = value;
        this.notifyObservers();
    }

    private notifyObservers() {
        for (let observer of this.observers) {
            observer.onStateChanged(this.stateModel);
        }
    }
}