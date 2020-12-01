import { normalize } from "./normalize";

document.querySelector("#editor").addEventListener("keyup", () => {
    const { value } = document.querySelector("#editor");
    normalize(value);
});
