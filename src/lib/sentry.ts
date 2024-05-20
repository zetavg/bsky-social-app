/**
 * Importing these separately from `platform/detection` and `lib/app-info` to
 * avoid future conflicts and/or circular deps
 */

import {Platform} from 'react-native'
import {nativeApplicationVersion, nativeBuildVersion} from 'expo-application'
import {init} from 'sentry-expo'

import {BUILD_ENV, IS_DEV, IS_TESTFLIGHT} from 'lib/app-info'

/**
 * Examples:
 * - `dev`
 * - `1.57.0`
 */
const release = nativeApplicationVersion ?? 'dev'

/**
 * Examples:
 * - `web.dev`
 * - `ios.dev`
 * - `android.dev`
 * - `web.1.57.0`
 * - `ios.1.57.0.3`
 * - `android.1.57.0.46`
 */
const dist = `${Platform.OS}.${nativeBuildVersion}.${
  IS_TESTFLIGHT ? 'tf' : ''
}${IS_DEV ? 'dev' : ''}`

init({
  autoSessionTracking: false,
  dsn: 'https://5f133ee7cf0ca7925971e55a077ebc2f@o4507290022248448.ingest.us.sentry.io/4507290026442752',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  enableInExpoDevelopment: true, // enable this to test in dev
  environment: BUILD_ENV ?? __DEV__ ? 'development' : 'not-development',
  dist,
  release,
})
