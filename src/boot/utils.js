import { boot } from 'quasar/wrappers'
import {
  // createSharedElementDirective,
  SharedElementRouteGuard,
  SharedElementDirective
} from 'v-shared-element'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ({ app, router }) => {
  app.use(SharedElementDirective)
  // or app.use(createSharedElementDirective())
  router.beforeEach(SharedElementRouteGuard)
})
