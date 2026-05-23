import { useState, useEffect } from "react"
import { GraphQLClient } from "graphql-request"
import { useBaseUrl } from "@sykoramaros/marosh-components"

export function usePayloadQuery<TData>(
  query: string,
  variables?: Record<string, unknown>,
): { data: TData | null; loading: boolean; error: Error | null } {
  const baseUrl = useBaseUrl()
  const [data, setData] = useState<TData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const serializedVariables = JSON.stringify(variables)

  useEffect(() => {
    const client = new GraphQLClient(`${baseUrl}/api/graphql`)
    const parsedVariables = serializedVariables
      ? (JSON.parse(serializedVariables) as Record<string, unknown>)
      : undefined

    setLoading(true)
    setError(null)
    client
      .request<TData>(query, parsedVariables)
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error(String(err)))
      })
      .finally(() => setLoading(false))
  }, [baseUrl, query, serializedVariables])

  return { data, loading, error }
}
