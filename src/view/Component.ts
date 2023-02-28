import {createTemplate} from "../utils";

export abstract class Component {
    protected $root: HTMLElement;

    constructor($root: HTMLElement) {
        this.$root = $root;

        this.$root.append(createTemplate(this.template()).content);
        this.created();
    }

    abstract buttons(): Array<string>;
    abstract onButtonPressed(buttonName: string): any;
    abstract template(): string;
    abstract created(): any;
    abstract dispose(): any;
}