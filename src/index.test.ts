import { describe, it, expect } from "vitest";
import { parseFaq, getAudience, listAudiences } from "./index.js";

const validDoc = {
  title: "Test FAQ",
  audiences: {
    public: {
      general: {
        title: "General",
        faqs: [{ id: "q1", question: "Q?", answer: "A." }],
      },
    },
    internal: {
      setup: {
        title: "Setup",
        faqs: [{ id: "q2", question: "Q2?", answer: "A2." }],
      },
    },
  },
};

describe("parseFaq", () => {
  it("parses a valid document", () => {
    const result = parseFaq(validDoc);
    expect(result.title).toBe("Test FAQ");
  });

  it("throws on invalid document", () => {
    const invalidDoc = { title: "Bad", audiences: { public: { general: { title: "x" } } } };
    expect(() => parseFaq(invalidDoc)).toThrow();
  });
});

describe("getAudience", () => {
  it("returns the correct group", () => {
    const parsed = parseFaq(validDoc);
    const group = getAudience(parsed, "public");
    expect(group.general.faqs[0].id).toBe("q1");
  });

  it("throws with a helpful message for unknown audience", () => {
    const parsed = parseFaq(validDoc);
    expect(() => getAudience(parsed, "nonexistent")).toThrow(/Available audiences/);
  });
});

describe("listAudiences", () => {
  it("lists all audience keys", () => {
    const parsed = parseFaq(validDoc);
    expect(listAudiences(parsed)).toEqual(["public", "internal"]);
  });
});