import React, { memo, useMemo } from 'react'
import { useRouter } from 'next/router'
import { QueryParamProvider as ContextProvider } from 'use-query-params'

export const QueryParamProviderComponent = props => {
  const { children } = props
  const router = useRouter()
  const match = router.asPath.match(/[^?]+/)
  const pathname = match ? match[0] : router.asPath

  const location = useMemo(
    () =>
      typeof window !== 'undefined'
        ? window.location
        : {
            search: router.asPath.replace(/[^?]+/u, '')
          },
    [router.asPath]
  )

  const history = useMemo(
    () => ({
      push: ({ search }) =>
        router.push(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true, scroll: false }
        ),
      replace: ({ search }) => {
        router.replace(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true, scroll: false }
        )
      },
      location
    }),
    [pathname, router.pathname, router.query, location.pathname]
  )

  return (
    <ContextProvider history={history} location={location}>
      {children}
    </ContextProvider>
  )
}

export const QueryParamProvider = memo(QueryParamProviderComponent)
