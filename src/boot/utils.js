import { boot } from 'quasar/wrappers'
import {
  // createSharedElementDirective,
  SharedElementRouteGuard,
  SharedElementDirective
} from 'v-shared-element'
import {useGlobalStore} from "stores/store";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ({ app, router, store }) => {
  app.use(SharedElementDirective)
  // or app.use(createSharedElementDirective())
  router.beforeEach(SharedElementRouteGuard)

  router.afterEach((to) => {
    const globalStore = useGlobalStore(store)
    if (to.query.tags && globalStore.selectedTags.join(',') !== to.query.tags) {
      globalStore.selectedTags = to.query.tags.split(',')
    }
    if (to.params.category && globalStore.selectedCategory !== to.params.category) {
      globalStore.selectedCategory = to.params.category
    }
  })
})
