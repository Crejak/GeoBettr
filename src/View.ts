const VIEW_NOTEPAD = `
<div class="geobettr_notepad_container">
    <textarea class="geobettr_notepad_textarea" spellcheck="false"></textarea>
</div>
`

export class View {
    constructor() {

    }

    removeNotepad() {
        document.querySelector(".geobettr_notepad_container")?.remove();
    }

    displayNotepad() {
        const notepad = this.createElement(VIEW_NOTEPAD);
        document.body.appendChild(notepad.content);
        (document.querySelector(".geobettr_notepad_container") as HTMLElement)?.addEventListener('keyup', (e) => {
            e.stopPropagation();
        });
        (document.querySelector(".geobettr_notepad_container") as HTMLElement)?.addEventListener('keydown', (e) => {
            e.stopPropagation();
            if (e.key === "Escape") {
                (document.querySelector(".geobettr_notepad_textarea") as HTMLTextAreaElement).blur();
            }
        });
        document.addEventListener('keyup', (e) => {
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
        });
        document.querySelector(".geobettr_notepad_textarea")?.addEventListener('focusout', () => {
            document.querySelector(".geobettr_notepad_container")?.classList.remove("geobettr_focus");
        });
    }

    createElement(html: string): HTMLTemplateElement {
        let elementHtml = String(html);
        let template = document.createElement("template");
        template.innerHTML = elementHtml.trim();
        return template;
    }
}