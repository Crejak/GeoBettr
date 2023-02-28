import {createTemplate} from "../utils";

export abstract class Component {
    protected $root: HTMLElement;

    constructor($root: HTMLElement) {
        this.$root = $root;

        this.$root.append(createTemplate(this.template()).content);
        this.created();
    }

    abstract template(): string;
    abstract created(): void;
    abstract dispose(): void;
}