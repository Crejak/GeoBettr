import {View} from "./View";

export enum State {
    DEFAULT,
    GAME_ROUND,
    GAME_RESULTS,
    GAME_BREAKDOWN
}

export class Controller {
    state: State = State.DEFAULT;
    view: View;
    $next: HTMLElement;
    nextObserver: MutationObserver;
    $inGameRoot?: HTMLElement;
    $resultRoot?: HTMLElement;
    $resultList?: HTMLElement;

    constructor() {
        this.view = new View();
        const $next = document.getElementById("__next");
        if (!$next) {
            throw new Error("Could not find #__next element");
        }
        this.$next = $next;
        this.nextObserver = new MutationObserver(() => {
            this.evaluateState();
        });
        this.nextObserver.observe(this.$next, {
            subtree: true,
            childList: true
        })
        this.evaluateState();
    }

    onStateChange() {
        console.debug("State", this.state);
        if (this.state === State.GAME_ROUND) {
            this.view.displayNotepad();
        } else {
            this.view.removeNotepad();
        }
    }

    evaluateState() {
        this.tryQueryKeyNodes();
        const state = this.computeStateFromKeyNodes();
        if (state !== this.state) {
            this.state = state;
            this.onStateChange();
        }
    }

    tryQueryKeyNodes() {
        this.$inGameRoot = this.$next.querySelector("[class*=in-game_root]") ?? undefined;
        this.$resultRoot = this.$next.querySelector("[class*=result-layout_root]") ?? undefined;
        this.$resultList = this.$next.querySelector("[class^=result-list_listWrapper]") ?? undefined;
    }

    computeStateFromKeyNodes() {
        if (!this.$inGameRoot) {
            return State.DEFAULT;
        }
        if (!this.$resultRoot) {
            return State.GAME_ROUND;
        }
        if (!this.$resultList) {
            return State.GAME_RESULTS;
        }
        return State.GAME_BREAKDOWN;
    }
}