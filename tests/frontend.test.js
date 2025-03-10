import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "../frontend/index.html"), "utf8");

describe("Recipe Discovery App UI", () => {
    let dom, document;

    beforeEach(() => {
        dom = new JSDOM(html);
        document = dom.window.document;
    });

    it ("should have diet input field", () => {
        const dietInput = document.querySelector("#diet");
        expect(dietInput).not.toBeNull();
        expect(dietInput.placeholder).toBe("vegetarion, gluten free");
    });

    it ("should have an ingredients input field", () => {
        const ingredientsInput = document.querySelector("#ingredients");
        expect(ingredientsInput).not.toBeNull();
        expect(ingredientsInput.placeholder).toBe("chicken, tomato, onion");
    });

    it ("should have a submit button", () => {
        const button = document.querySelector("button");
        expect(button).not.toBeNull();
        expect(button.textContent).toBe("Search");
    });
});