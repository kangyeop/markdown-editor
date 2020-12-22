import { parseBlock, parseInline } from "../tokenize";

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
    ];

    strArray.forEach((data) => {
        expect(parseBlock(data).name).toEqual("OrderedList");
        expect(parseBlock(data).tag).toEqual("<li>test</li>");
    });
});

test("Parsing UnorderedList Block", () => {
    const data = "- test";

    expect(parseBlock(data).name).toEqual("UnorderedList");
    expect(parseBlock(data).tag).toEqual("<li>test</li>");
});

test("Parsing Blockquote Block", () => {
    const data = "> test";

    expect(parseBlock(data).name).toEqual("Blockquote");
    expect(parseBlock(data).tag).toEqual("<blockquote>test</blockquote>");
});

// const rulesInline = [Strong, Em, Strike, Img, Link];

test("Parsing Strong Inline", () => {
    const str = "**test**";

    expect(parseInline(parseBlock(str)).tag).toEqual(
        "<p><strong>test</strong></p>"
    );
});

test("Parsing Em Inline", () => {
    const str = "*test*";

    expect(parseInline(parseBlock(str)).tag).toEqual("<p><em>test</em></p>");
});

test("Parsing Strike Inline", () => {
    const str = "~~test~~";

    expect(parseInline(parseBlock(str)).tag).toEqual(
        "<p><strike>test</strike></p>"
    );
});

test("Parsing Img Inline", () => {
    const str = "Image test ![screenshot_test](test.png)";

    expect(parseInline(parseBlock(str)).tag).toEqual(
        '<p>Image test <img src="test.png" alt="screenshot_test" /></p>'
    );
});

test("Parsing Link Inline", () => {
    const str = "Link test [Google](https://google.co.kr)";

    expect(parseInline(parseBlock(str)).tag).toEqual(
        '<p>Link test <a href="https://google.co.kr">Google</a></p>'
    );
});
