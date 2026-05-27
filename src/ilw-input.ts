import { LitElement, html, unsafeCSS } from "lit";
// @ts-ignore
import styles from './ilw-input.styles.css?inline';
import './ilw-input.css';
import { customElement, property } from "lit/decorators.js";

@customElement("ilw-input")
export default class Input extends LitElement {

    @property()
    theme = "";

    static get styles() {
        return unsafeCSS(styles);
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div>
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-input": Input;
    }
}
