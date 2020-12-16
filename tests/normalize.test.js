import { normalize } from "../src/normalize";

const text = `test\ntest\ntest`;
const textArray = ["test", "test", "test"];

test("Make array slice based on line break", () => {
    expect(normalize(text).length).toBe(3);
    expect(normalize(text)).toEqual(textArray);
});
