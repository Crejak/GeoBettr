import {Component} from "../Component";

export class Notepad extends Component {

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

    private onDocumentKeyUp(e: KeyboardEvent) {
        console.debug("Notepad onDocumentKeyUp", e);
        if (e.key === "t") {
            e.preventDefault();
            e.stopPropagation();
            document.querySelector(".geobettr_notepad_container")?.classList.add("geobettr_focus");
            (document.querySelector(".geobettr_notepad_textarea") as HTMLTextAreaElement).focus();
        } else if (e.key === "g") {
            e.preventDefault();
            e.stopPropagation();
            let classList = document.querySelector(".geobettr_notepad_textarea")?.classList;
            if (classList?.contains("geobettr_full_opacity")) {
                classList.remove("geobettr_full_opacity");
                classList.add("geobettr_hidden");
            } else if (classList?.contains("geobettr_hidden")) {
                classList.remove("geobettr_hidden");
            } else {
                classList?.add("geobettr_full_opacity");
            }
        }
    }

    private onTextAreaFocusOut() {
        console.debug("Notepad onTextAreaFocusOut");
        document.querySelector(".geobettr_notepad_container")?.classList.remove("geobettr_focus");
    }

    dispose(): void {
        console.debug("Notepad dispose");
        document.removeEventListener('keyup', this.onDocumentKeyUp);
    }

    created(): void {
        console.debug("Notepad created");
        (document.querySelector(".geobettr_notepad_container") as HTMLElement)?.addEventListener('keyup', this.onContainerKeyUp);
        (document.querySelector(".geobettr_notepad_container") as HTMLElement)?.addEventListener('keydown', this.onContainerKeyDown);
        document.addEventListener('keyup', this.onDocumentKeyUp);
        document.querySelector(".geobettr_notepad_textarea")?.addEventListener('focusout', this.onTextAreaFocusOut);
    }

    get html(): string {
        return `
<div class="geobettr_notepad_container">
    <textarea class="geobettr_notepad_textarea" spellcheck="false"></textarea>
</div>
        `;
    }
}