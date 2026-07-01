// Sample unit tests. Run with: yarn test  (Jest via react-scripts)
// Or set up Vitest: yarn add -D vitest && npx vitest
import { add, isPalindrome, slugify, fizzbuzz, paginate } from "./jsUtils";

describe("jsUtils", () => {
  test("add", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("isPalindrome", () => {
    expect(isPalindrome("A man a plan a canal Panama")).toBe(true);
    expect(isPalindrome("hello")).toBe(false);
  });

  test("slugify", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  test("fizzbuzz", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
    expect(fizzbuzz(3)).toBe("Fizz");
    expect(fizzbuzz(5)).toBe("Buzz");
    expect(fizzbuzz(7)).toBe("7");
  });

  test("paginate", () => {
    const res = paginate([1, 2, 3, 4, 5], 1, 2);
    expect(res.data).toEqual([1, 2]);
    expect(res.totalPages).toBe(3);
  });
});
