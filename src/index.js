import { normalize } from "./normalize";
import { tokenize } from "./tokenize";
import { renderer } from "./renderer";

document.querySelector("#editor").addEventListener("keyup", () => {
    const { value } = document.querySelector("#editor");
    conversion(value);
});

const conversion = (value) => {
    const lines = normalize(value);
    const tokens = tokenize(lines);
    console.log(tokens);
    renderer(tokens);
};
