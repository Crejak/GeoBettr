import {GeoguessrPage} from "../model/GeoguessrPage";

export interface PageRule {
    css: string,
    page: GeoguessrPage
}

export class PageAnalyzer {
    rules: Array<PageRule>;

    constructor(rules: Array<PageRule>) {
        this.rules = rules;
    }

    resolve(): GeoguessrPage {
        for (const rule of this.rules) {
            if (document.querySelector(rule.css)) {
                return rule.page;
            }
        }
        return GeoguessrPage.OTHER;
    }
}