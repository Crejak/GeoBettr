import {Observer, StateModel, Store} from "../model/Store";
import {GeoguessrPage} from "../model/GeoguessrPage";
import {Component} from "./Component";
import {Notepad} from "./components/Notepad";
import {createTemplate} from "../utils";

export class View implements Observer {
    $root: HTMLElement;
    componentMap: Map<GeoguessrPage, new ($root: HTMLElement) => Component>;
    currentComponentType?: typeof Component;
    currentComponentInstance?: Component;

    constructor(root: HTMLElement) {
        this.$root = root;
        this.componentMap = new Map<GeoguessrPage, new ($root: HTMLElement) => Component>([
            [GeoguessrPage.GAME_ROUND, Notepad]
        ]);
        Store.getInstance().addObserver(this);
    }

    private render(state: StateModel) {
        console.debug(`[View] Render, state: ${state.currentPage}`)
        const component = this.componentMap.get(state.currentPage);
        if (this.currentComponentType === component) {
            return;
        }
        console.debug("[View] Disposing current component");
        this.currentComponentInstance?.dispose();
        this.currentComponentType = component;
        this.$root.innerHTML = "";
        if (!component) {
            this.currentComponentInstance = undefined;
            return;
        }
        console.debug(`[View] Creating new component of type ${component.name}`);
        this.currentComponentInstance = new component(this.$root);
        this.$root.append(createTemplate(this.currentComponentInstance.html).content);
        this.currentComponentInstance.created();
        this.currentComponentType = component;
    }

    public onStateChanged(state: StateModel): void {
        this.render(state);
    }

    public onStateInitiated(state: StateModel): void {
        this.render(state);
    }
}