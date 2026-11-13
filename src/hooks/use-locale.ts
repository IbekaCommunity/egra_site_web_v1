import { useParams } from "@tanstack/react-router";
import { getDictionary, langFromParam, type Dictionary, type Lang } from "@/lib/i18n/index.ts";

export function useLang(): Lang {
  const params = useParams({ strict: false });
  return langFromParam(params.locale);
}

export function useT(): Dictionary {
  return getDictionary(useLang());
}
