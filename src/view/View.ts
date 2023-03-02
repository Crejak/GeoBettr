import {Observer, StateModel, Store} from "../model/Store";
import {GeoguessrPage} from "../model/GeoguessrPage";
import {Component} from "./Component";
import {createTemplate} from "../utils";
import Browser from "webextension-polyfill";

export class View implements Observer {
    $root: HTMLElement;
    componentMap: Map<GeoguessrPage, new ($root: HTMLElement) => Component>;
    currentComponentType?: typeof Component;
    currentComponentInstance?: Component;
    $menuContainer: HTMLElement;
    $componentContainer: HTMLElement;

    constructor($root: HTMLElement, componentMap: Map<GeoguessrPage, new ($root: HTMLElement) => Component>) {
        this.$root = $root;
        this.componentMap = componentMap;
        this.$root.append(createTemplate(this.template()).content);
        const $menuContainer = document.getElementById("geobettr_menu");
        if (!$menuContainer) {
            throw new Error("Could not find menu container element");
        }
        this.$menuContainer = $menuContainer;
        const $componentContainer = document.getElementById("geobettr_component") ?? undefined;
        if (!$componentContainer) {
            throw new Error("Could not find component container element");
        }
        this.$componentContainer = $componentContainer;
        Store.getInstance().addObserver(this);
    }

    private render(state: StateModel) {
        console.debug(`[View] Render, state: ${state.currentPage}`)
        const component = this.componentMap.get(state.currentPage);
        if (this.currentComponentType === component) {
            return;
        }
        this.removeCurrentComponent();
        if (!component) {
            return;
        }
        this.createComponent(component);
    }

    private removeCurrentComponent() {
        console.debug("[View] Disposing current component");
        this.currentComponentInstance?.dispose();
        this.$componentContainer.innerHTML = "";
        for (const button of this.currentComponentInstance?.buttons() ?? []) {
            document.querySelector<HTMLButtonElement>(`.geobettr_button[data-button=${button}]`)?.remove();
        }
        this.currentComponentType = undefined;
        this.currentComponentInstance = undefined;
    }

    private createComponent(component: new ($root: HTMLElement) => Component) {
        console.debug(`[View] Creating new component of type ${component.name}`);
        this.currentComponentType = component;
        this.currentComponentInstance = new component(this.$componentContainer);
        for (const button of this.currentComponentInstance.buttons()) {
            this.$menuContainer.append(createTemplate(`<button class="geobettr_button" data-button="${button.name}"><img src="${Browser.runtime.getURL(button.img)}" alt="${button.name}" /></button>`).content);
            document.querySelector<HTMLButtonElement>(`.geobettr_button[data-button=${button.name}]`)?.addEventListener('click', () => {
                this.currentComponentInstance?.onButtonPressed(button.name);
            });
        }
    }

    public onStateChanged(state: StateModel) {
        this.render(state);
    }

    public onStateInitiated(state: StateModel) {
        this.render(state);
    }

    template(): string {
        return `
<div id="geobettr_menu">
    <button class="geobettr_button geobettr_icon"><img
        src="${Browser.runtime.getURL('img/icon-48.png')}" 
        alt="Geobettr"
    /></button>
</div>
<div id="geobettr_component">

</div>
        `;
    }
}