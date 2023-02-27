import {Controller} from "./Controller";
import {createTemplate} from "./utils";
import {View} from "./view/View";
import {ROOT_ELEMENT_ID} from "./consts";

console.log("GeoBettr extension is running !");

document.body.append(createTemplate(`<div id="${ROOT_ELEMENT_ID}"></div>`).content);
const root = document.getElementById(ROOT_ELEMENT_ID);
if (!root) {
    throw new Error("Could not create root element");
}

const controller = new Controller();
const view = new View(root);

console.debug("Controller", controller);
console.debug("View", view);