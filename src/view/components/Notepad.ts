import {Component} from "../Component";

export class Notepad extends Component {

    private documentKeyUpCallback?: (e: KeyboardEvent) => any;

    private onContainerKeyUp(e: KeyboardEvent) {
        console.debug("Notepad onContainerKeyUp", e);
        e.stopPropagation();
    }

    private onContainerKeyDown(e: KeyboardEvent) {
        console.debug("Notepad onContainerKeyDown", e);
        e.stopPropagation();
        if (e.key === "Escape") {
            (document.querySelector(".geobettr_notepad_textarea") as HTMLTextAreaElement).blur();
        }
    }

    private onTextAreaFocusOut() {
        console.debug("Notepad onTextAreaFocusOut");
        document.querySelector(".geobettr_notepad_container")?.classList.remove("geobettr_focus");
    }

    private focusNotepad() {
        document.querySelector(".geobettr_notepad_container")?.classList.add("geobettr_focus");
        (document.querySelector(".geobettr_notepad_textarea") as HTMLTextAreaElement).focus();
    }

    private switchOpacity() {
        const $textarea = document.querySelector<HTMLTextAreaElement>(".geobettr_notepad_textarea");
        if (!$textarea) {
            throw new Error("Could not find textarea element");
        }
        const opacity = window.getComputedStyle($textarea).opacity;
        $textarea.style.opacity = opacity === "0" ? "0.5"
            : opacity === "0.5" ? "1"
                : "0";
    }

    dispose() {
        console.debug("Notepad dispose");
        if (this.documentKeyUpCallback) {
            document.removeEventListener('keyup', this.documentKeyUpCallback);
        }
    }

    created() {
        console.debug("Notepad created");
        (document.querySelector(".geobettr_notepad_container") as HTMLElement)?.addEventListener('keyup', this.onContainerKeyUp);
        (document.querySelector(".geobettr_notepad_container") as HTMLElement)?.addEventListener('keydown', this.onContainerKeyDown);
        this.documentKeyUpCallback = (e) => {
            console.debug("Notepad onDocumentKeyUp", e);
            if (e.key === "t") {
                e.preventDefault();
                e.stopPropagation();
                this.focusNotepad();
            } else if (e.key === "g") {
                e.preventDefault();
                e.stopPropagation();
                this.switchOpacity();
            }
        };
        document.addEventListener('keyup', this.documentKeyUpCallback);
        document.querySelector(".geobettr_notepad_textarea")?.addEventListener('focusout', this.onTextAreaFocusOut);
    }

    template(): string {
        return `
<div class="geobettr_notepad_container">
    <textarea class="geobettr_notepad_textarea" spellcheck="false"></textarea>
</div>
        `;
    }

    buttons(): Array<string> {
        return ["notepad", "opacity"];
    }

    onButtonPressed(buttonName: string): any {
        console.log("button pressed", buttonName);
        if (buttonName === "notepad") {
            this.focusNotepad();
        } else if (buttonName === "opacity") {
            this.switchOpacity();
        }
    }
}