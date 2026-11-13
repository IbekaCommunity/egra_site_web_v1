import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { validateInquiry } from "./shared/inquiry";

// Anonymous public form: cap how many requests one email address can send per hour.
const MAX_PER_HOUR = 5;
const HOUR_MS = 60 * 60 * 1000;

export const submit = mutation({
  args: {
    kind: v.union(v.literal("preinscription"), v.literal("message")),
    parentName: v.string(),
    email: v.string(),
    phone: v.string(),
    childName: v.optional(v.string()),
    level: v.optional(v.string()),
    message: v.optional(v.string()),
    lang: v.union(v.literal("fr"), v.literal("en")),
    // Honeypot: hidden from people, filled in by bots.
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.website) return null;

    const result = validateInquiry(args);
    if (!result.ok) {
      throw new ConvexError({
        message: "Invalid request",
        code: "BAD_REQUEST",
        field: result.field,
        reason: result.code,
      });
    }
    const inquiry = result.value;

    const recent = await ctx.db
      .query("inquiries")
      .withIndex("by_email", (q) => q.eq("email", inquiry.email))
      .order("desc")
      .take(MAX_PER_HOUR);
    const since = Date.now() - HOUR_MS;
    if (recent.length >= MAX_PER_HOUR && recent.every((r) => r._creationTime > since)) {
      throw new ConvexError({
        message: "Too many requests",
        code: "BAD_REQUEST",
        reason: "tooMany",
      });
    }

    return await ctx.db.insert("inquiries", { ...inquiry, lang: args.lang });
  },
});
