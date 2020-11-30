document.querySelector("#editor").addEventListener("keyup", () => {
    normalize();
});

export const normalize = () => {
    const text = document.querySelector("#editor").value;
    const tooManyNewLine = /\n+$/g;

    const inputLines = text.replace(tooManyNewLine, "\n").split("\n");

    console.log(inputLines);
};
