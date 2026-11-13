import { convexTest } from "convex-test";
import { describe, expect, it } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";
import { validateInquiry } from "./shared/inquiry"
import { modules } from "./test.setup";

const PRE = {
  kind: "preinscription" as const,
  parentName: "  Aminata Diallo ",
  email: "Aminata@Gmail.com",
  phone: "+221 77 123 45 67",
  childName: "Moussa",
  level: "primaire",
};

describe("validateInquiry", () => {
  it("trims and normalizes a valid pre-registration", () => {
    const result = validateInquiry(PRE);
    expect(result).toEqual({
      ok: true,
      value: {
        kind: "preinscription",
        parentName: "Aminata Diallo",
        email: "aminata@gmail.com",
        phone: "+221 77 123 45 67",
        childName: "Moussa",
        level: "primaire",
      },
    });
  });

  it("rejects a blank parent name", () => {
    expect(validateInquiry({ ...PRE, parentName: "   " })).toMatchObject({ ok: false, field: "parentName" });
  });

  it("rejects malformed emails and phones", () => {
    expect(validateInquiry({ ...PRE, email: "nope@x" })).toMatchObject({ field: "email" });
    expect(validateInquiry({ ...PRE, phone: "12ab" })).toMatchObject({ field: "phone" });
    expect(validateInquiry({ ...PRE, phone: "1234" })).toMatchObject({ field: "phone" });
  });

  it("requires child and a known level for pre-registration", () => {
    expect(validateInquiry({ ...PRE, childName: "" })).toMatchObject({ field: "childName" });
    expect(validateInquiry({ ...PRE, level: "universite" })).toMatchObject({ field: "level" });
  });

  it("requires a message for the message kind and drops child fields", () => {
    expect(validateInquiry({ ...PRE, kind: "message" })).toMatchObject({ field: "message" });
    const ok = validateInquiry({ ...PRE, kind: "message", message: " Bonjour " });
    expect(ok).toMatchObject({ ok: true, value: { message: "Bonjour" } });
    if (ok.ok) {
      expect(ok.value.childName).toBeUndefined();
      expect(ok.value.level).toBeUndefined();
    }
  });

  it("rejects overly long messages", () => {
    expect(validateInquiry({ ...PRE, message: "a".repeat(2001) })).toMatchObject({ field: "message" });
  });
});

describe("inquiries.submit", () => {
  it("stores a valid request without sign-in", async () => {
    const t = convexTest(schema, modules);
    const id = await t.mutation(api.inquiries.submit, { ...PRE, lang: "fr" });
    const doc = await t.run(async (ctx) => (id ? await ctx.db.get("inquiries", id) : null));
    expect(doc).toMatchObject({ parentName: "Aminata Diallo", email: "aminata@gmail.com", lang: "fr" });
  });

  it("rejects invalid input on the server", async () => {
    const t = convexTest(schema, modules);
    await expect(
      t.mutation(api.inquiries.submit, { ...PRE, email: "bad", lang: "fr" }),
    ).rejects.toThrow();
  });

  it("silently ignores bots that fill the honeypot", async () => {
    const t = convexTest(schema, modules);
    const id = await t.mutation(api.inquiries.submit, { ...PRE, lang: "fr", website: "spam" });
    expect(id).toBeNull();
    const all = await t.run((ctx) => ctx.db.query("inquiries").collect());
    expect(all).toHaveLength(0);
  });

  it("limits repeated submissions from the same email", async () => {
    const t = convexTest(schema, modules);
    for (let i = 0; i < 5; i++) {
      await t.mutation(api.inquiries.submit, { ...PRE, lang: "fr" });
    }
    await expect(t.mutation(api.inquiries.submit, { ...PRE, lang: "fr" })).rejects.toThrow();
  });
});
