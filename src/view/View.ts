import {Observer, StateModel, Store} from "../model/Store";
import {GeoguessrPage} from "../model/GeoguessrPage";
import {Component} from "./Component";

export class View extends Component implements Observer {
    componentMap: Map<GeoguessrPage, new ($root: HTMLElement) => Component>;
    currentComponentType?: typeof Component;
    currentComponentInstance?: Component;
    $menuContainer?: HTMLElement;
    $componentContainer?: HTMLElement;

    constructor($root: HTMLElement, componentMap: Map<GeoguessrPage, new ($root: HTMLElement) => Component>) {
        super($root);
        this.componentMap = componentMap;
        Store.getInstance().addObserver(this);
    }

    private render(state: StateModel) {
        if (this.$menuContainer === undefined || this.$componentContainer === undefined) {
            throw new Error();
        }

        console.debug(`[View] Render, state: ${state.currentPage}`)
        const component = this.componentMap.get(state.currentPage);
        if (this.currentComponentType === component) {
            return;
        }
        console.debug("[View] Disposing current component");
        this.currentComponentInstance?.dispose();
        this.currentComponentType = component;
        this.$componentContainer.innerHTML = "";
        if (!component) {
            this.currentComponentInstance = undefined;
            return;
        }
        console.debug(`[View] Creating new component of type ${component.name}`);
        this.currentComponentInstance = new component(this.$componentContainer);
        this.currentComponentType = component;
    }

    public onStateChanged(state: StateModel): void {
        this.render(state);
    }

    public onStateInitiated(state: StateModel): void {
        this.render(state);
    }

    created(): void {
        this.$menuContainer = document.getElementById("geobettr_menu") ?? undefined;
        if (!this.$menuContainer) {
            throw new Error("Could not find menu container element");
        }
        this.$componentContainer = document.getElementById("geobettr_component") ?? undefined;
        if (!this.$componentContainer) {
            throw new Error("Could not find component container element");
        }
    }

    dispose(): void {
        this.currentComponentInstance?.dispose();
    }

    template(): string {
        return `
<div id="geobettr_menu">
    <button class="geobettr_button"></button>
</div>
<div id="geobettr_component">

</div>
        `;
    }
}