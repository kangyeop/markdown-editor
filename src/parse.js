import { rulesBlock, rulesInline, Paragraph } from "./rules";

export const parseBlock = (line) => {
    for (const i in rulesBlock) {
        if (rulesBlock[i].rule.test(line)) {
            return { name: rulesBlock[i].name, tag: rulesBlock[i].parse(line) };
        }
    }

    return { name: Paragraph.name, tag: Paragraph.parse(line) };
};

export const tokenize = (lines) => {
    let tokens = lines.map((line) => parseBlock(line));

    return tokens;
};
