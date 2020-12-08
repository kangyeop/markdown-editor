export const normalize = (text) => {
    const tooManyNewLine = /\n+$/g;

    const inputLines = text.replace(tooManyNewLine, "\n").split("\n");

    return inputLines;
};
