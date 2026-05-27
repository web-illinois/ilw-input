import './ilw-input.css';

export function applyRequiredLabelStyles(root: ParentNode = document): void {
    const requiredFields = root.querySelectorAll<HTMLElement>('*:required[id]');

    requiredFields.forEach((field) => {
        const label = root.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(field.id)}"]`);

        if (label) {
            label.classList.add('ilw-label-required');
        }
    });
}

export function initToggleButtons(root: ParentNode = document): void {
    root.querySelectorAll<HTMLButtonElement>('button[aria-pressed]').forEach((button) => {
        if (button.childNodes.length !== 0) return;

        const labelOn = button.getAttribute('data-ilw-input-on') ?? '';
        const labelOff = button.getAttribute('data-ilw-input-off') ?? '';
        const isPressed = button.getAttribute('aria-pressed') === 'true';

        const textSpan = document.createElement('span');
        textSpan.textContent = isPressed ? labelOn : labelOff;

        const iconSpan = document.createElement('ilw-icon');
        iconSpan.setAttribute('size', '18px');
        iconSpan.setAttribute('style', 'padding-left: 5px; vertical-align: middle;');
        iconSpan.setAttribute('icon', isPressed ? 'more' : 'cancel');

        button.append(textSpan, iconSpan);

        button.addEventListener('click', () => {
            const pressed = button.getAttribute('aria-pressed') === 'true';
            button.setAttribute('aria-pressed', pressed ? 'false' : 'true');
            textSpan.textContent = pressed
                ? button.getAttribute('data-ilw-input-off') ?? ''
                : button.getAttribute('data-ilw-input-on') ?? '';
            iconSpan.setAttribute('icon', pressed ? 'cancel' : 'more');
        });
    });
}

// ESM scripts run after HTML parse, so one immediate pass is enough for static markup.
if (typeof document !== 'undefined') {
    applyRequiredLabelStyles(document);
    initToggleButtons(document);
}
