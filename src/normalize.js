document.querySelector("#editor").addEventListener("keyup", () => {
    normalize();
});

export const normalize = () => {
    const text = document.querySelector("#editor").value;
    const hasCarriage = /\r\n?/g;
    const tooManyNewLine = /\n+$/g;

    const inputLines = text
        .replace(hasCarriage, "\n")
        .replace(tooManyNewLine, "\n")
        .split("\n");

    console.log(inputLines);
};
