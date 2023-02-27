export abstract class Component {
    $root: HTMLElement;

    constructor($root: HTMLElement) {
        this.$root = $root;
    }

    abstract get html(): string;
    abstract created(): void;
    abstract dispose(): void;
}