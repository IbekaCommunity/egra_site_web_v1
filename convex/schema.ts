import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  // Pre-registration requests and messages sent from the public contact page.
  inquiries: defineTable({
    kind: v.union(v.literal("preinscription"), v.literal("message")),
    parentName: v.string(),
    email: v.string(),
    phone: v.string(),
    childName: v.optional(v.string()),
    level: v.optional(
      v.union(v.literal("prescolaire"), v.literal("primaire"), v.literal("secondaire")),
    ),
    message: v.optional(v.string()),
    lang: v.union(v.literal("fr"), v.literal("en")),
  }).index("by_email", ["email"]),
});
