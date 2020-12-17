import { tokenize, parseBlock, parseInline } from "../tokenize";

// const rulesBlock = [UnorderedList, OrderedList, Hr, Heading, Blockquote];

test("Parsing Hr Block", () => {
    const strArray = ["---", "--", "----", "--a--", "---a"];

    strArray.forEach((data, index) => {
        expect(parseBlock(data).name).toEqual(index ? "Paragraph" : "Hr");
    });
});

test("Parsing Heading Block", () => {
    const strArray = [
        "# test",
        "## test",
        "### test",
        "#### test",
        "##### test",
        "###### test",
        "#", // 띄어쓰기가 있지 않음
    ];

    strArray.forEach((data, index) => {
        expect(parseBlock(data).name).toEqual(
            index === strArray.length - 1 ? "Paragraph" : "Heading"
        );
        expect(parseBlock(data).tag).toEqual(
            index === strArray.length - 1
                ? "<p>#</p>"
                : `<h${index + 1}>test</h${index + 1}>`
        );
    });
});

test("Parsing OrderedList Block", () => {
    const strArray = [
        "1. test",
        "2. test",
        "3. test",
        "4. test",
        "5. test",
        "6. test",
        "7. test",
        "8. test",
        "9. test",
        "0. test",
        "1.", // 띄어쓰기가 있지 않음
    ];

    strArray.forEach((data, index) => {
        expect(parseBlock(data).name).toEqual(
            index === strArray.length - 1 ? "Paragraph" : "OrderedList"
        );
        expect(parseBlock(data).tag).toEqual(
            index === strArray.length - 1 ? "<p>1.</p>" : "<li>test</li>"
        );
    });
});

test("Parsing UnorderedList Block", () => {
    const strArray = [
        "- test",
        "-", // 띄어쓰기가 있지 않음
    ];

    strArray.forEach((data, index) => {
        expect(parseBlock(data).name).toEqual(
            index === strArray.length - 1 ? "Paragraph" : "UnorderedList"
        );
        expect(parseBlock(data).tag).toEqual(
            index === strArray.length - 1 ? "<p>-</p>" : "<li>test</li>"
        );
    });
});

test("Parsing Blockquote Block", () => {
    const strArray = [
        "> test",
        ">", // 띄어쓰기가 있지 않음
    ];

    strArray.forEach((data, index) => {
        expect(parseBlock(data).name).toEqual(
            index === strArray.length - 1 ? "Paragraph" : "Blockquote"
        );
        expect(parseBlock(data).tag).toEqual(
            index === strArray.length - 1
                ? "<p>></p>"
                : "<blockquote>test</blockquote>"
        );
    });
});
