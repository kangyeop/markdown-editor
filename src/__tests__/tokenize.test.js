import { tokenize } from "../tokenize";

test("Tokenize Ordered List", () => {
    let text = ["1. Test1", "2. Test2", "3. Test3", "4. Test4", ""];

    let tokens = tokenize(text);
    expect(tokens[0].tag).toEqual("<ol><li>Test1</li>");
    expect(tokens[3].tag).toEqual("<li>Test4</li></ol>");

    text = ["1. Test1", "2. Test2", "", "3. Test3", "4. Test4", ""];

    tokens = tokenize(text);

    expect(tokens[0].tag).toEqual("<ol><li>Test1</li>");
    expect(tokens[1].tag).toEqual("<li>Test2</li></ol>");
    expect(tokens[3].tag).toEqual("<ol><li>Test3</li>");
    expect(tokens[4].tag).toEqual("<li>Test4</li></ol>");
});

test("Tokenize Unordered List", () => {
    let text = ["- Test1", "- Test2", "- Test3", "- Test4", ""];

    let tokens = tokenize(text);
    expect(tokens[0].tag).toEqual("<ul><li>Test1</li>");
    expect(tokens[3].tag).toEqual("<li>Test4</li></ul>");

    text = ["- Test1", "- Test2", "", "- Test3", "- Test4", ""];

    tokens = tokenize(text);
    expect(tokens[0].tag).toEqual("<ul><li>Test1</li>");
    expect(tokens[1].tag).toEqual("<li>Test2</li></ul>");
    expect(tokens[3].tag).toEqual("<ul><li>Test3</li>");
    expect(tokens[4].tag).toEqual("<li>Test4</li></ul>");
});

test("Tokenize Unordered List with some block rules", () => {
    let text = ["- **Test1**", "- ~~Test2~~", "- *Test3*", "- Test4", ""];

    let tokens = tokenize(text);
    expect(tokens[0].tag).toEqual("<ul><li><strong>Test1</strong></li>");
    expect(tokens[1].tag).toEqual("<li><strike>Test2</strike></li>");
    expect(tokens[2].tag).toEqual("<li><em>Test3</em></li>");
    expect(tokens[3].tag).toEqual("<li>Test4</li></ul>");
});
