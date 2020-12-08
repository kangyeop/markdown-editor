import { rulesBlock, rulesInline, Paragraph } from "./rules";

export const parseBlock = (line) => {
    for (const i in rulesBlock) {
        if (rulesBlock[i].rule.test(line)) {
            return { name: rulesBlock[i].name, tag: rulesBlock[i].parse(line) };
        }
    }

    return { name: Paragraph.name, tag: Paragraph.parse(line) };
};

export const parseInline = (token) => {
    for (const i in rulesInline) {
        if (rulesInline[i].rule.test(token.tag)) {
            const newHtml = rulesInline[i].parse(token.tag);
            token.tag = newHtml;
        }
    }
    return token;
};

export const tokenize = (lines) => {
    return lines
        .map((line) => parseBlock(line))
        .map((token, i, arr) => {
            if (
                token.name === "OrderedList" &&
                (!i || (i - 1 >= 0 && arr[i - 1].name !== "OrderedList"))
            ) {
                const olStart = "<ol>";
                token.tag = olStart + token.tag;
            }

            if (
                token.name === "OrderedList" &&
                i + 1 < lines.length &&
                arr[i + 1].name !== "OrderedList"
            ) {
                const olEnd = "</ol>";
                token.tag = token.tag + olEnd;
            }

            if (
                token.name === "UnorderedList" &&
                (!i || (i - 1 >= 0 && arr[i - 1].name !== "UnorderedList"))
            ) {
                const ulStart = "<ul>";
                token.tag = ulStart + token.tag;
            }

            if (
                i + 1 < lines.length &&
                token.name === "UnorderedList" &&
                arr[i + 1].name !== "UnorderedList"
            ) {
                const ulEnd = "</ul>";
                token.tag = token.tag + ulEnd;
            }

            return token;
        })
        .map((token) => parseInline(token));
};
