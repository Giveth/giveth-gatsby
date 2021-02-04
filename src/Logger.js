import * as Sentry from '@sentry/gatsby'

if (typeof window === 'object') {
  // const sentryId = process.env.SENTRY_ID
  const sentryId = 'de31cb89ac0045afbb9d28322cc9c040@o510515'

  Sentry.init({
    dsn: `https://${sentryId}.ingest.sentry.io/5606310`,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    //Ok thanks
    tracesSampleRate: 1.0
  })
}

export default Sentry
