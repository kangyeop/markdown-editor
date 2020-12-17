import { normalize } from "../normalize";

test("Make array slice based on line break", () => {
    const text = `test\ntest\ntest`;
    const textArray = ["test", "test", "test"];

    expect(normalize(text).length).toBe(3);
    expect(normalize(text)).toEqual(textArray);
});
