import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { CheckCircle2, GraduationCap, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useLang, useT } from "@/hooks/use-locale.ts";
import { cn } from "@/lib/utils.ts";
import { api } from "@/convex/_generated/api.js";
import {
  INQUIRY_KINDS,
  SCHOOL_LEVELS,
  isInquiryErrorCode,
  validateInquiry,
  type InquiryField,
  type InquiryKind,
} from "@/convex/shared/inquiry";

const KIND_ICONS = { preinscription: GraduationCap, message: Mail } as const;
const FIELD_NAMES: readonly InquiryField[] = ["parentName", "email", "phone", "childName", "level", "message"];

const baseSchema = z.object({
  kind: z.enum(INQUIRY_KINDS),
  parentName: z.string(),
  email: z.string(),
  phone: z.string(),
  childName: z.string(),
  level: z.string(),
  message: z.string(),
  website: z.string(),
});
type FormValues = z.infer<typeof baseSchema>;

const EMPTY: Omit<FormValues, "kind"> = {
  parentName: "",
  email: "",
  phone: "",
  childName: "",
  level: "",
  message: "",
  website: "",
};

function isInquiryField(value: unknown): value is InquiryField {
  return typeof value === "string" && (FIELD_NAMES as readonly string[]).includes(value);
}

const inputClass = "h-11 rounded-xl bg-background";

export default function ContactForm({ initialKind }: { initialKind: InquiryKind }) {
  const t = useT().contactPage.form;
  const lang = useLang();
  const submit = useMutation(api.inquiries.submit);
  const [sent, setSent] = useState(false);

  // Same rules as the server mutation, for instant feedback.
  const schema = useMemo(
    () =>
      baseSchema.superRefine((values, ctx) => {
        const result = validateInquiry(values);
        if (!result.ok) {
          ctx.addIssue({ code: "custom", path: [result.field], message: t.errors[result.code] });
        }
      }),
    [t],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { kind: initialKind, ...EMPTY },
  });
  const kind = useWatch({ control: form.control, name: "kind" });
  const isPre = kind === "preinscription";

  const onSubmit = async (values: FormValues) => {
    try {
      await submit({
        kind: values.kind,
        parentName: values.parentName,
        email: values.email,
        phone: values.phone,
        childName: isPre ? values.childName : undefined,
        level: isPre ? values.level : undefined,
        message: values.message || undefined,
        website: values.website || undefined,
        lang,
      });
      setSent(true);
      form.reset({ kind: values.kind, ...EMPTY });
    } catch (error) {
      const data: unknown = error instanceof ConvexError ? error.data : null;
      if (data && typeof data === "object") {
        const field: unknown = "field" in data ? data.field : undefined;
        const reason: unknown = "reason" in data ? data.reason : undefined;
        if (isInquiryField(field) && isInquiryErrorCode(reason)) {
          form.setError(field, { message: t.errors[reason] });
          return;
        }
        if (reason === "tooMany") {
          toast.error(t.errors.tooMany);
          return;
        }
      }
      toast.error(t.errors.generic);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center self-start rounded-[2rem] border bg-card p-10 text-center shadow-sm md:p-14">
        <span className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-[oklch(0.55_0.17_150)]/15 text-[oklch(0.5_0.15_150)]">
          <CheckCircle2 className="size-8" />
        </span>
        <h2 className="mb-3 font-display text-2xl font-extrabold text-primary">{t.success.title}</h2>
        <p className="mb-8 max-w-md text-muted-foreground">{t.success.desc}</p>
        <Button variant="secondary" className="h-11 rounded-full px-5 cursor-pointer" onClick={() => setSent(false)}>
          {t.success.again}
        </Button>
      </div>
    );
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="self-start rounded-[2rem] border bg-card p-6 shadow-sm md:p-10">
      <div role="tablist" className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-secondary p-1.5">
        {INQUIRY_KINDS.map((k) => {
          const Icon = KIND_ICONS[k];
          const active = kind === k;
          return (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                form.setValue("kind", k);
                form.clearErrors();
              }}
              className={cn(
                "flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold transition cursor-pointer",
                active ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {t.tabs[k]}
            </button>
          );
        })}
      </div>
      <p className="mb-6 text-muted-foreground">{t.intro[kind]}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{t.parentName}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" placeholder={t.parentNamePlaceholder} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.email}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" autoComplete="email" placeholder={t.emailPlaceholder} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.phone}</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" autoComplete="tel" placeholder={t.phonePlaceholder} className={inputClass} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPre && (
            <>
              <FormField
                control={form.control}
                name="childName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.childName}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t.childNamePlaceholder} className={inputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.level}</FormLabel>
                    <FormControl>
                      <NativeSelect {...field} className="w-full [&_select]:h-11 [&_select]:rounded-xl [&_select]:bg-background [&_select]:cursor-pointer">
                        <NativeSelectOption value="" disabled>
                          {t.levelPlaceholder}
                        </NativeSelectOption>
                        {SCHOOL_LEVELS.map((level) => (
                          <NativeSelectOption key={level} value={level}>
                            {t.levels[level]}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{isPre ? t.messageOptional : t.message}</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={5} placeholder={t.messagePlaceholder} className="rounded-xl bg-background" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Honeypot field, invisible to people */}
          <input
            {...form.register("website")}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">{t.privacy}</p>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-full bg-accent px-6 text-base font-bold text-[oklch(0.24_0.08_268)] hover:bg-accent/90 cursor-pointer"
            >
              {isSubmitting ? <Spinner /> : <Send className="size-4" />}
              {isSubmitting ? t.sending : t.submit[kind]}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
