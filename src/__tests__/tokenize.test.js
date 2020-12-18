import { tokenize } from "../tokenize";
import { normalize } from "../normalize";

test("Tokenize Ordered List", () => {
    let text = `1. Test1\n2. Test2\n3. Test3\n4. Test4\n`;

    let tokens = tokenize(normalize(text));
    expect(tokens[0].tag).toEqual("<ol><li>Test1</li>");
    expect(tokens[3].tag).toEqual("<li>Test4</li></ol>");

    text = `1. Test1\n2. Test2\n\n3. Test3\n4. Test4\n`;

    tokens = tokenize(normalize(text));

    expect(tokens[0].tag).toEqual("<ol><li>Test1</li>");
    expect(tokens[1].tag).toEqual("<li>Test2</li></ol>");
    expect(tokens[3].tag).toEqual("<ol><li>Test3</li>");
    expect(tokens[4].tag).toEqual("<li>Test4</li></ol>");
});

test("Tokenize Unordered List", () => {
    let text = `- Test1\n- Test2\n- Test3\n- Test4\n`;

    let tokens = tokenize(normalize(text));
    expect(tokens[0].tag).toEqual("<ul><li>Test1</li>");
    expect(tokens[3].tag).toEqual("<li>Test4</li></ul>");

    text = `- Test1\n- Test2\n\n- Test3\n- Test4\n`;

    tokens = tokenize(normalize(text));
    expect(tokens[0].tag).toEqual("<ul><li>Test1</li>");
    expect(tokens[1].tag).toEqual("<li>Test2</li></ul>");
    expect(tokens[3].tag).toEqual("<ul><li>Test3</li>");
    expect(tokens[4].tag).toEqual("<li>Test4</li></ul>");
});

test("Tokenize Unordered List with some block rules", () => {
    let text = `- **Test1**\n- ~~Test2~~\n- *Test3*\n- Test4\n`;

    let tokens = tokenize(normalize(text));
    expect(tokens[0].tag).toEqual("<ul><li><strong>Test1</strong></li>");
    expect(tokens[1].tag).toEqual("<li><strike>Test2</strike></li>");
    expect(tokens[2].tag).toEqual("<li><em>Test3</em></li>");
    expect(tokens[3].tag).toEqual("<li>Test4</li></ul>");
});
