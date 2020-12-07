import { normalize } from "./normalize";
import { tokenize } from "./parse";

document.querySelector("#editor").addEventListener("keyup", () => {
    const { value } = document.querySelector("#editor");
    parse(value);
});

const parse = (value) => {
    const lines = normalize(value);
    const tokens = tokenize(lines);
    console.log(tokens);
};
