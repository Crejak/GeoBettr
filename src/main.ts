import {Controller} from "./controller/Controller";
import {createTemplate} from "./utils";
import {View} from "./view/View";
import {COMPONENT_RULES, PAGE_RULES, ROOT_ELEMENT_ID} from "./consts";

console.info("GeoBettr extension is running !");

document.body.append(createTemplate(`<div id="${ROOT_ELEMENT_ID}"></div>`).content);
const root = document.getElementById(ROOT_ELEMENT_ID);
if (!root) {
    throw new Error("Could not create root element");
}

const controller = new Controller(PAGE_RULES);
const view = new View(root, COMPONENT_RULES);

console.debug("Controller", controller);
console.debug("View", view);