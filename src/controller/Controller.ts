import {Store} from "../model/Store";
import {PageAnalyzer, PageRule} from "./PageAnalyzer";

export class Controller {
    store: Store;
    $next: HTMLElement;
    nextObserver: MutationObserver;
    pageAnalyzer: PageAnalyzer;

    constructor(pageRules: Array<PageRule>) {
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
        });
        this.pageAnalyzer = new PageAnalyzer(pageRules)
        this.evaluatePage();
    }

    evaluatePage() {
        this.store.set("currentPage", this.pageAnalyzer.resolve());
    }
}