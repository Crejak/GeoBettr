export function createTemplate(html: string): HTMLTemplateElement {
    let elementHtml = String(html);
    let template = document.createElement("template");
    template.innerHTML = elementHtml.trim();
    return template;
}