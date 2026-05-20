import { useLanguage } from "@/context/LanguageProvider"
import { usePayloadQuery } from "@/hooks/use-payload-query"

export function useLocaleQuery<TData>(
  query: string,
  variables?: Record<string, unknown>,
) {
  const { currentLocale } = useLanguage()
  return usePayloadQuery<TData>(query, { locale: currentLocale, ...variables })
}
