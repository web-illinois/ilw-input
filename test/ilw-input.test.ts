import { expect, test } from "vitest";
import { render } from "vitest-browser-lit";
import { html } from "lit";
import { applyRequiredLabelStyles, initToggleButtons } from "../src/ilw-input";

test("renders a text input with its label", async () => {
    const screen = render(html`
        <ilw-content>
            <form>
                <div class="ilw-input-entry">
                    <label for="netid">NetID</label>
                    <input id="netid" name="netid" type="text">
                </div>
            </form>
        </ilw-content>
    `);

    const label = screen.container.querySelector<HTMLLabelElement>('label[for="netid"]');
    const input = screen.container.querySelector<HTMLInputElement>("#netid");

    await expect.element(input).toBeInTheDocument();
    expect(label?.textContent).toBe("NetID");
    expect(input?.type).toBe("text");
    expect(input?.name).toBe("netid");
});

test("renders a select with options", async () => {
    const screen = render(html`
        <ilw-content>
            <form>
                <div class="ilw-input-entry">
                    <label for="campus">Campus</label>
                    <select id="campus" name="campus">
                        <option value="">Choose one</option>
                        <option value="urbana">Urbana-Champaign</option>
                        <option value="chicago">Chicago</option>
                    </select>
                </div>
            </form>
        </ilw-content>
    `);

    const select = screen.container.querySelector<HTMLSelectElement>("#campus");

    await expect.element(select).toBeInTheDocument();
    expect(select?.options).toHaveLength(3);
    expect(select?.value).toBe("");

    if (select) {
        select.value = "chicago";
    }

    expect(select?.value).toBe("chicago");
});

test("renders and checks a checkbox", async () => {
    const screen = render(html`
        <ilw-content>
            <form>
                <div class="ilw-input-entry-checkbox">
                    <label for="updates">Send me updates</label>
                    <input id="updates" name="updates" type="checkbox">
                </div>
            </form>
        </ilw-content>
    `);

    const checkbox = screen.container.querySelector<HTMLInputElement>("#updates");

    await expect.element(checkbox).toBeInTheDocument();
    expect(checkbox?.checked).toBe(false);

    checkbox?.click();

    expect(checkbox?.checked).toBe(true);
});

test("renders and selects radio buttons", async () => {
    const screen = render(html`
        <ilw-content>
            <form>
                <div class="ilw-input-entry-radio">
                    <p>Preferred contact method</p>
                    <input type="radio" id="contact-email" name="contact" value="email">
                    <label for="contact-email">Email</label>
                    <input type="radio" id="contact-phone" name="contact" value="phone">
                    <label for="contact-phone">Phone</label>
                </div>
            </form>
        </ilw-content>
    `);

    const email = screen.container.querySelector<HTMLInputElement>("#contact-email");
    const phone = screen.container.querySelector<HTMLInputElement>("#contact-phone");

    await expect.element(email).toBeInTheDocument();
    await expect.element(phone).toBeInTheDocument();

    email?.click();

    expect(email?.checked).toBe(true);
    expect(phone?.checked).toBe(false);

    phone?.click();

    expect(email?.checked).toBe(false);
    expect(phone?.checked).toBe(true);
});

test("adds required label styling to matching required fields", () => {
    const screen = render(html`
        <ilw-content>
            <form>
                <div class="ilw-input-entry">
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" required>
                </div>
            </form>
        </ilw-content>
    `);

    const label = screen.container.querySelector<HTMLLabelElement>('label[for="email"]');

    applyRequiredLabelStyles(screen.container);

    expect(label?.classList.contains("ilw-label-required")).toBe(true);
});

test("initializes toggle button labels and pressed state", () => {
    const screen = render(html`
        <ilw-content>
            <form>
                <button
                    id="toggle"
                    type="button"
                    aria-pressed="false"
                    data-ilw-input-on="Enabled"
                    data-ilw-input-off="Disabled"
                ></button>
            </form>
        </ilw-content>
    `);

    const button = screen.container.querySelector<HTMLButtonElement>("#toggle");

    initToggleButtons(screen.container);

    expect(button?.getAttribute("aria-pressed")).toBe("false");
    expect(button?.textContent).toBe("Disabled");
    expect(button?.querySelector("ilw-icon")?.getAttribute("icon")).toBe("cancel");

    button?.click();

    expect(button?.getAttribute("aria-pressed")).toBe("true");
    expect(button?.textContent).toBe("Enabled");
    expect(button?.querySelector("ilw-icon")?.getAttribute("icon")).toBe("more");
});
