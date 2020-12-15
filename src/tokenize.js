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
    let nestCount = 0;
    return lines
        .map((line) => parseBlock(line))
        .map((token, i, arr) => {
            // ol 시작점
            if (
                token.name === "OrderedList" &&
                (!i ||
                    (i - 1 >= 0 &&
                        arr[i - 1].name !== "OrderedList" &&
                        !nestCount))
            ) {
                const olStart = "<ol>";
                token.tag = olStart + token.tag;
            }

            // ol 끝나는 지점
            if (
                token.name === "OrderedList" &&
                arr[i + 1] &&
                arr[i + 1].name !== "OrderedList" &&
                arr[i + 1].name !== "UnorderedList"
            ) {
                const olEnd = "</ol>";
                token.tag = token.tag + olEnd;
            }

            // ul 시작점
            if (
                token.name === "UnorderedList" &&
                (!i || (i - 1 >= 0 && arr[i - 1].name !== "UnorderedList"))
            ) {
                const ulStart = "<ul>";
                token.tag = ulStart + token.tag;
            }

            // ul 끝나는 지점
            if (
                i + 1 < lines.length &&
                token.name === "UnorderedList" &&
                arr[i + 1].name !== "UnorderedList"
            ) {
                const ulEnd = "</ul>";
                token.tag = token.tag + ulEnd;
            }

            if (
                token.name === "OrderedList" &&
                arr[i + 1] &&
                arr[i + 1].name === "UnorderedList"
            ) {
                nestCount++;
                token.tag = token.tag.replace("</li>", "");
            }

            if (
                nestCount &&
                token === "UnorderedList" &&
                arr[i + 1] === "OrderedList"
            ) {
                nestCount--;
                token.tag += "</li>";
            }

            return token;
        })
        .map((token) => parseInline(token));
};
