//region controller

const STATE = {
    DEFAULT: 0,
    GAME: {
        ROUND: 1,
        RESULTS: 2,
        BREAKDOWN: 3
    }
};

class Controller {
    /**
     * @type {number}
     */
    state;

    /**
     * @type {View}
     */
    view;

    /**
     * @type {HTMLElement}
     */
    $next;

    /**
     * @type {MutationObserver}
     */
    nextObserver;

    /**
     * @type {HTMLElement}
     */
    $inGameRoot;

    /**
     * @type {HTMLElement}
     */
    $resultRoot;

    /**
     * @type {HTMLElement}
     */
    $resultList;

    constructor() {
        this.view = new View();
        this.$next = document.getElementById("__next");
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
        if (this.state === STATE.GAME.ROUND) {
            this.view.displayNotepad();
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
        this.$inGameRoot = this.$next.querySelector("[class*=in-game_root]");
        this.$resultRoot = this.$next.querySelector("[class*=result-layout_root]");
        this.$resultList = this.$next.querySelector("[class^=result-list_listWrapper]");
    }

    computeStateFromKeyNodes() {
        if (!this.$inGameRoot) {
            return STATE.DEFAULT;
        }
        if (!this.$resultRoot) {
            return STATE.GAME.ROUND;
        }
        if (!this.$resultList) {
            return STATE.GAME.RESULTS;
        }
        return STATE.GAME.BREAKDOWN;
    }
}

//endregion

//region view

const VIEW_NOTEPAD = `
<div class="geobettr_notepad_container">
    <textarea class="geobettr_notepad_textarea"></textarea>
</div>
`

class View {
    constructor() {

    }

    displayNotepad() {
        const notepad = this.createElement(VIEW_NOTEPAD);
        document.body.appendChild(notepad.content);
        document.querySelector(".geobettr_notepad_container").addEventListener('keyup', (e) => {
            e.stopPropagation();
        });
        document.addEventListener('keyup', (e) => {
            if (e.key === "t") {
                e.preventDefault();
                e.stopPropagation();
                document.querySelector(".geobettr_notepad_container").classList.add("geobettr_focus");
                document.querySelector(".geobettr_notepad_textarea").focus();
            }
        });
        document.querySelector(".geobettr_notepad_textarea").addEventListener('focusout', () => {
            document.querySelector(".geobettr_notepad_container").classList.remove("geobettr_focus");
        });
    }

    /**
     * @param {string} html
     * @returns {HTMLTemplateElement}
     */
    createElement(html) {
        let elementHtml = String(html);
        let template = document.createElement("template");
        template.innerHTML = elementHtml.trim();
        return template;
    }
}

//endregion

//region main

function main() {
    console.log("Geobettr extension !");
    // browser.runtime.sendMessage("hellooooo");
    // let myPort = browser.runtime.connect();
    // console.log("port", myPort);
    // myPort.postMessage({ greeting: "Need to get locations !" });
    //
    // myPort.onMessage.addListener((m) => {
    //     console.log("Received location", m);
    // });

    new Controller();

    // deleteToastIfNeeded();
    // const resultMap = analyseRoundResults();
    // displayToast(resultMap.get("Total"));
}

main();
//endregion

const ROUND_INFO_REGEXP = new RegExp(/[^-]+- (?:(?<min>[0-9]+) min)?(?:, )?(?:(?<sec>[0-9]+) sec)?/);
const ROUND_POINTS_REGEXP = new RegExp(/(?<pts>[0-9,]+) pts/);

const TOAST_ID = "geobettr-toast";
const TOAST = `
<div id="${TOAST_ID}" style="position: absolute; top: 10px; left: 10px; background-color: white;">
    <p>
    You got {pts} points in {durationSeconds} seconds !
    </p>
</div>
`;

function deleteToastIfNeeded() {
    const toast = document.getElementById(TOAST_ID);
    if (toast) {
        toast.remove();
    }
}

/**
 * @param {{pts: number, durationSeconds: number}} roundInfo
 */
function displayToast(roundInfo) {
    let elementHtml = String(TOAST);
    console.log(Object.getOwnPropertyNames(roundInfo));
    for (const prop of Object.getOwnPropertyNames(roundInfo)) {
        elementHtml = elementHtml.replaceAll(`{${prop}}`, roundInfo[prop]);
    }
    console.log(elementHtml);
    let template = document.createElement("template");
    template.innerHTML = elementHtml.trim();
    document.body.appendChild(template.content);
}

function analyseRoundResults() {
    /**
     * @type {Map<string, {pts: number, durationSeconds: number}>}
     */
    let resultMap = new Map();
    if (document.querySelector("[class^=result-list_listWrapper]")) {
        const results = document.querySelectorAll("[class^=result-list_listItemWrapper]");
        for (const result of results) {
            const roundNumber = result.querySelector("[class^=result-list_roundNumber]").innerHTML;
            const roundPoints = result.querySelector("[class^=result-list_points]").innerHTML;
            const roundInfo = result.querySelector("[class^=result-list_roundInfo]").innerHTML;
            const pts = Number.parseInt(ROUND_POINTS_REGEXP
                .exec(roundPoints).groups["pts"]
                .replaceAll(",", ""));
            const roundInfoRegExp = ROUND_INFO_REGEXP.exec(roundInfo);
            const min = Number.parseInt(roundInfoRegExp.groups["min"] ?? 0);
            const sec = Number.parseInt(roundInfoRegExp.groups["sec"] ?? 0);
            const durationSeconds = min * 60 + sec;
            resultMap.set(roundNumber, {
                pts,
                durationSeconds
            });
        }
    }

    return resultMap;
}