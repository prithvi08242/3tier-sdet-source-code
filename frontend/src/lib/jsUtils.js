// Pure JS utilities for unit-testing practice (Jest / Vitest).
// Import these in your test specs and assert behavior.

export function add(a, b) {
  return a + b;
}

export function isPalindrome(str) {
  const s = String(str).toLowerCase().replace(/[^a-z0-9]/g, "");
  return s === s.split("").reverse().join("");
}

export function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function fizzbuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}

export function paginate(items, page = 1, size = 10) {
  const start = (page - 1) * size;
  return {
    data: items.slice(start, start + size),
    page,
    size,
    total: items.length,
    totalPages: Math.ceil(items.length / size),
  };
}
