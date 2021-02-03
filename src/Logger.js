import * as Sentry from '@sentry/gatsby'

const sentryId = process.env.SENTRY_ID

Sentry.init({
  dsn: `https://${sentryId}.ingest.sentry.io/5606310`,

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0
})

export default Sentry
