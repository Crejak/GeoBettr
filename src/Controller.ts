import {Store} from "./model/Store";
import {GeoguessrPage} from "./model/GeoguessrPage";

export class Controller {
    store: Store;
    $next: HTMLElement;
    nextObserver: MutationObserver;
    $inGameRoot?: HTMLElement;
    $resultRoot?: HTMLElement;
    $resultList?: HTMLElement;

    constructor() {
        this.store = Store.getInstance();
        const $next = document.getElementById("__next");
        if (!$next) {
            throw new Error("Could not find #__next element");
        }
        this.$next = $next;
        this.nextObserver = new MutationObserver(() => {
            this.evaluatePage();
        });
        this.nextObserver.observe(this.$next, {
            subtree: true,
            childList: true
        })
        this.evaluatePage();
    }

    evaluatePage() {
        this.tryQueryKeyNodes();
        const page = this.computePageFromKeyNodes();
        this.store.set("currentPage", page);
    }

    tryQueryKeyNodes() {
        this.$inGameRoot = this.$next.querySelector("[class*=in-game_root]") ?? undefined;
        this.$resultRoot = this.$next.querySelector("[class*=result-layout_root]") ?? undefined;
        this.$resultList = this.$next.querySelector("[class^=result-list_listWrapper]") ?? undefined;
    }

    computePageFromKeyNodes(): GeoguessrPage {
        if (!this.$inGameRoot) {
            return GeoguessrPage.OTHER;
        }
        if (!this.$resultRoot) {
            return GeoguessrPage.GAME_ROUND;
        }
        if (!this.$resultList) {
            return GeoguessrPage.GAME_RESULTS;
        }
        return GeoguessrPage.GAME_BREAKDOWN;
    }
}