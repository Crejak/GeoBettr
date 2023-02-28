import {PageRule} from "./controller/PageAnalyzer";
import {GeoguessrPage} from "./model/GeoguessrPage";
import {Component} from "./view/Component";
import {Notepad} from "./view/components/Notepad";

export const ROOT_ELEMENT_ID = "geobettr";

export const PAGE_RULES: Array<PageRule> = [
    {
        css: "[class^=result-list_listWrapper]",
        page: GeoguessrPage.GAME_BREAKDOWN
    },
    {
        css: "[class*=result-layout_root]",
        page: GeoguessrPage.GAME_RESULTS
    },
    {
        css: "[class*=in-game_root]",
        page: GeoguessrPage.GAME_ROUND
    }
];

export const COMPONENT_RULES: Map<GeoguessrPage, new ($root: HTMLElement) => Component> = new Map([
    [GeoguessrPage.GAME_ROUND, Notepad]
]);