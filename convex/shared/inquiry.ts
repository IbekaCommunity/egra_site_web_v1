// Pure validation rules for contact / pre-registration requests.
// Shared by the Convex mutation (authoritative) and the contact form (fast feedback).

export const INQUIRY_KINDS = ["preinscription", "message"] as const;
export type InquiryKind = (typeof INQUIRY_KINDS)[number];

export const SCHOOL_LEVELS = ["prescolaire", "primaire", "secondaire"] as const;
export type SchoolLevel = (typeof SCHOOL_LEVELS)[number];

export const INQUIRY_LIMITS = {
  name: 100,
  email: 200,
  phone: 30,
  message: 2000,
} as const;

export const INQUIRY_ERROR_CODES = [
  "parentNameRequired",
  "parentNameTooLong",
  "emailInvalid",
  "phoneInvalid",
  "childNameRequired",
  "childNameTooLong",
  "levelRequired",
  "messageRequired",
  "messageTooLong",
] as const;
export type InquiryErrorCode = (typeof INQUIRY_ERROR_CODES)[number];

export function isInquiryErrorCode(value: unknown): value is InquiryErrorCode {
  return typeof value === "string" && (INQUIRY_ERROR_CODES as readonly string[]).includes(value);
}

export type InquiryField = "parentName" | "email" | "phone" | "childName" | "level" | "message";

export type InquiryInput = {
  kind: InquiryKind;
  parentName: string;
  email: string;
  phone: string;
  childName?: string;
  level?: string;
  message?: string;
};

export type CleanInquiry = {
  kind: InquiryKind;
  parentName: string;
  email: string;
  phone: string;
  childName?: string;
  level?: SchoolLevel;
  message?: string;
};

export type InquiryResult =
  | { ok: true; value: CleanInquiry }
  | { ok: false; field: InquiryField; code: InquiryErrorCode };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^\+?[\d\s().-]+$/;

function isSchoolLevel(value: string): value is SchoolLevel {
  return (SCHOOL_LEVELS as readonly string[]).includes(value);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return (
    phone.length <= INQUIRY_LIMITS.phone &&
    PHONE_CHARS_RE.test(phone) &&
    digits.length >= 8 &&
    digits.length <= 15
  );
}

/** Trims every field and checks the business rules. Returns the first error found. */
export function validateInquiry(input: InquiryInput): InquiryResult {
  const parentName = input.parentName.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const childName = input.childName?.trim() ?? "";
  const level = input.level?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (!parentName) return { ok: false, field: "parentName", code: "parentNameRequired" };
  if (parentName.length > INQUIRY_LIMITS.name)
    return { ok: false, field: "parentName", code: "parentNameTooLong" };
  if (email.length > INQUIRY_LIMITS.email || !EMAIL_RE.test(email))
    return { ok: false, field: "email", code: "emailInvalid" };
  if (!isValidPhone(phone)) return { ok: false, field: "phone", code: "phoneInvalid" };

  if (input.kind === "preinscription") {
    if (!childName) return { ok: false, field: "childName", code: "childNameRequired" };
    if (childName.length > INQUIRY_LIMITS.name)
      return { ok: false, field: "childName", code: "childNameTooLong" };
    if (!isSchoolLevel(level)) return { ok: false, field: "level", code: "levelRequired" };
  } else if (!message) {
    return { ok: false, field: "message", code: "messageRequired" };
  }
  if (message.length > INQUIRY_LIMITS.message)
    return { ok: false, field: "message", code: "messageTooLong" };

  const value: CleanInquiry = { kind: input.kind, parentName, email, phone };
  if (input.kind === "preinscription" && isSchoolLevel(level)) {
    value.childName = childName;
    value.level = level;
  }
  if (message) value.message = message;
  return { ok: true, value };
}
