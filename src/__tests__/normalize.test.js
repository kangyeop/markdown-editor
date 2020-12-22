import { normalize } from "../normalize";

test("Make array slice based on line break", () => {
    // 줄이 1줄일때, 2줄일때, 3줄 이상일 때
    const testArray = ["test", `test\ntest`, `test\ntest\n`];

    testArray.forEach((text, index) => {
        expect(normalize(text).length).toBe(index + 1);
    });
});
